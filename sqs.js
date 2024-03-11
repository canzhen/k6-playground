import exec from 'k6/execution'

import { SQSClient } from 'https://jslib.k6.io/aws/0.11.0/sqs.js'
const AWS = require("aws-sdk");
const testQueue = 'https://sqs.us-east-1.amazonaws.com/749143309851/k6-test'


export default async function () {
    const client = new AWS.STSClient({ region: "us-east-1" });
    // Assume the role
    try {
        // Returns a set of temporary security credentials that you can use to
        // access Amazon Web Services resources that you might not normally
        // have access to.
        const command = new AWS.AssumeRoleCommand({
            // The Amazon Resource Name (ARN) of the role to assume.
            RoleArn: "arn:aws:iam::749143309851:role/load-testing-testkube",
            // An identifier for the assumed role session.
            RoleSessionName: "k6-test-session",
            // The duration, in seconds, of the role session. The value specified
            // can range from 900 seconds (15 minutes) up to the maximum session
            // duration set for the role.
            DurationSeconds: 900,
        });
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }

    const sqs = new SQSClient({});
    // If our test queue does not exist, abort the execution.
    const queuesResponse = await sqs.listQueues()
    if (queuesResponse.urls.filter((q) => q === testQueue).length == 0) {
        exec.test.abort()
    }

    // Send message to test queue
    await sqs.sendMessage(testQueue, JSON.stringify({value: '123'}));
}


