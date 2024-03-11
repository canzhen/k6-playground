import exec from 'k6/execution'

// import { SQSClient } from 'https://jslib.k6.io/aws/0.11.0/sqs.js'
import http from 'k6/http';
const queueURL = 'https://sqs.us-east-1.amazonaws.com/749143309851/k6-test'


export default async function () {
    const params = {
        headers: {
            'Host': 'sqs.us-east-1.amazonaws.com',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    const payload = {
        value: '123'
    };

    await http.post(queueURL, payload, params)
    // // If our test queue does not exist, abort the execution.
    // const queuesResponse = await sqs.listQueues()
    // if (queuesResponse.urls.filter((q) => q === queueURL).length == 0) {
    //     exec.test.abort()
    // }

    // Send message to test queue
    // await sqs.sendMessage(queueURL, JSON.stringify({value: '123'}));
}


