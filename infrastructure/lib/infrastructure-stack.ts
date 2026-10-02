import * as cdk from 'aws-cdk-lib/core';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'CloudResumeBucket', {
      versioned: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });
    const distribution = new cloudfront.Distribution(this, 'CloudResumeDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new s3deploy.BucketDeployment(this, 'CloudResumeDeployment', {
      sources: [s3deploy.Source.asset('../out')],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
    });
    const visitorTable = new dynamodb.Table(this, 'VisitorTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    cdk.Tags.of(visitorTable).add('Project', 'CloudResume');

    const visitorFunction = new lambda.Function(this, 'VisitorFunction', {
      runtime: lambda.Runtime.PYTHON_3_14,
      handler: 'index.handler',
      environment: {
        TABLE_NAME: visitorTable.tableName,
      },
      code: lambda.Code.fromInline(`
import os
import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])

def handler(event, context):
    response = table.update_item(
        Key={"id": "counter"},
        UpdateExpression="ADD visits :increment",
        ExpressionAttributeValues={
            ":increment": 1
        },
        ReturnValues="UPDATED_NEW"
    )

    visits = int(response["Attributes"]["visits"])

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "visits": visits
        })
    }
`),
    });

    visitorTable.grantReadWriteData(visitorFunction);

    const api = new apigateway.HttpApi(this, 'VisitorApi', {
      corsPreflight: {
        allowOrigins: ['*'],
        allowMethods: [apigateway.CorsHttpMethod.GET],
      },
    });

    api.addRoutes({
      path: '/visitor',
      methods: [apigateway.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        'VisitorIntegration',
        visitorFunction
      ),
    });
    new cdk.CfnOutput(this, 'VisitorApiUrl', {
      value: `${api.url}visitor`,
      description: 'Visitor counter API URL',
    });
  }
}
