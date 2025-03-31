// Import necessary AWS SDK clients
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Create a new DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
const snsClient = new SNSClient({ region: "us-east-1" });

const topicArn = "arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:YOUR_TOPIC_NAME"; // Replace with your SNS Topic ARN

// Main handler function for the DynamoDB operations
export const handler = async (event) => {
    const { operation, UserId, TaskId, taskDetails } = event; // Assume these values are passed in the event
    const tableName = "Tasks"; // Ensure this matches your actual table name

    try {
        let message;

        if (operation === "CREATE") {
            // Create a PutCommand to specify the table and the item to insert
            const putCommand = new PutCommand({
                TableName: tableName,
                Item: {
                    UserId: UserId,
                    TaskId: TaskId,
                    ...taskDetails,
                },
            });

            // Send the put command to DynamoDB
            await docClient.send(putCommand);
            message = `Task created: ${TaskId} for User: ${UserId}`;

        } else if (operation === "UPDATE") {
            // Update logic here (using UpdateCommand)
            message = `Task updated: ${TaskId} for User: ${UserId}`;

        } else if (operation === "DELETE") {
            const deleteCommand = new DeleteCommand({
                TableName: tableName,
                Key: {
                    UserId: UserId,
                    TaskId: TaskId,
                },
            });

            // Send the delete command to DynamoDB
            await docClient.send(deleteCommand);
            message = `Task deleted: ${TaskId} for User: ${UserId}`;
        }

        // Publish the message to SNS
        await snsClient.send(new PublishCommand({
            Message: message,
            TopicArn: topicArn,
        }));

        console.log(`Message sent to SNS: ${message}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Operation successful and SNS notification sent." }),
        };

    } catch (error) {
        console.error("Error in operation:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Operation failed", error: error.message }),
        };
    }
};