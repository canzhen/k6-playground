import http from 'k6/http';

export default function() {
  const url = 'http://vehicle-search-api.sbx-1278.svc.cluster.local/api/v2/search';
  const data = {
    "filters": {
      "location": {
        "type": "poi",
        "locationId": "7891112", 
        "country": "US",
        "pickupType": "ALL",
      },
      "engines": [],
      "features": [],
      "makes": [],
      "models": [],
      "dailyPrice": {},
      "dates": {
        "start": "2024-05-01T10:00",
        "end": "2024-05-07T10:00",
      },
      "isAllStarHost": false,
      "isInstantBook": false,
      "isRemoteUnlock": false,
      "minSeats": 0,
      "years": {},
    },
    "sorts": {
      "direction": "DESC",
      "type": "RELEVANCE"
    },
    "searchContext": {
      "searchId": "",
    },
  };
  const params = {
    headers: {
      'content-type': 'application/json',
      'referer': 'http://vehicle-search-api.sbx-1278.svc.cluster.local',
      'user-agent': 'jojok6',
    },
  };
  // send a post request and save response as a variable
  const res = http.post(url, JSON.stringify(data), params);
  console.log('returned vehicles: ' + res.json().vehicles + '.\n');
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '1s',
};