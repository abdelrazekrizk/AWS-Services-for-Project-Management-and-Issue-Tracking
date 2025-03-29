const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { UserId, TaskId, taskDetails } = JSON.parse(event.body);

    const updateCommand = new UpdateCommand({
        TableName: "Tasks",
        Key: {
            UserId: UserId,
            TaskId: TaskId,
        },
        UpdateExpression: "set taskName = :taskName, priority = :priority",
        ExpressionAttributeValues: {
            ":taskName": taskDetails.taskName,
            ":priority": taskDetails.priority,
        },
        ReturnValues: "ALL_NEW",
    });

    try {
        const result = await docClient.send(updateCommand);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Task updated successfully",
                updatedTask: result.Attributes,
            }),
        };
    } catch (error) {
        console.error("Error updating task:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to update task", error: error.message }),
        };
    }
};