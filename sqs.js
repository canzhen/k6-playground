import http from 'k6/http';
const queueURL = 'https://sqs.us-east-1.amazonaws.com/749143309851/k6-test'

export const options = {
    vus: 1,
  };

export default async function () {
    let res;
    try {
        res = await http.get('https://sts.amazonaws.com?Version=2011-06-15&Action=AssumeRoleWithWebIdentity&RoleArn=arn:aws:iam::749143309851:role/load-testing-testkube&DurationSeconds=3600&RoleSessionName=k6-load-testing-session');
    } catch (e) {
        console.error(e);
    }
    console.log(res.body);
}


