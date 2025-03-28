# Architecture for AWS services project management and issue tracking application

The architecture is divided into several tiers, each with a specific role in the overall functionality of the application.

![Architecture Diagram](./AWS%20Services%20for%20Project%20Management%20and%20Issue%20Tracking.drawio.png)

## Summary of Process Flow

- **Frontend Application → API Gateway**: The frontend sends HTTP requests to the API Gateway.
- **API Gateway → AWS Lambda**: The API Gateway routes requests to the relevant Lambda functions.
- **AWS Lambda → Amazon DynamoDB**: The Lambda functions interact with DynamoDB to create or update tasks.
- **AWS Lambda → Amazon S3**: If files are uploaded, Lambda functions handle file storage in S3.
- **AWS Lambda → Amazon SNS**: Notifications may be sent based on task updates or other significant events.

## Architecture Overview

### Frontend Application

- **Frontend Application**: This is the user interface built using a framework like React, Angular, or Vue.js. Users interact with this application to create, update, and manage tasks.

### API Gateway

- **Amazon API Gateway**: Acts as the entry point for all HTTP requests from the frontend. It exposes RESTful APIs that the frontend can call to interact with the backend services. The API Gateway routes requests to the appropriate AWS Lambda functions based on the endpoint.

### AWS Lambda Functions

- **AWS Lambda (Task Creation)**: When a user creates a task, the API Gateway triggers this Lambda function. The function handles the logic for creating a new task and interacts with DynamoDB to store the task data.

- **AWS Lambda (Task Update)**: Similarly, when a user updates a task, the API Gateway triggers another Lambda function that updates the task in DynamoDB.

### Data Storage

- **Amazon DynamoDB**: This is the NoSQL database where task data is stored. It allows for flexible schema design and high scalability. Both the task creation and update Lambda functions read from and write to this database.

### File Storage

- **Amazon S3**: If users upload files (e.g., attachments for tasks), a separate Lambda function can handle the file upload directly to Amazon S3. The frontend can also directly upload files to S3, which allows for efficient handling of file storage.

### Notifications

- **Amazon SNS**: When significant events occur (e.g., task updates), the relevant Lambda function can trigger notifications via Amazon SNS to alert users.

## Example: Task Update Process Complete Flow

### Task Creation:

1. User fills in task details in the frontend application.
2. The frontend makes a POST request to the API Gateway to create a new task.
3. The API Gateway routes this request to the Task Creation Lambda function.
4. The Lambda function processes the request and writes the task data to DynamoDB.
5. If a file is uploaded, the frontend can upload it to S3 directly or through another Lambda function.
6. The Lambda function may also publish a notification to SNS to inform users about the new task.

### Task Update:

1. The user edits the task in the frontend application.
2. The frontend makes a PUT request to the API Gateway to update the task.
3. The API Gateway routes this request to the Task Update Lambda function.
4. The Lambda function retrieves the current task from DynamoDB, applies the updates, and writes the updated task back to DynamoDB.
5. The Lambda function may publish a notification to SNS to inform users about the task update.

