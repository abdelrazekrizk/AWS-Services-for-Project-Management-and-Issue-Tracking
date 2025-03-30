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