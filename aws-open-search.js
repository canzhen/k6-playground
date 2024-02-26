import http from 'k6/http';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 1,
  // A string specifying the total duration of the test run.
  duration: '1s',
};

export default function() {
  const url = 'https://vpc-vehicle-search-fewok7nvxukzxm74my6ve3d3sq.us-east-1.es.amazonaws.com/_search';
  const payload = JSON.stringify({
    "query": {
      "match_all": {}
    }
  });

  const params = {
    'headers': {
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(url, payload, params);
  console.log('我\n' + res.body + '\n我')
}
