# AWS Services for Project Management and Issue Tracking

## Introduction

This README provides a step-by-step guide for setting up AWS Lambda functions, API Gateway, and Amazon Cognito for a project management and issue tracking application.

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

leverage the following AWS services to build a robust project management and issue tracking system:

- **Amazon DynamoDB**: Use it as your primary database to store tasks, user stories, and project information. Its flexible schema allows you to adapt as your needs change.
- **AWS Lambda**: Implement serverless functions to handle business logic for creating, updating, and retrieving tasks. This allows you to scale easily without managing servers.
- **Amazon API Gateway**: Create RESTful APIs to interface between your frontend application and backend services. This will allow you to perform operations like adding or updating tasks through API calls.
- **Amazon S3**: Use S3 to store attachments and documents related to tasks. This provides secure and scalable storage for your files.
- **Amazon Cognito**: Implement user authentication and authorization using Amazon Cognito. This will help manage user accounts and permissions.
- **Amazon SNS**: Use Simple Notification Service (SNS) for sending notifications about task updates, deadlines, or comments.
- **Amazon CloudWatch**: Monitor application performance and set up alarms for any issues that arise.

## Set Up the Basic Infrastructure

1. **Create an AWS Account** (if you don't already have one).
2. **Set Up IAM Roles and Policies**:
   - Create IAM users with necessary permissions for accessing AWS services.
   - Create IAM roles for Lambda functions with permissions to access DynamoDB, S3, and other required services.
3. **Create a DynamoDB Table**:
   - Set up a DynamoDB table for storing tasks and projects.
4. **Set Up AWS Lambda**:
   - Create initial Lambda functions for task management (e.g., create, update, delete).
5. **Create an API Gateway**:
   - Set up an API Gateway to expose endpoints for the Lambda functions.
6. **Set Up Amazon Cognito (for user authentication)**:
   - Create a Cognito User Pool for managing user sign-ups and logins.

## Create an AWS Account

If you don't have an AWS account, go to [AWS Signup](https://aws.amazon.com/signup/) and create a new account.

## Set Up AWS Lambda

1. **Go to the Lambda Console**:

   - Access the AWS Management Console and navigate to the Lambda service.

2. **Click on "Create function."**:

   - Select the option to create a new function.

3. **Configure Lambda Function**:

   - **Function name**: `CreateTask`
   - **Runtime**: Choose either Node.js or Python, depending on your preference.
   - **Permissions**: Choose the existing role you created earlier for Lambda.

4. **Add Function Code**:

   - Write the logic code for the Lambda function to create, updating, deleting, and retrieving tasks in DynamoDB.<p>
     Here’s a simple Example!

   - [CreateTask Lambda function](./Lambda%20functions/CreateTask.js).<p>
     This function will handle the creation of a new task in your DynamoDB table.
   - [UpdateTask Lambda function](./Lambda%20functions/UpdateTask.js).<p>
     This function updates an existing task in the DynamoDB table.
   - [DeleteTask Lambda function](./Lambda%20functions/DeleteTask.js).<p>
     This function deletes a task from the DynamoDB table.
   - [GetTask Lambda function](./Lambda%20functions/GetTask.js).<p>
     This function retrieves a specific task from the DynamoDB table.

- **Note**:
  - After AWS Lambda is set up you will found that there is lambada role in permision under configration section
    - `AWSLambdaBasicExecutionRole`
  - Click on it will take you to IAM console as we will set up IAM inline policy for DynamoDB and S3 later.

## Set Up IAM Roles and Policies

- **Create IAM Users**:

  - Go to the IAM console.
  - Create IAM users for your development team with appropriate permissions (e.g., full access to DynamoDB, Lambda, and API Gateway).

- **Create IAM policy for Lambda**:
  - In the IAM console, within the outmated role that generated when create lambda.
  - Attach policies that allow access to DynamoDB and S3.
    - Example policies:
      - `AmazonDynamoDBFullAccess`
      - `AmazonS3FullAccess`
- you can custmize policy to include target `DynamoDB Table` and `S3 bucket` by using IAM Inline policy.

## Create a DynamoDB Table

- Go to the DynamoDB Console.
- Click on "Create table."
- Configure Table Settings:
  - Table name: `Tasks`
  - Primary key:
    - Partition key: `UserId` (String)
    - Sort key: `TaskId` (String)
  - Click "Create" to finish the table setup.
- `Note`:
- Write down Amazon Resource Name (ARN) table you will need it to Crate IAM inline policy.

  `arn:aws:dynamodb:<Region>:<Account-ID>:table/Tasks`

## Set Up API Gateway

- **Create an API Gateway**

1. **Go to the API Gateway Console**:

   - Access the AWS Management Console and navigate to the API Gateway service.

2. **Choose "Create API" and select REST API**:

   - Follow the prompts to create a new REST API.

3. **Configure API Settings**:

   - **API name**: `TaskManagementAPI`
   - Click "Create API."

4. **Create Resources and Methods**:

   - Create resources for each functionality (e.g., `/tasks`).
   - For each resource, create methods (GET, POST, PUT, DELETE) and link them to the corresponding Lambda functions.<p>
     For example:

   **Create API Gateway Endpoints for Each Function**:

   - **POST /tasks/update**: For updating tasks (linked to `UpdateTask`).
   - **DELETE /tasks/{UserId}/{TaskId}**: For deleting tasks (linked to `DeleteTask`).
   - **GET /tasks/{UserId}/{TaskId}**: For retrieving tasks (linked to `GetTask`).

5. **Deploy the API**:
   - Click on "Deploy API" and create a new stage (e.g., `dev`).

## Set Up Amazon Cognito

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

### Summary

> By completing these steps, you will have successfully set up the initial infrastructure for your project management and issue tracking application using AWS services. This includes creating Lambda functions for task management, setting up an API Gateway for communication between the frontend and backend, and implementing Amazon Cognito for secure user authentication.

### Next Steps

> Once you have set up and tested AWS Services, we can move on to NEXT Phase , where we will focus on developing the frontend application.
