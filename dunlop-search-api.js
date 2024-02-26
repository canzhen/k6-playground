import http from 'k6/http';

export default function() {
  const url = 'https://turo.xyz/api/v2/search';
  const data = {
    "filters": {
        "location": {
            "country": "US",
            "type": "poi",
            "locationId": 31940,
            "pickupType": "ALL"
        },
        "engines": [],
        "makes": [],
        "models": [],
        "dates": {
            "end": "2024-04-14T10:00",
            "start": "2024-04-11T10:00"
        },
        "tmvTiers": [],
        "features": [],
        "types": []
    },
    "sorts": {
        "direction": "ASC",
        "type": "RELEVANCE"
    }
  };
  const params = {
    headers: {
      'content-type': 'application/json',
      'referer': 'https://turo.xyz',
      // 'user-agent': 'jojok6',
      'user-agent': 'Turo/22.44.1 (iPhone; iOS 15.0; Scale/2.00)',
    },
  };
  // send a post request and save response as a variable
  const res = http.post(url, JSON.stringify(data), params);
  console.log('\n-------------------- length of returned vehicles: ' + res.json().vehicles.length + ' --------------------\n');
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  duration: '3s',
};