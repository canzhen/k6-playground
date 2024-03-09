import http from 'k6/http';
import { SharedArray } from 'k6/data';

// load test config, used to populate exported options object:
const testConfig = JSON.parse(open('./options.json'));


const params = {
  headers: {
    'content-type': testConfig.dunlop_search.content_type,
    'referer': testConfig.dunlop_search.xyz.referer,
    'user-agent': testConfig.user_agent,
  },
};

const requests = new SharedArray('requests', function () {
  // here you can open files, and then do additional processing or generate the array with data dynamically
  const requests = JSON.parse(open('./dunlop-search-requests.json'));
  return requests; // f must be an array[]
});


export default function() {
  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];
      // send a post request and save response as a variable
    const res = http.post(testConfig.dunlop_search.xyz.url, JSON.stringify(request), params);
    console.log('\n-------------------- length of returned vehicles: ' + res.json().vehicles.length + ' --------------------\n');
  }
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '3s',
};