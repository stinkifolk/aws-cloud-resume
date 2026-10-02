import { describe, test } from "vitest";
import * as cdk from "aws-cdk-lib/core";
import { Template } from "aws-cdk-lib/assertions";
import { InfrastructureStack } from "../lib/infrastructure-stack";
import * as fs from "node:fs";
import * as path from "node:path";

describe("InfrastructureStack", () => {
  test("creates the Cloud Resume S3 bucket", () => {
    const originalCwd = process.cwd();
    process.chdir(path.resolve(__dirname, ".."));

    try {
      const projectOutDir = path.resolve(__dirname, "../../out");

      fs.mkdirSync(projectOutDir, { recursive: true });

      const projectFile = path.join(projectOutDir, "index.html");

      if (!fs.existsSync(projectFile)) {
        fs.writeFileSync(
          projectFile,
          "<html><body>Test</body></html>"
        );
      }

      const app = new cdk.App();
      const stack = new InfrastructureStack(app, "TestStack");
      const template = Template.fromStack(stack);

      template.hasResourceProperties("AWS::S3::Bucket", {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: {
                SSEAlgorithm: "AES256",
              },
            },
          ],
        },
      });
    } finally {
      process.chdir(originalCwd);
    }
  });
});
