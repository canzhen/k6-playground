import http from 'k6/http';
import { SharedArray } from 'k6/data';

const url = 'https://turo.xyz/api/v2/search';

const params = {
  headers: {
    'content-type': 'application/json',
    'referer': 'https://turo.xyz',
    // 'user-agent': 'jojok6',
    'user-agent': 'Turo/22.44.1 (iPhone; iOS 15.0; Scale/2.00)',
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
    const res = http.post(url, JSON.stringify(request), params);
    console.log('\n-------------------- length of returned vehicles: ' + res.json().vehicles.length + ' --------------------\n');
  }
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '3s',
};