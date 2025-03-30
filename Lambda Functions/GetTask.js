// Import necessary AWS SDK clients
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
// Create a DocumentClient for easier data manipulation
const docClient = DynamoDBDocumentClient.from(client);

// Main handler function for the Lambda
export const handler = async (event) => {
    // Extract UserId and TaskId from path parameters
    const { UserId, TaskId } = event.pathParameters;

    // Create a GetCommand to specify the table and the key of the item to retrieve
    const getCommand = new GetCommand({
        TableName: "Tasks", // The name of the DynamoDB table
        Key: {
            UserId: UserId, // The UserId of the item to retrieve
            TaskId: TaskId, // The TaskId of the item to retrieve
        },
    });

    try {
        // Send the get command to DynamoDB
        const result = await docClient.send(getCommand);

        // Check if the item was found
        if (!result.Item) {
            // Return a 404 response if the item does not exist
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Task not found" }),
            };
        }

        // Return a success response with the retrieved item
        return {
            statusCode: 200,
            body: JSON.stringify({ task: result.Item }),
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error retrieving task:", error);

        // Return an error response if something went wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to retrieve task", error: error.message }),
        };
    }
};  