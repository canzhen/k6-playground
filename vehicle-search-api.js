import http from 'k6/http';
import { SharedArray } from 'k6/data';


// load test config, used to populate exported options object:
const testConfig = JSON.parse(open('./options.json'));


const requests = new SharedArray('requests', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const requests = JSON.parse(open('./search_requests.json'));
  return requests; // f must be an array[]
});

export default function() {
  const params = {
    headers: {
      'content-type':testConfig.vehicle_search.content_type,
      'referer': testConfig.vehicle_search.sandbox.referer,
      'user-agent': testConfig.user_agent,
    },
  };
  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
      // send a post request and save response as a variable
    const res = http.post(testConfig.vehicle_search.sandbox.url, JSON.stringify(request), params);
    console.log('returned vehicles: ' + res.json().vehicles + '.\n');
  }
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '1s',
};