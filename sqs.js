import exec from 'k6/execution'

import { AWSConfig, SQSClient } from 'https://jslib.k6.io/aws/0.11.0/sqs.js'

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
})

const sqs = new SQSClient(awsConfig)
const testQueue = 'https://sqs.us-east-1.amazonaws.com/749143309851/sbx-k6-test'

export default async function () {
    console.log('sending message to queue ' + testQueue);
    // If our test queue does not exist, abort the execution.
    const queuesResponse = await sqs.listQueues()
    if (queuesResponse.urls.filter((q) => q === testQueue).length == 0) {
        console.log('queue ' + testQueue +  ' does not exist, aborting test...')
        exec.test.abort()
        return;
    }

    // Send message to test queue
    let res;
    try {
        await sqs.sendMessage(testQueue, JSON.stringify({value: '123'}));
    } catch (e) {
        console.log('failed to send message to queue');
        console.error(e);
        return;
    }
    console.log('message sent to queue, response: ' + res);
}


export const options = {
    // A number specifying the number of VUs to run concurrently.
    vus: 1,
    // A string specifying the total duration of the test run.
    // duration: '3s',
  };