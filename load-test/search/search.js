import http from "k6/http";
import exec from "k6/execution";
import { check } from "k6";
import { randomSearchPayload } from "./payload.js";

export function searchFunc() {
  if (__ENV.SCENARIO !== "search")
    exec.test.abort("aborting because scenario is not search");

  // const payload = JSON.stringify(randomSearchPayload(), null, 2);
  // console.log('---------------------------- search payload ----------------------------');
  // console.log(payload);
  const payload = JSON.stringify({
    "filters":{
      "location":{
        "country":"US",
        "type":"area",
        "point":{
          "lat":"34.0549076",
          "lng":"-118.2426430",
        },
      },
      "engines":[],
      "makes":[],
      "models":[],
      "dates":{
        "end":"2024-05-16T10:00",
        "start":"2024-05-13T10:00",
      },
      "tmvTiers":[],
      "features":[],
      "types":[],
    },
    "sorts":{
      "direction":"ASC",
      "type":"RELEVANCE",
    },
    "searchContext": {
      "searchId": "12345",
    }
  }, null, 2);
  const res = http.post(__ENV.SEARCH_REQUEST_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": __ENV.SEARCH_REQUEST_USER_AGENT,
      Referer: __ENV.SEARCH_REQUEST_REFERRER,
    },
  });
  console.log('---------------------------- search result ----------------------------');
  console.log(res.json());
  check(res.json(), {
    "is status 200": (r) => r.searchId !== undefined && r.vehicles !== undefined && r.vehicles.length >= 0,
    "has vehicles": (r) => r.vehicles !== undefined && r.vehicles.length > 0,
  });
}
