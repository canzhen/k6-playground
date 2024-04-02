import http from "k6/http";
import { AWSConfig } from "https://jslib.k6.io/aws/0.11.0/sqs.js";
import { getEnvValue } from "./utils.js";
import { indexingFunc } from "./indexing/indexing.js";
import { searchFunc } from "./search/search.js";

const INDEXING_VU = getEnvValue("INDEXING_VU", 1);
const INDEXING_ITERATIONS = getEnvValue("INDEXING_ITERATIONS", 1);
const INDEXING_MAX_DURATION = getEnvValue("INDEXING_MAX_DURATION", "1s");
const SEARCH_VU = getEnvValue("SEARCH_VU", 1);
const SEARCH_DURATION = getEnvValue("SEARCH_DURATION", "1s");
const AWS_SQS_URL = getEnvValue("AWS_SQS_URL");
const AWS_SQS_NAME = getEnvValue("AWS_SQS_NAME");
const AWS_ROLE_ARN = getEnvValue("AWS_ROLE_ARN", "");
const AWS_REGION = getEnvValue("AWS_REGION", "us-east-1");

// const AWS_WEB_IDENTITY_TOKEN = open(
//   "/var/run/secrets/eks.amazonaws.com/serviceaccount/token",
//   "utf-8"
// );
// const ASSUME_ROLE_WITH_WEB_IDENTITY_URL =
//   AWS_WEB_IDENTITY_TOKEN && AWS_ROLE_ARN
//     ? `https://sts.amazonaws.com/?Action=AssumeRoleWithWebIdentity&RoleArn=${AWS_ROLE_ARN}&WebIdentityToken=${AWS_WEB_IDENTITY_TOKEN}&RoleSessionName=app1&Version=2011-06-15&DurationSeconds=3600`
//     : "";

export const options = {
  scenarios: {
    indexing: {
      executor: "per-vu-iterations",
      exec: "indexing",
      vus: INDEXING_VU,
      iterations: INDEXING_ITERATIONS,
      maxDuration: INDEXING_MAX_DURATION,
      env: {
        SCENARIO: "indexing",
        AWS_SQS_NAME: AWS_SQS_NAME,
        QUEUE_URL: AWS_SQS_URL + AWS_SQS_NAME,
      },
    },
    // search: {
    //   executor: "per-vu-iterations",
    //   exec: "search",
    //   vus: 1,
    //   iterations: 1, 
    //   maxDuration: '1s',
    //   env: {
    //     SCENARIO: "search",
    //     SEARCH_REQUEST_URL: getEnvValue("SEARCH_REQUEST_URL"),
    //     SEARCH_REQUEST_USER_AGENT: getEnvValue(
    //       "SEARCH_REQUEST_USER_AGENT",
    //       "Turo/22.44.1 (iPhone; iOS 15.0; Scale/2.00)"
    //     ),
    //     SEARCH_REQUEST_REFERRER: getEnvValue("SEARCH_REQUEST_REFERRER"),
    //   },
    // },
  },
};

export function setup() {
  // const res = http
  //   .post(ASSUME_ROLE_WITH_WEB_IDENTITY_URL, null, {
  //     headers: { Accept: "application/json" },
  //   })
  //   .json();
  // const credentials =
  //   res.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult
  //     .Credentials;

  // const awsConfig = new AWSConfig({
  //   region: AWS_REGION,
  //   accessKeyId: credentials.AccessKeyId,
  //   secretAccessKey: credentials.SecretAccessKey,
  //   sessionToken: credentials.SessionToken,
  // });

  // return { awsConfig: new AWSConfig({
  //     region: __ENV.AWS_REGION,
  //     accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  //   })};
}

export function indexing(data) {
  return indexingFunc(data);
}

export function search() {
  return searchFunc();
}
