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

    let res;
    try {
        res = await http.post(queueURL, payload, params);
    } catch (e) {
        console.error(e);
    }
    console.log(res.body);
}


