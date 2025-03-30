// Import necessary AWS SDK clients
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
// Create a DocumentClient for easier data manipulation
const docClient = DynamoDBDocumentClient.from(client);

// Main handler function for the Lambda
export const handler = async (event) => {
    // Parse the incoming event body to retrieve UserId and TaskId
    const { UserId, TaskId } = JSON.parse(event.body);

    // Create a DeleteCommand to specify the table and the key of the item to delete
    const deleteCommand = new DeleteCommand({
        TableName: "Tasks", // The name of the DynamoDB table
        Key: {
            UserId: UserId, // The UserId of the item to delete
            TaskId: TaskId, // The TaskId of the item to delete
        },
    });

    try {
        // Send the delete command to DynamoDB
        await docClient.send(deleteCommand);

        // Return a success response if the deletion was successful
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Task deleted successfully" }),
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error deleting task:", error);

        // Return an error response if something went wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to delete task", error: error.message }),
        };
    }
};  