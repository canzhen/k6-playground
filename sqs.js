import http from 'k6/http';
const queueURL = 'https://sqs.us-east-1.amazonaws.com/749143309851/k6-test'


export default async function () {
    const params = {
        headers: {
            'Host': 'sqs.us-east-1.amazonaws.com',
            'X-Amz-Target': 'AmazonSQS.SendMessage',
            'Content-Type': 'application/x-amz-json-1.0',
        },
    };

    const payload = {
        "QueueUrl": queueURL,
        "MessageBody": "this is a test",
    };

    let res;    
    try {
        res = await http.post(queueURL, JSON.stringify(payload), params)
    } catch (e) {
        console.log(e);
    }
    console.log(res);
}


