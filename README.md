# AWS Cloud Resume Challenge

A serverless resume website built and deployed on AWS as part of the [AWS Cloud Resume Challenge](https://github.com/stinkifolk).

**Live website:** https://cloud.ama24.my

## Overview

This project is a static, serverless resume website deployed using AWS services.

The project combines a Next.js static export with Amazon S3, Amazon CloudFront, Amazon API Gateway, AWS Lambda, and Amazon DynamoDB.

The visitor counter is fully serverless. When a visitor opens the website, the frontend sends a request to API Gateway. API Gateway invokes a Lambda function, which increments the visitor count stored in DynamoDB and returns the updated count to the browser.

The website is served securely through CloudFront while the S3 bucket remains private.

---

## Architecture

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
                         │   Static Website    │
                         │       Files         │
                         └─────────────────────┘


Visitor Counter

Visitor Browser
      │
      │ GET /visitor
      ▼
┌─────────────────────┐
│   Amazon API        │
│      Gateway        │
│   HTTP API          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     AWS Lambda      │
│ cloud-resume-       │
│ visitor-counter     │
└──────────┬──────────┘
           │
           │ UpdateItem
           ▼
┌─────────────────────┐
│  Amazon DynamoDB    │
│ cloud-resume-       │
│ visitors            │
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

---

## AWS Services

| Service                         | Purpose                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| **Amazon S3**                   | Stores the static website files                              |
| **Amazon CloudFront**           | CDN, HTTPS, caching and secure access to S3                  |
| **Origin Access Control (OAC)** | Keeps the S3 bucket private while allowing CloudFront access |
| **AWS Lambda**                  | Serverless backend for the visitor counter                   |
| **Amazon API Gateway**          | Public HTTP API endpoint for the visitor counter             |
| **Amazon DynamoDB**             | Stores the visitor count                                     |
| **AWS Certificate Manager**     | TLS certificate for `cloud.ama24.my`                         |
| **Cloudflare DNS**              | DNS management for the custom domain                         |
| **IAM**                         | Authentication and least-privilege permissions               |

---

## Frontend

The resume is built using:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Static export

The application is exported into an `out/` directory and uploaded to Amazon S3.

Because the production website is served as static files, the Next.js application does not require a continuously running Node.js server.

### Build

```bash
pnpm install
pnpm build
```

The production files are generated in:

```text
out/
```

The contents of `out/` are uploaded to the root of the S3 bucket.

---

## Visitor Counter

The visitor counter follows a serverless architecture.

### Request flow

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
   │ DynamoDB UpdateItem
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

The DynamoDB table contains a single counter item:

```text
id       visits
----------------
counter  7
```

The Lambda function uses DynamoDB's atomic `ADD` operation to increment the counter.

### Lambda logic

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
  "visits": 7
}
```

---

## API Gateway

The project uses an HTTP API.

### Endpoint

```text
GET /visitor
```

The frontend uses the API URL through an environment variable:

```env
NEXT_PUBLIC_VISITOR_API_URL=https://<api-id>.execute-api.<region>.amazonaws.com/visitor
```

The API is intentionally public because the website needs to request the visitor count without requiring user authentication.

CORS is configured to allow requests from:

```text
https://cloud.ama24.my
```

Only the required `GET` method is enabled.

---

## Lambda

Lambda function:

```text
cloud-resume-visitor-counter
```

Runtime:

```text
Python 3.14
```

Handler:

```text
lambda_function.lambda_handler
```

The Lambda execution role uses:

* `AWSLambdaBasicExecutionRole`
* A custom DynamoDB policy

The DynamoDB policy is restricted to the specific visitor-counter table.

Required DynamoDB permissions:

```text
dynamodb:GetItem
dynamodb:UpdateItem
```

This keeps the Lambda permissions limited to the operations required by the application.

---

## DynamoDB

Table:

```text
cloud-resume-visitors
```

Region:

```text
ap-southeast-1
```

Partition key:

```text
id
```

Type:

```text
String
```

Example item:

```json
{
  "id": "counter",
  "visits": 7
}
```

The table uses on-demand capacity because the application has a small and unpredictable traffic pattern.

---

## Amazon S3

The production website is stored in a private S3 bucket.

The bucket does **not** use S3 static website hosting.

Instead:

```text
Browser
   ↓
CloudFront
   ↓
Origin Access Control
   ↓
Private S3 bucket
```

S3 Block Public Access remains enabled.

This means users cannot directly access the S3 bucket as a public website.

CloudFront is the public entry point.

---

## Amazon CloudFront

CloudFront provides:

* HTTPS
* CDN delivery
* Caching
* Custom domain support
* Secure access to the private S3 bucket

Origin Access Control is used instead of making the S3 bucket public.

### Custom domain

```text
https://cloud.ama24.my
```

CloudFront uses an ACM certificate issued in the `us-east-1` region.

The Cloudflare DNS record points the subdomain to the CloudFront distribution.

```text
cloud.ama24.my
        ↓
Cloudflare DNS
        ↓
