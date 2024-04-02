import { SQSClient } from "https://jslib.k6.io/aws/0.11.0/sqs.js";
import exec from "k6/execution";
import { randomIndexingPayload } from "./payload.js";

export function indexingFunc(data) {
  if (__ENV.SCENARIO !== "indexing")
    exec.test.abort("aborting because scenario is not indexing");

  const sqsClient = new SQSClient(data.awsConfig);
  // Send message to test queue
  (async function () {
    try {
      await sqsClient.sendMessage(
        __ENV.QUEUE_URL,
        JSON.stringify(randomIndexingPayload()),
        {
          messageGroupId: new Date().getUTCMilliseconds(),
          messageAttributes: {
            contentType: {
              type: "String",
              value: "application/json",
            },
            timestamp: {
              type: "Number.java.lang.Long",
              value: Date.now(),
            },
          },
        }
      );
    } catch (e) {
      console.log("failed to send message to queue: " + e.toString());
      exec.test.abort("failed to send message to queue: " + e.toString());
    }
  })();
}
