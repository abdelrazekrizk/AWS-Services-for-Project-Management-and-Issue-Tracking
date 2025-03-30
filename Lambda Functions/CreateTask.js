// Import necessary AWS SDK clients
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
// Create a DocumentClient for easier data manipulation
const docClient = DynamoDBDocumentClient.from(client);

// Main handler function for the Lambda
export const handler = async (event) => {
    // Parse the incoming event body to retrieve UserId, TaskId, and taskDetails
    const { UserId, TaskId, taskDetails } = JSON.parse(event.body);
    const tableName = "Tasks"; // Ensure this matches your actual table name

    try {
        // Create a PutCommand to specify the table and the item to insert
        const putCommand = new PutCommand({
            TableName: tableName, // The name of the DynamoDB table
            Item: {
                UserId: UserId, // The UserId for the new item
                TaskId: TaskId, // The TaskId for the new item
                ...taskDetails, // Additional task details spread into the item
            },
        });

        // Send the put command to DynamoDB
        await docClient.send(putCommand);

        // Return a success response if the item was added successfully
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Task created successfully" }),
        };
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error adding task:", error);

        // Return an error response if something went wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to create task", error: error.message }),
        };
    }
};  