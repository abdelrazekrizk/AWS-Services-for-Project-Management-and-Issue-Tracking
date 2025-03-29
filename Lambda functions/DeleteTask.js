const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { UserId, TaskId } = JSON.parse(event.body);

    const deleteCommand = new DeleteCommand({
        TableName: "Tasks",
        Key: {
            UserId: UserId,
            TaskId: TaskId,
        },
    });

    try {
        await docClient.send(deleteCommand);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Task deleted successfully" }),
        };
    } catch (error) {
        console.error("Error deleting task:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to delete task", error: error.message }),
        };
    }
};