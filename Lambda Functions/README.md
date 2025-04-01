# Summary of Each Lambda Function

## UpdateTask
- **Description**: Updates a task in the DynamoDB table based on `UserId` and `TaskId`.
- **Functionality**: Uses the `UpdateCommand` to update the specified attributes in the task.

## DeleteTask
- **Description**: Deletes a task from the DynamoDB table using `UserId` and `TaskId`.
- **Functionality**: Uses the `DeleteCommand` to remove the item from the table.

## GetTask
- **Description**: Retrieves a specific task based on `UserId` and `TaskId`.
- **Functionality**: Uses the `GetCommand` to fetch the item from the table and returns it.

## CreateTask
- **Description**: Handles the creation of a new task in your DynamoDB table.
- **Functionality**: Takes input from the user (task details) and stores it in the DynamoDB table.

**Test Each Function**:
   - Use the built-in testing feature in AWS Lambda to create test events that simulate API requests and ensure that each function works correctly.

### Example Test Input

-   **CreateTask**:

For `CreateTask`, you might use a test event like this:

```
{
  "body": "{\"UserId\": \"user123\", \"TaskId\": \"task001\", \"taskDetails\": {\"taskName\": \"Implement API\", \"priority\": \"High\"}}"
}
```
-   **UpdateTask**

For `UpdateTask`, you might use:

```
{
  "body": "{\"UserId\": \"user123\", \"TaskId\": \"task001\", \"taskDetails\": {\"taskName\": \"Implement API - Updated\", \"priority\": \"Medium\"}}"
}
```
-   **DeleteTask**

For `DeleteTask`, you might use:

```
{
  "body": "{\"UserId\": \"user123\", \"TaskId\": \"task001\"}"
}
```
-   **GetTask**

For `GetTask`, you would set the path parameters in the test event instead:

```
{
  "pathParameters": {
    "UserId": "user123",
    "TaskId": "task001"
  }
}
```

## S3 Upload Triggering SNS

- **Description**: This Lambda function is triggered when a file is uploaded to a specified S3 bucket. It sends a notification via Amazon Simple Notification Service (SNS) to inform subscribers about the new file upload.

- **Functionality**:
  - Listens for events from S3 (specifically, `s3:ObjectCreated:*`).
  - Extracts the bucket name and object key from the event.
  - Constructs a notification message containing details about the uploaded file.
  - Publishes the notification message to a specified SNS topic.

- **Environment Variables**:
  - `SNS_TOPIC_ARN`: The ARN of the SNS topic to which notifications will be sent.

- **IAM Permissions**:
  - The Lambda function requires permissions to read from the S3 bucket and publish messages to the SNS topic. Ensure the following permissions are included in the IAM role:
    - `s3:GetObject`
    - `sns:Publish`

- **Example SNS Message**:
  - `"File uploaded: example.txt to bucket: my-bucket"`

---

## DynamoDB Operations Triggering SNS

- **Description**: This Lambda function is invoked during Create, Update, or Delete operations on tasks in the DynamoDB table. It sends a notification via Amazon Simple Notification Service (SNS) to inform subscribers about the changes to the tasks.

- **Functionality**:
  - Accepts an event containing the operation type (`CREATE`, `UPDATE`, or `DELETE`), `UserId`, `TaskId`, and task details.
  - For a **CREATE** operation:
    - Uses the `PutCommand` to insert a new task into the DynamoDB table.
    - Constructs and publishes a notification message about the task creation.
  - For an **UPDATE** operation:
    - Updates the specified attributes of the existing task in the DynamoDB table.
    - Constructs and publishes a notification message about the task update.
  - For a **DELETE** operation:
    - Uses the `DeleteCommand` to remove the task from the DynamoDB table.
    - Constructs and publishes a notification message about the task deletion.

- **Environment Variables**:
  - `SNS_TOPIC_ARN`: The ARN of the SNS topic to which notifications will be sent.
  - `DYNAMODB_TABLE_NAME`: The name of the DynamoDB table where tasks are stored.

- **IAM Permissions**:
  - The Lambda function requires permissions to perform operations on the DynamoDB table and publish messages to the SNS topic. Ensure the following permissions are included in the IAM role:
    - `dynamodb:PutItem`
    - `dynamodb:UpdateItem`
    - `dynamodb:DeleteItem`
    - `sns:Publish`

- **Example SNS Messages**:
  - For **CREATE**: `"Task created: task123 for User: user456"`
  - For **UPDATE**: `"Task updated: task123 for User: user456"`
  - For **DELETE**: `"Task deleted: task123 for User: user456"`

---

### Testing

To test the functionality of each Lambda function:

1. **For S3 Upload Triggering SNS**:
   - Upload a file to the specified S3 bucket.
   - Check the SNS topic subscribers for the notification message.

2. **For DynamoDB Operations Triggering SNS**:
   - Invoke the Lambda function with a test event containing the operation type and relevant details.
   - Check the SNS topic subscribers for the corresponding notification message.

### Notes

- Make sure to replace placeholders such as `SNS_TOPIC_ARN` and `DYNAMODB_TABLE_NAME` with actual values in your environment.
- Monitor CloudWatch logs for each Lambda function for debugging and operational insights.