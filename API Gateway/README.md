# Set Up API Gateway

1. **Create API Gateway Endpoints for Each Function**:
   - **POST /tasks/update**: For updating tasks (linked to `UpdateTask`).
   - **DELETE /tasks/{UserId}/{TaskId}**: For deleting tasks (linked to `DeleteTask`).
   - **GET /tasks/{UserId}/{TaskId}**: For retrieving tasks (linked to `GetTask`).

2. **Test the Functions**:
   - Use Postman or a similar tool to test the API endpoints and ensure they work as expected.

