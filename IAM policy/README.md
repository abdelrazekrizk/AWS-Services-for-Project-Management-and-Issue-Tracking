# Attaching Policies to AWS Lambda Function

## Overview
This document outlines the steps to attach an IAM policy to your AWS Lambda function, allowing it to access Amazon S3 and DynamoDB for task management operations. The policy will grant the Lambda function permissions to create, update, delete, and retrieve tasks.

## Step 1: Create the IAM Policy

1. **Log in to the AWS Management Console**:
   - Navigate to the [IAM Console](https://console.aws.amazon.com/iam/home).

2. **Create a New Policy**:
   - In the left navigation pane, click on **Policies**.
   - Click on the **Create policy** button.

3. **Use the JSON Tab**:
   - Select the **JSON** tab.
   - Paste the following JSON policy into the editor:

```json
   // AWS IAM Policy for Lambda function to access S3 and DynamoDB
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "VisualEditor0",
               "Effect": "Allow",
               "Action": [
                   "s3:PutObject",
                   "s3:GetObject",
                   "dynamodb:PutItem",
                   "dynamodb:DeleteItem",
                   "dynamodb:GetItem",
                   "s3:ListBucket",
                   "dynamodb:UpdateItem",
                   "s3:DeleteObject"
               ],
               "Resource": [
                   "arn:aws:s3:::<Bucket-name>",
                   "arn:aws:dynamodb:<Region>:<Account-ID>:table/Tasks"
               ]
           }
       ]
   }
```
- Replace `<Bucket-name>`, `<Region>`, and `<Account-ID>` with your actual S3 bucket name, AWS region, and AWS account ID.
- **Review and Create**:
  - Click on **Review policy**.
  - Provide a name for your policy (e.g., `LambdaDynamoDBS3AccessPolicy`) and an optional description.
  - Click on **Create policy**.

## Step 2: Attach the Policy to the Lambda Role

- **Go to Roles**:
  - In the left navigation pane of the IAM Console, click on **Roles**.
- **Find Your Lambda Role**:
  - Search for the role associated with your Lambda function. This role is typically named something like `lambda_basic_execution` or similar.
- **Attach the Policy**:
  - Click on the role name to view its details.
  - In the **Permissions** tab, click on the **Attach policies** button.
  - Search for the policy you just created (e.g., `LambdaDynamoDBS3AccessPolicy`).
  - Select the checkbox next to your policy and click on the **Attach policy** button.

## Step 3: Verify Permissions

- **Test Your Lambda Function**:
  - Navigate to the Lambda Console and select your function.
  - Test the function to ensure it can successfully perform operations on both S3 and DynamoDB.
- **Check CloudWatch Logs**:
  - If there are any errors, check the CloudWatch Logs for your Lambda function to troubleshoot permission issues.

## Conclusion
By following these steps, you have successfully attached policies to your AWS Lambda function, granting it the necessary permissions to interact with Amazon S3 and DynamoDB for task management operations.