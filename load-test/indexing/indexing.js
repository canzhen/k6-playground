import { SQSClient } from "https://jslib.k6.io/aws/0.11.0/sqs.js";
import exec from "k6/execution";
import { randomIndexingPayload } from "./payload.js";

export function indexingFunc(data) {
  if (__ENV.SCENARIO !== "indexing")
    exec.test.abort("aborting because scenario is not indexing");

  const sqsClient = new SQSClient(data.awsConfig);
  // List queues to see if the queue we're sending message to exists
  (async function () {
    let listQueueResponse;
    try {
      listQueueResponse = await sqsClient.listQueues({
        queueNamePrefix: __ENV.AWS_SQS_NAME,
      });
      if (
        listQueueResponse.urls.filter((q) => q === __ENV.QUEUE_URL).length === 0
      ) {
        exec.test.abort(
          "queue " + __ENV.QUEUE_URL + " does not exist, aborting test..."
        );
      }
    } catch (e) {
      console.log("failed to list queue: " + e.toString);
      exec.test.abort("failed to list queue: " + e.toString());
    }
  })();

  // Send message to test queue
  (async function () {
    try {
      await sqsClient.sendMessage(
        __ENV.QUEUE_URL,
        JSON.stringify(randomIndexingPayload()),
        {
          messageGroupId: new Date().getUTCMilliseconds(),
        }
      );
    } catch (e) {
      console.log("failed to send message to queue: " + e.toString());
      exec.test.abort("failed to send message to queue: " + e.toString());
    }
  })();
}
