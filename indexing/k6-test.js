import { fromTokenFile } from "@aws-sdk/credential-provider-web-identity";
import { getDefaultRoleAssumerWithWebIdentity } from "@aws-sdk/client-sts";
import {
  SQSClient,
  ListQueuesCommand,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";

const testQueue = __ENV.AWS_SQS_URL + __ENV.AWS_SQS_NAME;

export default async function () {
  console.log(0);
  console.log(__ENV.AWS_WEB_IDENTITY_TOKEN_FILE);
  const sqsClient = new SQSClient({
    region: __ENV.AWS_REGION,
    credentials: fromTokenFile({
      webIdentityTokenFile: __ENV.AWS_WEB_IDENTITY_TOKEN_FILE,
      roleArn: __ENV.AWS_ROLE_ARN,
      roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(),
    }),
  });
  console.log(1);
  // List queues to see if the queue we're sending message to exists
  let listQueueResponse;
  try {
    console.log(2);
    listQueueResponse = await sqsClient.send(
      new ListQueuesCommand({ queueNamePrefix: __ENV.AWS_SQS_NAME })
    );
    console.log(3);
    if (queuesResponse.urls.filter((q) => q === testQueue).length === 0) {
      console.log("queue " + testQueue + " does not exist, aborting test...");
      return;
    }
  } catch (e) {
    console.log("failed to list queue");
    console.error(e.toString());
    console.log(listQueueResponse);
    return;
  }

  // Send message to test queue
  let sendMessageResponse;
  try {
    sendMessageResponse = await sqsClient.send(
      new SendMessageCommand({
        QueueUrl:
          "https://sqs.us-east-1.amazonaws.com/749143309851/sbx-k6-test",
        MessageBody: JSON.stringify({ value: "123" }),
      })
    );
  } catch (e) {
    console.log("failed to send message to queue: " + e);
    console.error(e);
    console.log(sendMessageResponse);
    return;
  }
  console.log("message sent to queue, response: ");
  console.log(sendMessageResponse);
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '3s',
};
