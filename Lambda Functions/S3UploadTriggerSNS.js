// Import necessary AWS SDK clients
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { S3Event } from 'aws-lambda';

// Create an SNS client
const snsClient = new SNSClient({ region: "us-east-1" }); // Replace with your desired region

// Main handler function for the S3 upload trigger
export const handler = async (event: S3Event) => {
    const topicArn = "arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:YOUR_TOPIC_NAME"; // Replace with your SNS Topic ARN

    // Iterate through each record in the event
    for (const record of event.Records) {
        const bucketName = record.s3.bucket.name;
        const objectKey = record.s3.object.key;

        const message = `File uploaded: ${objectKey} to bucket: ${bucketName}`;

        const params = {
            Message: message,
            TopicArn: topicArn,
        };

        try {
            // Publish the message to SNS
            await snsClient.send(new PublishCommand(params));
            console.log(`Message sent to SNS: ${message}`);
        } catch (error) {
            console.error("Error sending SNS message:", error);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "SNS notification sent successfully." }),
    };
};