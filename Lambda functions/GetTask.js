const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { UserId, TaskId } = event.pathParameters;

    const getCommand = new GetCommand({
        TableName: "Tasks",
        Key: {
            UserId: UserId,
            TaskId: TaskId,
        },
    });

    try {
        const result = await docClient.send(getCommand);
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Task not found" }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ task: result.Item }),
        };
    } catch (error) {
        console.error("Error retrieving task:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to retrieve task", error: error.message }),
        };
    }
};