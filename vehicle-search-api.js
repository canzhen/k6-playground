import http from 'k6/http';

export default function() {
  const url = 'http://vehicle-search-api.sbx-1278.svc.cluster.local/api/v2/search';
  const data = {
    "filters": {
      "engines": [
        "COMBUSTION",
      ],
      "features": [
        "SKI_RACK"
      ],
      "location": {
        "type": "point",
        "country": "US",
        "point": {
          "lat": 37.77,
          "lng": 122.41,
        },
        "locationId": "123",
        "pickupType": "PICKUP_AT",
      },
      "makes": [
        "tesla",
      ],
      "models": [
        "modelY"
      ],
      "dailyPrice": {
        "valid": true,
        "min": {
          "amount": "50",
          "currency": "USD"
        },
        "max": {
          "amount": 120,
          "currency": "USD"
        }
      },
      "dates": {
        "start": "2024-04-11T10:00:00.000Z",
        "end": "2024-04-14T10:00:00.000Z",
        "valid": true,
      },
      "isAllStarHost": true,
      "isInstantBook": true,
      "isRemoteUnlock": true,
      "minSeats": 4,
      "transmission": "AUTOMATIC",
      "years": {
        "valid": true,
        "min": 2014,
        "max": 2024,
      }
    },
    "searchContext": {
      "searchId": "search_id_k6",
      "deviceId": "device_id_k6",
      "deviceType": "device_type_k6",
      "deviceModel": "device_model_k6",
      "sessionId": "session_id_k6",
      "trackingId": "tracking_id_k6",
    },
    "sorts": {
      "direction": "DESC",
      "type": "PRICE"
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
  console.log('\n-------------------- length of returned vehicles: ' + res.json().vehicles.length + ' --------------------\n');
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  // duration: '1s',
};