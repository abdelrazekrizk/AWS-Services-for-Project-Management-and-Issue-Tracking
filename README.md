# AWS Services for Project Management and Issue Tracking

## Table of Contents
- [Introduction](#introduction)
- [Objective](#objective)
- [Features](#features)
- [AWS Services](#aws-services)
- [Set Up the Basic Infrastructure](#set-up-the-basic-infrastructure)
- [Step 1: Create an AWS Account](#step-1-create-an-aws-account)
- [Step 2: Create Amazon S3 Bucket](#step-2-create-amazon-s3-bucket)
- [Step 3: Create a DynamoDB Table](#step-3-create-a-dynamodb-table)
- [Step 4: Set Up IAM Roles and Policies](#step-4-set-up-iam-roles-and-policies)
- [Step 5: Set Up AWS Lambda](#step-5-set-up-aws-lambda)
- [Step 6: Set Up Amazon Cognito](#step-6-set-up-amazon-cognito)
- [Step 7: Set Up API Gateway](#step-7-set-up-api-gateway)
- [Step 8: Step 8: Create Amazon SNS Service](#step-8-create-amazon-sns-service)
- [Step 9: Monitor Application with Amazon CloudWatch](#step-9-monitor-application-with-amazon-cloudwatch)
- [Summary](#summary)
- [Next Steps](#next-steps)

## Introduction
This README provides a step-by-step guide for setting up AWS Lambda functions, API Gateway, Amazon Cognito,Amazon DynamoDB, Amazon S3, Amazon SNS Service, and Amazon CloudWatch for a project management and issue tracking application.

## Objective
Create a scalable project management and issue tracking application using AWS services, allowing users to create, update, and manage tasks efficiently while providing features such as user authentication, file storage, and notifications.

## Features
- **Task Management**: Create, update, and delete tasks or issues.
- **User Stories**: Track user stories and their acceptance criteria.
- **Sprints and Backlogs**: Manage sprints, backlogs, and their associated tasks.
- **Comments and Collaboration**: Allow team members to comment on tasks for collaboration.
- **Attachments**: Enable file uploads for task-related documents.
- **Status Tracking**: Monitor the status of tasks (e.g., To Do, In Progress, Done).
- **Reporting**: Generate reports on task progress, time spent, and team performance.
- **Notifications**: Send alerts for task updates, deadlines, and comments.
## Architecture Components

![Architecture Diagram](./Architecture%20Diagram/AWS%20Services%20for%20Project%20Management%20and%20Issue%20Tracking.png)


## AWS Services
Leverage the following AWS services to build a robust project management and issue tracking system:
- **Amazon DynamoDB**: Use it as your primary database to store tasks, user stories, and project information. Its flexible schema allows you to adapt as your needs change.
- **AWS Lambda**: Implement serverless functions to handle business logic for creating, updating, and retrieving tasks. This allows you to scale easily without managing servers.
- **Amazon API Gateway**: Create RESTful APIs to interface between your frontend application and backend services. This will allow you to perform operations like adding or updating tasks through API calls.
- **Amazon S3**: Use S3 to store attachments and documents related to tasks. This provides secure and scalable storage for your files.
- **Amazon Cognito**: Implement user authentication and authorization using Amazon Cognito. This will help manage user accounts and permissions.
- **Amazon SNS**: Use Simple Notification Service (SNS) for sending notifications about task updates, deadlines, or comments.
- **Amazon CloudWatch**: Monitor application performance and set up alarms for any issues that arise.

## Set Up the Basic Infrastructure
1. **Create an AWS Account** (if you don't already have one).
2. **Create Amazon S3 Bucket**:
   - Set up an Amazon S3 bucket for storing attachments and documents related to tasks.
3. **Create a DynamoDB Table**:
   - Set up a DynamoDB table for storing tasks and projects.
4. **Set Up IAM Roles and Policies**:
   - Create IAM users with necessary permissions for accessing AWS services.
   - Create IAM roles for Lambda functions with permissions to access DynamoDB, S3, and other required services.
5. **Set Up AWS Lambda**:
   - Create initial Lambda functions for task management (e.g., create, update, delete).
6. **Set Up Amazon Cognito (for user authentication)**:
   - Create a Cognito User Pool for managing user sign-ups and logins.
7. **Create an API Gateway**:
   - Set up an API Gateway to expose endpoints for the Lambda functions.
8. **Create Amazon SNS Service**:
   - Set up an Amazon SNS topic for sending notifications about task updates, deadlines, or comments.


## Step 1: Create an AWS Account
If you don't have an AWS account, go to [AWS Signup](https://aws.amazon.com/signup/) and create a new account.

## Step 2: Create Amazon S3 Bucket

1. **Log in to AWS Management Console**:
   - Navigate to the [AWS Management Console](https://aws.amazon.com/console/).

2. **Access S3 Service**:
   - In the AWS Management Console, search for **S3** and select **S3** from the services dropdown.

3. **Create a New Bucket**:
   - Click on the **Create bucket** button.
   - **Configure Bucket Settings**:
     - **Bucket name**: Enter a unique name for your bucket (e.g., `my-project-management-bucket`).
     - **Region**: Select the AWS region where you want to create the bucket.
   - Click on **Create bucket** at the bottom of the page.

4. **Configure Bucket Permissions** (Optional):
   - After creating the bucket, you can set permissions as needed, such as allowing public access or restricting access to specific IAM roles.

## Step 3: Create a DynamoDB Table
- **Go to the DynamoDB Console**:
  - Access the AWS Management Console and navigate to the DynamoDB service.
  - Click on "Create table."
- Configure Table Settings:
  - Table name: `Tasks`
  - Primary key:
    - Partition key: `UserId` (String)
    - Sort key: `TaskId` (String)
  - Click "Create" to finish the table setup.

**Note**:
- Write down the Amazon Resource Name (ARN) of the table; you will need it to create IAM inline policy.

## Step 4: Set Up IAM Roles and Policies
- **Create IAM Users**:
  - Go to the IAM console.
  - Create IAM users for your development team with appropriate permissions (e.g., full access to DynamoDB, Lambda, and API Gateway).
- **Create IAM policy for Lambda**:
  - In the IAM console, within the automated role that was generated when creating Lambda.
  - Attach policies that allow access to DynamoDB and S3.
    - Example policies:
      - `AmazonDynamoDBFullAccess`
      - `AmazonS3FullAccess`
    - You can customize the policy to include the target `DynamoDB Table` and `S3 bucket` by using IAM Inline policy.

## Step 5: Set Up AWS Lambda
1. **Go to the Lambda Console**:
   - Access the AWS Management Console and navigate to the Lambda service.
2. **Click on "Create function."**:
   - Select the option to create a new function.
3. **Configure Lambda Function**:
   - **Function name**: `CreateTask`
   - **Runtime**: Choose either Node.js or Python, depending on your preference.
   - **Permissions**: Choose the existing role you created earlier for Lambda.
4. **Add Function Code**:
   - Write the logic code for the Lambda function to create, update, delete, and retrieve tasks in DynamoDB. Here’s a simple example:
     - [CreateTask Lambda function](./Lambda%20Functions/CreateTask.js): This function will handle the creation of a new task in your DynamoDB table.
     - [UpdateTask Lambda function](./Lambda%20Functions/UpdateTask.js): This function updates an existing task in the DynamoDB table.
     - [DeleteTask Lambda function](./Lambda%20Functions/DeleteTask.js): This function deletes a task from the DynamoDB table.
     - [GetTask Lambda function](./Lambda%20Functions/GetTask.js): This function retrieves a specific task from the DynamoDB table.

   **Note**:
   - After AWS Lambda is set up, you will find that there is a Lambda role in the permission section under the configuration section: `AWSLambdaBasicExecutionRole`.
   - Click on it; it will take you to the IAM console as we will set up IAM inline policy for DynamoDB and S3 later.

## Step 6: Set Up Amazon Cognito
1. **Go to the Cognito Console**:
 - Access the AWS Management Console and navigate to the Cognito service.
2. **Choose "Manage User Pools" and click "Create a user pool."**:
 - Follow the prompts to create a new user pool.
3. **Configure User Pool**:
 - **User pool name**: `TaskLinkerUserPool`
 - Configure attributes (e.g., email, password) based on your needs.
4. **Set Up App Client**:
 - Create an app client (e.g., `TaskLinkerApp`) and configure settings.
 - Note the App client ID and User Pool ID for later use.

## Step 7: Set Up API Gateway
1. **Go to the API Gateway Console**:
 - Access the AWS Management Console and navigate to the API Gateway service.
2. **Choose "Create API" and select REST API**:
 - Follow the prompts to create a new REST API.
3. **Configure API Settings**:
 - **API name**: `TaskManagementAPI`
 - Click "Create API."
4. **Create Resources and Methods**:
 - Create resources for each functionality (e.g., `/tasks`).
 - For each resource, create methods (GET, POST, PUT, DELETE) and link them to the corresponding Lambda functions. For example:
  **Create API Gateway Endpoints for Each Function**:
   - **POST /tasks/update**: For updating tasks (linked to `UpdateTask`).
   - **DELETE /tasks/{UserId}/{TaskId}**: For deleting tasks (linked to `DeleteTask`).
   - **GET /tasks/{UserId}/{TaskId}**: For retrieving tasks (linked to `GetTask`).
5. **Deploy the API**:
 - Click on "Deploy API" and create a new stage (e.g., `dev`).

 ## Step 8: Create Amazon SNS Service


### Create a Standard SNS Topic

1. **Access the Amazon SNS Console**:
   - Go to the [AWS Management Console](https://aws.amazon.com/console/).
   - Search for and select **SNS** (Simple Notification Service).

2. **Create a New Topic**:
   - In the left navigation pane, click on **Topics**.
   - Click on the **Create topic** button.
   - **Select Type**: Choose either **Standard** or **FIFO** based on your requirements.
   - Select **Standard** as the topic type.
   - **Configure Topic Settings**:
     - **Name**: Enter a name for your topic (e.g., `TaskUpdatesTopic`).
     - Optionally, you can provide a display name, which is used for SMS notifications.
   - Click on **Create topic**.

### Subscribe an Email Address to the Topic

1. **Select Your Topic**:
   - Click on the topic you just created (e.g., `TaskUpdatesTopic`).

2. **Create Subscription**:
   - In the **Subscriptions** section, click on **Create subscription**.
   - Choose the protocol (e.g., Email, SMS, etc.) and enter the endpoint (e.g., an email address to receive notifications).
   - **Protocol**: Choose **Email** from the dropdown menu.
   - **Endpoint**: Enter the email address where you want to receive notifications (e.g., `your-email@example.com`).
   - Click **Create subscription**.

3. **Confirm Subscription**:
   - An email will be sent to the address you provided. Open that email and click on the confirmation link to activate the subscription.
   - If you don’t see the email, check your spam or junk folder.

### Publish Messages to the SNS Topic

1. **Publish a Test Message**:
   - Go back to your SNS topic in the console.
   - Click on the **Publish message** button.
   - In the **Message details** section:
     - **Subject**: Enter a subject for your notification (e.g., "Task Update Notification").
     - **Message**: Write your message content (e.g., "A new task has been created or updated.").
   - Click on **Publish message**.

2. **Check Your Email**:
   - After publishing the message, check the email address you subscribed to see if you received the notification.

> Follow the Official Create an Amazon SNS topic and publish messages [`Go Here`](https://docs.aws.amazon.com/sns/latest/dg/sns-setting-up.html)

## Step 9: Monitor Application with Amazon CloudWatch

1. **Access CloudWatch Service**:
   - In the AWS Management Console, search for **CloudWatch** and select it from the services dropdown.

2. **Create Alarms**:
   - In the CloudWatch dashboard, click on **Alarms** in the left navigation pane.
   - Click on **Create alarm**.
   - **Select Metric**: Choose the metric you want to monitor (e.g., Lambda function invocations, S3 bucket size).
   - Click on **Select metric** and configure the alarm settings:
     - Define conditions (e.g., `Threshold type`, `Whenever this metric`).
     - Specify actions (e.g., send a notification to the SNS topic if the alarm is triggered).
   - Click on **Create alarm** to finish.

## Summary
By completing these steps, you will have successfully set up the initial infrastructure for your project management and issue tracking application using AWS services. This includes creating Lambda functions for task management, setting up an API Gateway for communication between the frontend and backend, implementing Amazon Cognito for secure user authentication, set up Amazon S3 for storing documents, Amazon SNS for sending notifications, and Amazon CloudWatch for monitoring your application performance in your project management and issue tracking system.

Amazon Simple Notification Service Documentation [Go Here](https://docs.aws.amazon.com/sns/)

## Next Steps
Once you have set up and tested AWS Services, we can move on to the next phase, where we will focus on developing the frontend application.