CloudFront
```

---

## Cloudflare

Cloudflare is used for DNS management.

DNS configuration:

```text
Type:   CNAME
Name:   cloud
Target: <CloudFront distribution domain>
Proxy:  DNS only
```

Cloudflare is currently being used as the DNS provider rather than as the application's CDN.

CloudFront handles the CDN and HTTPS delivery.

---

## IAM

A dedicated IAM user was created for this AWS project rather than using the root account for everyday work.

MFA is enabled.

The AWS root account is reserved for account-level operations.

The Lambda execution role uses a separate IAM role with restricted DynamoDB permissions.

This project therefore demonstrates two different IAM concepts:

```text
Human user
    │
    ▼
IAM User
    │
    └── AWS console access


Lambda
    │
    ▼
IAM Execution Role
    │
    └── DynamoDB permissions
```

---

## Environment Variables

Local development uses:

```env
NEXT_PUBLIC_VISITOR_API_URL=https://<api-id>.execute-api.<region>.amazonaws.com/visitor
```

The `.env.local` file should **not** be committed to GitHub.

The repository should contain `.env.example` instead:

```env
NEXT_PUBLIC_VISITOR_API_URL=
```

---

## Deployment Process

The current deployment process is:

### 1. Develop locally

```bash
pnpm install
```

### 2. Build the static website

```bash
pnpm build
```

Next.js generates:

```text
out/
```

### 3. Upload the build to S3

Upload the **contents** of `out/` to the root of the S3 bucket.

Do not upload the `out/` folder itself.

Correct:

```text
S3
├── index.html
├── 404.html
├── _next/
├── favicon.ico
└── ...
```

Not:

```text
S3
└── out/
    ├── index.html
    └── _next/
```

### 4. Invalidate CloudFront

After uploading a new build, create a CloudFront invalidation:

```text
/*
```

This forces CloudFront to retrieve the updated files from S3.

### 5. Verify production

Open:

```text
https://cloud.ama24.my
```

Then perform a hard refresh if necessary.

---

## Security Considerations

The project intentionally avoids making the S3 bucket public.

Security configuration:

* S3 Block Public Access enabled
* S3 Object Ownership: Bucket owner enforced
* S3 static website hosting disabled
* CloudFront Origin Access Control enabled
* HTTPS enabled
* ACM certificate configured
* API CORS restricted to the production domain
* Lambda IAM permissions restricted to the required DynamoDB operations
* MFA enabled for the IAM user

The architecture follows the principle:

> Make the public application endpoint accessible while keeping the storage layer private.

---

## Project Structure

```text
cv-main/
├── public/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── certifications.tsx
│   │   │   ├── education.tsx
│   │   │   ├── header.tsx
│   │   │   ├── interests.tsx
│   │   │   ├── key-certification.tsx
│   │   │   ├── languages.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── skills.tsx
│   │   │   ├── summary.tsx
│   │   │   ├── technical-credentials.tsx
│   │   │   ├── visitor-info-bar.tsx
│   │   │   ├── volunteering.tsx
│   │   │   └── work-experience.tsx
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

## What I Learned

This project was built as a practical introduction to AWS cloud architecture.

Key concepts covered:

### CloudFront vs S3

S3 stores the files.

CloudFront delivers the files.

The browser does not need direct public access to S3.

### API Gateway vs Lambda

API Gateway provides the HTTP endpoint.

Lambda executes the backend logic.

### Lambda vs DynamoDB

Lambda performs the operation.

DynamoDB stores the persistent data.

### IAM

IAM controls who and what can access AWS resources.

### CORS

CORS controls which browser origins can make requests to the API.

### CloudFront invalidation

Uploading a new file to S3 does not necessarily mean CloudFront immediately serves it.

An invalidation tells CloudFront to discard cached objects.

### Static export

A Next.js application can be exported into static files and served through S3 + CloudFront without running a permanent application server.

---

## AWS Region

The primary AWS region used for the application is:

```text
Asia Pacific (Singapore)
ap-southeast-1
```

The ACM certificate for CloudFront is created in:

```text
us-east-1
```

CloudFront requires ACM certificates for custom distributions to be provisioned in `us-east-1`.

---

## Cloud Resume Challenge

This project was created as a practical implementation of the [AWS Cloud Resume Challenge](https://github.com/stinkifolk).

The challenge provided the motivation to move the resume from a conventional web deployment toward a cloud-native architecture using AWS services.

The implementation focuses on understanding the underlying infrastructure rather than simply deploying a website.

---

## Future Improvements

Potential improvements include:

* Infrastructure as Code using AWS CDK or Terraform
* CI/CD deployment using GitHub Actions
* Automated S3 deployment
* Automated CloudFront invalidation
* Custom CloudWatch monitoring
* Lambda logging and alarms
* Cost monitoring
* Automated testing
* Security hardening
* Separate development and production environments
* Improved visitor analytics

---

## Current Status

**Production:** Live

**Website:** https://cloud.ama24.my

**Visitor counter:** Working

**Hosting:** Amazon S3 + CloudFront

**Backend:** API Gateway + Lambda + DynamoDB

**DNS:** Cloudflare

**HTTPS:** AWS Certificate Manager

**Infrastructure:** AWS Console configured manually

---

## License

This repository contains personal resume content and project implementation.

Please do not reuse personal information, resume content, or identifying information without permission.
