// Import necessary AWS SDK clients
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
// Create a DocumentClient for easier data manipulation
const docClient = DynamoDBDocumentClient.from(client);

// Main handler function for the Lambda
export const handler = async (event) => {
    // Parse the incoming event body to retrieve UserId, TaskId, and taskDetails
    const { UserId, TaskId, taskDetails } = JSON.parse(event.body);

    // Create an UpdateCommand to specify the table and the update operation
    const updateCommand = new UpdateCommand({
        TableName: "Tasks", // The name of the DynamoDB table
        Key: {
            UserId: UserId, // The UserId of the item to update
            TaskId: TaskId, // The TaskId of the item to update
        },
        UpdateExpression: "set taskName = :taskName, priority = :priority", // Define the update operation
        ExpressionAttributeValues: {
            ":taskName": taskDetails.taskName, // New task name value
            ":priority": taskDetails.priority, // New priority value
        },
        ReturnValues: "ALL_NEW", // Return all attributes after the update
    });

    try {
        // Send the update command to DynamoDB
        const result = await docClient.send(updateCommand);

        // Return a success response with the updated task details
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Task updated successfully",
                updatedTask: result.Attributes, // The updated item
            }),
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error updating task:", error);

        // Return an error response if something went wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to update task", error: error.message }),
        };
    }
};  