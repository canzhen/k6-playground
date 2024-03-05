import http from 'k6/http';
import { SharedArray } from 'k6/data';

const requests = new SharedArray('requests', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const requests = JSON.parse(open('./search_requests.json'));
  return requests; // f must be an array[]
});

export default function() {
  const url = 'http://vehicle-search-api.sbx-1278.svc.cluster.local/api/v2/search';
  const params = {
    headers: {
      'content-type': 'application/json',
      'referer': 'http://vehicle-search-api.sbx-1278.svc.cluster.local',
      'user-agent': 'jojok6',
    },
  };
  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
      // send a post request and save response as a variable
    const res = http.post(url, JSON.stringify(request), params);
    console.log('returned vehicles: ' + res.json().vehicles + '.\n');
  }
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '1s',
};