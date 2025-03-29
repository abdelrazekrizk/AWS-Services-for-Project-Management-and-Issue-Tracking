const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    const { UserId, TaskId, taskDetails } = JSON.parse(event.body);

    const putCommand = new PutCommand({
        TableName: "Tasks",
        Item: {
            UserId: UserId,
            TaskId: TaskId,
            ...taskDetails,
        },
    });

    await docClient.send(putCommand);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Task created successfully" }),
    };
};