# API Gateway Setup for Lambda Functions

## Overview

Create an API Gateway to expose your Lambda functions as RESTful APIs. You will define resources and methods for each function (Create, Update, Delete, Get), deploy the API, and test the endpoints to ensure they work as expected.
---
### Step 1: Create an API Gateway

1. **Go to the API Gateway Console**:
   - Open the AWS Management Console and navigate to the API Gateway service.

2. **Create a New API**:
   - Choose **Create API**.
   - Select **REST API** (not private) and click **Build**.

3. **Configure API Settings**:
   - **API name**: `TaskManagementAPI`
   - **Description**: A simple API for task management.
   - Leave other settings as default and click **Create API**.
---
### Step 2: Define Resources and Methods

1. **Create Resource for Tasks**:
   - Click on **Resources** in the left navigation pane.
   - Click on **Actions** and select **Create Resource**.
     - **Resource Name**: `tasks`
     - **Resource Path**: `/tasks`
   - Click **Create Resource**.

2. **Create Methods**:
   - Select the `/tasks` resource and click on **Actions**, then select **Create Method**.

   a. **POST Method (Create Task)**:
   - Select **POST** from the dropdown and click the checkmark.
     - **Integration type**: Lambda Function
     - **Lambda Function**: Enter the name of your `CreateTask` Lambda function.
   - Click **Save** and grant API Gateway permission to invoke your Lambda function.

   b. **PUT Method (Update Task)**:
   - Repeat the above steps, but this time select **PUT**.
     - **Integration type**: Lambda Function
     - **Lambda Function**: Enter the name of your `UpdateTask` Lambda function.
   - Click **Save**.

   c. **DELETE Method (Delete Task)**:
   - Create a **DELETE** method.
     - **Integration type**: Lambda Function
     - **Lambda Function**: Enter the name of your `DeleteTask` Lambda function.
   - Click **Save**.

   d. **GET Method (Get Task)**:
   - Create a **GET** method.
     - **Integration type**: Lambda Function
     - **Lambda Function**: Enter the name of your `GetTask` Lambda function.
   - Click **Save**.

3. **Set Up Path Parameters for GET and DELETE**:
   - For the **GET** and **DELETE** methods, you need to set up path parameters:
     - Select the **GET** method, click on **Method Request**, and add path parameters:
       - **Name**: `UserId` (Required)
       - **Name**: `TaskId` (Required)
     - Repeat the same for the **DELETE** method.
---
### Step 3: Deploy the API

1. **Deploy the API**:
   - Click on **Actions** and select **Deploy API**.
   - **Deployment stage**: Create a new stage (e.g., `dev`).
   - Click **Deploy**.

2. **Copy the Invoke URL**:
   - After deployment, you will see the Invoke URL for the API. This URL will be used to access the API endpoints.
---
### Step 4: Test the API Endpoints

You can use tools like Postman, cURL, or even your browser to test the API endpoints and ensure they work as expected.

1. **Test Create Task**:
   - **Endpoint**: `POST {Invoke URL}/tasks`
   - **Body**:
     ```json
     {
       "UserId": "user123",
       "TaskId": "task001",
       "taskDetails": {
         "taskName": "Implement API",
         "priority": "High"
       }
     }
     ```

2. **Test Update Task**:
   - **Endpoint**: `PUT {Invoke URL}/tasks`
   - **Body**:
     ```json
     {
       "UserId": "user123",
       "TaskId": "task001",
       "taskDetails": {
         "taskName": "Implement API - Updated",
         "priority": "Medium"
       }
     }
     ```

3. **Test Delete Task**:
   - **Endpoint**: `DELETE {Invoke URL}/tasks/user123/task001`

4. **Test Get Task**:
   - **Endpoint**: `GET {Invoke URL}/tasks/user123/task001`

---
## Summary
At the end, you should have:
- An API Gateway set up with resources and methods for managing tasks.
- The ability to create, update, delete, and retrieve tasks via RESTful API endpoints.
- Successfully tested the API endpoints to ensure they are functioning correctly.

---
