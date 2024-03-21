import http from "k6/http";
import { check } from "k6";
import { randomSearchPayload } from "./payload.js";
// load test config, used to populate exported options object:
const testConfig = require("./header-configs.json");

const params = {
  headers: {
    "Content-Type": testConfig.dunlop_search.content_type,
    "User-Agent": testConfig.user_agent,
    Referer: testConfig.dunlop_search.xyz.referer,
  },
};

export function setup() {
  // send a post request and save response as a variable
  const p = randomSearchPayload();
  console.log("test case: ");
  console.log(JSON.stringify(p, null, 2));
  const res = http.post(
    testConfig.dunlop_search.xyz.url,
    JSON.stringify(p),
    params
  );
  return { data: res.json() };
}

export default function (data) {
  check(data, {
    "is status 200": (r) => r.status === 200,
    "has vehicles": (r) =>
      r.status === 200 && r.vehicles !== undefined && r.vehicles.length > 0,
  });
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '3s',
};
