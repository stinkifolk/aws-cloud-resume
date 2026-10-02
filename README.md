# AWS Cloud Resume Challenge

A serverless resume website built and deployed on AWS as a practical implementation of the [AWS Cloud Resume Challenge](https://github.com/stinkifolk).

**Live website:** https://cloud.ama24.my

---

## Overview

This project is a static, serverless resume website built with Next.js and deployed on AWS.

The application uses:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Amazon S3
* Amazon CloudFront
* AWS Lambda
* Amazon API Gateway
* Amazon DynamoDB
* AWS Certificate Manager
* AWS CDK
* IAM
* Cloudflare DNS
* GitHub Actions
* Vitest

The resume is exported as static files and served through Amazon CloudFront from a private Amazon S3 bucket.

A serverless visitor counter is implemented using API Gateway, Lambda, and DynamoDB.

The infrastructure is defined using AWS CDK and the project includes automated testing and CI/CD through GitHub Actions.

---

## Live Deployment

**Website:**

```text
https://cloud.ama24.my
```

**AWS Region:**

```text
ap-southeast-1
```

**Status:** Production / Live

---

# Architecture

## Website Delivery

```text
                         ┌─────────────────────┐
                         │      Visitor        │
                         │  cloud.ama24.my     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Cloudflare      │
                         │       DNS           │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Amazon CloudFront │
                         │  HTTPS + CDN + OAC  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Amazon S3       │
                         │   Private Bucket    │
                         │                     │
                         │  Static Resume      │
                         │       Files         │
                         └─────────────────────┘
```

The S3 bucket is private.

CloudFront uses **Origin Access Control (OAC)** to retrieve objects from S3.

Visitors therefore access the website through CloudFront rather than directly through S3.

---

## Visitor Counter

```text
Visitor Browser
       │
       │ GET /visitor
       ▼
┌─────────────────────┐
│   Amazon API        │
│      Gateway        │
│      HTTP API       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     AWS Lambda      │
│  Visitor Counter    │
└──────────┬──────────┘
           │
           │ UpdateItem
           ▼
┌─────────────────────┐
│  Amazon DynamoDB    │
│  Visitor Counter    │
└──────────┬──────────┘
           │
           │ Updated count
           ▼
        Lambda
           │
           ▼
      API Gateway
           │
           ▼
        Browser
```

The Lambda function atomically increments the visitor count stored in DynamoDB and returns the updated value to the frontend.

---

# AWS Services

| Service                     | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| **Amazon S3**               | Stores the static resume website                  |
| **Amazon CloudFront**       | CDN, HTTPS, caching, and secure S3 delivery       |
| **Origin Access Control**   | Allows CloudFront to access the private S3 bucket |
| **AWS Lambda**              | Runs the visitor-counter backend                  |
| **Amazon API Gateway**      | Provides the HTTP API endpoint                    |
| **Amazon DynamoDB**         | Stores the visitor counter                        |
| **AWS Certificate Manager** | Provides the TLS certificate for `cloud.ama24.my` |
| **AWS CDK**                 | Defines and provisions AWS infrastructure as code |
| **IAM**                     | Controls AWS access and resource permissions      |
| **Cloudflare DNS**          | Manages DNS for `ama24.my`                        |
| **GitHub Actions**          | Runs CI checks and deployment automation          |
| **Vitest**                  | Runs frontend and infrastructure tests            |

---

# Frontend

The resume is built using:

* Next.js
* React
* TypeScript
* Tailwind CSS

The application uses Next.js static export.

The configuration generates an `out/` directory containing the deployable static website.

```bash
pnpm install
pnpm build
```

The resulting structure is approximately:

```text
out/
├── index.html
├── 404.html
├── _next/
└── ...
```

There is no continuously running Next.js application server in production.

The static files are delivered through Amazon CloudFront.

---

# Visitor Counter

The visitor counter is implemented as a serverless backend.

## Request Flow

```text
Browser
   │
   │ GET /visitor
   ▼
API Gateway
   │
   ▼
Lambda
   │
   │ UpdateItem
   ▼
DynamoDB
   │
   │ Updated visits value
   ▼
Lambda
   │
   ▼
API Gateway
   │
   ▼
Browser
```

The DynamoDB counter uses an item similar to:

```json
{
  "id": "counter",
  "visits": 19
}
```

The Lambda function uses DynamoDB's atomic `ADD` operation:

```python
response = table.update_item(
    Key={"id": "counter"},
    UpdateExpression="ADD visits :increment",
    ExpressionAttributeValues={
        ":increment": 1
    },
    ReturnValues="UPDATED_NEW"
)
```

The API returns:

```json
{
  "visits": 19
}
```

The actual visitor count changes as visitors access the website.

---

# API Gateway

The visitor counter uses an Amazon API Gateway HTTP API.

## Endpoint

```text
GET /visitor
```

The frontend receives the API URL through an environment variable:

```env
NEXT_PUBLIC_VISITOR_API_URL=https://<api-id>.execute-api.<region>.amazonaws.com/visitor
```

The API exposes only the required `GET /visitor` route.

CORS is configured at the API Gateway level to allow browser requests.

---

# AWS Lambda

The visitor counter runs on AWS Lambda.

## Configuration

**Runtime:**

```text
Python 3.14
```

**Handler:**

```text
index.handler
```

The function receives the DynamoDB table name through an environment variable.

```text
TABLE_NAME
```

The Lambda function updates the visitor counter using DynamoDB.

The infrastructure grants the Lambda function access to the visitor table through AWS CDK.

---

# DynamoDB

The visitor counter uses an Amazon DynamoDB table.

**Table:**

```text
cloud-resume-visitors
```

**Region:**

```text
ap-southeast-1
```

**Partition key:**

```text
id
```

**Type:**

```text
String
```

Example item:

```json
{
  "id": "counter",
  "visits": 19
}
```

The table uses on-demand capacity through DynamoDB's pay-per-request billing mode.

This avoids provisioning a fixed read/write capacity for a small and unpredictable workload.

---

# Amazon S3

The production resume files are stored in a private Amazon S3 bucket.

The bucket uses:

* S3 Block Public Access
* S3-managed encryption
* Versioning
* CloudFront Origin Access Control

The bucket does **not** need to be publicly accessible.

The request path is:

```text
Browser
   ↓
CloudFront
   ↓
Origin Access Control
   ↓
Private S3 bucket
```

CloudFront is therefore the public entry point for the website.

---

# Amazon CloudFront

Amazon CloudFront provides:

* HTTPS
* CDN delivery
* Edge caching
* Custom domain support
* Secure access to the private S3 origin

The CloudFront distribution uses an Origin Access Control to access the S3 bucket.

## Custom Domain

```text
https://cloud.ama24.my
```

The CloudFront distribution uses an ACM certificate for the custom domain.

The certificate is provisioned in:

```text
us-east-1
```

CloudFront requires ACM certificates used for CloudFront distributions to be provisioned in `us-east-1`.

---

# Cloudflare DNS

Cloudflare manages DNS for:

```text
ama24.my
```

The production subdomain is:

```text
cloud.ama24.my
```

The DNS flow is:

```text
cloud.ama24.my
       ↓
Cloudflare DNS
       ↓
CloudFront
       ↓
Private S3
```

Cloudflare is currently used as the DNS provider.

Amazon CloudFront handles the CDN and HTTPS delivery.

---

# Infrastructure as Code

The AWS infrastructure is defined using **AWS CDK** rather than being maintained entirely through manual AWS Console configuration.

The CDK application is located in:

```text
infrastructure/
```

The main stack is:

```text
InfrastructureStack
```

The stack defines resources including:

* S3
* CloudFront
* DynamoDB
* Lambda
* API Gateway
* IAM permissions
* S3 deployment
* CloudFront invalidation

The CDK application can synthesize the infrastructure into a CloudFormation template.

```bash
cd infrastructure
npx cdk synth
```

The infrastructure is therefore reproducible from source code.

---

# Automated Static Deployment

The CDK stack uses `BucketDeployment` to deploy the Next.js static output to S3.

The deployment source is:

```text
out/
```

The deployment also triggers CloudFront invalidation so updated website files can be served without waiting for existing cached objects to expire.

The deployment flow is:

```text
Next.js
   │
   │ pnpm build
   ▼
out/
   │
   ▼
AWS CDK BucketDeployment
   │
   ▼
Private S3
   │
   ▼
CloudFront
   │
   │ Invalidation
   ▼
Updated website
```

---

# CI/CD

GitHub Actions is used for continuous integration and deployment.

Workflow:

```text
Developer
    │
    │ git push
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Install dependencies
    │
    ├── Install infrastructure dependencies
    │
    ├── Run checks
    │
    ├── Run tests
    │
    ├── Build application
    │
    └── Deploy
         │
         ▼
       AWS
```

The repository contains the workflow:

```text
.github/workflows/deploy.yml
```

The workflow installs both the root project dependencies and the dependencies required by the CDK infrastructure project.

The pipeline runs the automated test suite before deployment.

---

# Testing

The project uses **Vitest**.

The test suite currently contains:

* 6 visitor-counter tests
* 1 AWS CDK infrastructure test

Run the tests with:

```bash
pnpm test
```

Current test result:

```text
Test Files  2 passed (2)
Tests       7 passed (7)
```

The infrastructure test synthesizes the CDK stack and verifies that the Cloud Resume S3 bucket is created with the expected server-side encryption configuration.

This helps prevent infrastructure changes from silently breaking the expected AWS architecture.

---

# IAM

IAM is used for both human access and AWS service permissions.

## Human Access

A dedicated IAM user is used for this Cloud Resume AWS project rather than using the AWS root account for everyday operations.

The AWS root account is reserved for account-level operations.

MFA is enabled for the IAM user.

## Lambda Access

Lambda uses an IAM execution role to access AWS resources.

The role provides the permissions required for the visitor counter to interact with DynamoDB.

The principle used is:

```text
Only grant a service the permissions it needs.
```

---

# Environment Variables

Local development uses:

```env
NEXT_PUBLIC_VISITOR_API_URL=https://<api-id>.execute-api.<region>.amazonaws.com/visitor
```

A local environment file can be created as:

```text
.env.local
```

The actual environment file should not be committed to GitHub.

The repository should use:

```text
.env.example
```

for documenting required environment variables.

Example:

```env
NEXT_PUBLIC_VISITOR_API_URL=
```

---

# Local Development

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Run tests:

```bash
pnpm test
```

Run the production build:

```bash
pnpm build
```

The static production output is generated in:

```text
out/
```

---

# Deployment

Deployment is automated through GitHub Actions.

The general process is:

```text
1. Make changes locally
        ↓
2. Run tests
        ↓
3. Commit changes
        ↓
4. Push to GitHub
        ↓
5. GitHub Actions runs checks
        ↓
6. Application is built
        ↓
7. CDK deployment runs
        ↓
8. Static files are deployed to S3
        ↓
9. CloudFront cache is invalidated
        ↓
10. Production website is updated
```

The production website is:

```text
https://cloud.ama24.my
```

---

# Security Considerations

The architecture intentionally keeps the S3 storage layer private.

Security-related configuration includes:

* S3 Block Public Access enabled
* S3 bucket encryption enabled
* S3 versioning enabled
* S3 Object Ownership controls
* CloudFront Origin Access Control
* HTTPS through CloudFront
* ACM TLS certificate
* IAM-based access control
* Dedicated IAM user for project access
* MFA enabled
* Lambda execution role
* DynamoDB access through IAM
* Environment secrets excluded from Git

The overall design follows the principle:

> Keep the storage layer private and expose only the services that need to be publicly accessible.

---

# Project Structure

```text
cv-main/
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── infrastructure/
│   ├── bin/
│   │   └── infrastructure.ts
│   ├── lib/
│   │   └── infrastructure-stack.ts
│   ├── test/
│   │   └── infrastructure.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── cdk.json
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── sitemap.ts
│   │
│   ├── components/
│   ├── data/
│   │   └── resume-data.ts
│   └── lib/
│
├── tests/
│   └── visitor-counter.test.ts
│
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

# Key Concepts Learned

This project was built as a practical introduction to cloud infrastructure and serverless architecture.

## S3 vs CloudFront

Amazon S3 stores the website files.

Amazon CloudFront delivers those files globally.

The S3 bucket does not need to be publicly accessible.

## CloudFront Origin Access Control

Origin Access Control allows CloudFront to access a private S3 origin.

This removes the need to expose the S3 bucket directly to the internet.

## API Gateway vs Lambda

API Gateway provides the HTTP endpoint.

Lambda executes the backend logic.

## Lambda vs DynamoDB

Lambda performs the visitor-counter operation.

DynamoDB provides persistent storage for the counter.

## IAM

IAM controls authentication and authorization across AWS resources.

## CORS

CORS controls which browser origins can make cross-origin requests to the API.

## DynamoDB Atomic Updates

DynamoDB's `ADD` operation allows the visitor counter to be incremented atomically without first reading and then writing the value.

## Infrastructure as Code

AWS CDK allows infrastructure to be defined in TypeScript and version-controlled alongside the application.

## CI/CD

GitHub Actions automatically runs checks and deployment steps after changes are pushed to GitHub.

## Static Export

Next.js can be exported as static files and served through S3 and CloudFront without running a permanent Node.js application server.

---

# AWS Regions

The primary application region is:

```text
Asia Pacific (Singapore)
ap-southeast-1
```

The ACM certificate used by CloudFront is provisioned in:

```text
us-east-1
```

CloudFront requires its ACM certificate to be in the `us-east-1` region.

---

# Cloud Resume Challenge

This project was created as a practical implementation of the [AWS Cloud Resume Challenge](https://github.com/stinkifolk).

The challenge provided the motivation to move the resume from a conventional web deployment toward a cloud-based architecture.

The implementation goes beyond simply hosting a static webpage by incorporating:

* Serverless architecture
* Visitor tracking
* Infrastructure as Code
* Automated testing
* CI/CD
* HTTPS
* CDN delivery
* Private S3 storage
* IAM-based access control

The goal was to learn the underlying AWS services by building and deploying a working application.

---

# Current Status

| Component                | Status           |
| ------------------------ | ---------------- |
| Resume website           | Live             |
| Custom domain            | `cloud.ama24.my` |
| HTTPS                    | Enabled          |
| Amazon S3                | Production       |
| Amazon CloudFront        | Production       |
| Origin Access Control    | Enabled          |
| API Gateway              | Production       |
| AWS Lambda               | Production       |
| DynamoDB visitor counter | Working          |
| AWS CDK                  | Implemented      |
| GitHub Actions CI/CD     | Passing          |
| Automated tests          | 7/7 passing      |
| Cloudflare DNS           | Configured       |

---

# Future Improvements

Potential future improvements include:

* CloudWatch dashboards
* CloudWatch alarms
* Lambda error monitoring
* AWS cost monitoring
* Security hardening
* Separate development and production environments
* Automated infrastructure testing
* More comprehensive integration tests
* Visitor analytics
* Improved deployment observability
* Automated dependency updates

---

# License

This repository contains personal resume content and project implementation.

Please do not reuse personal information, resume content, or identifying information without permission.
