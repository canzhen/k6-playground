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
            "end": "2024-02-14T10:00",
            "start": "2024-02-11T10:00"
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

  // The following section contains configuration options for execution of this
  // test script in Grafana Cloud.
  //
  // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
  // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
  //
  // ext: {
  //   loadimpact: {
  //     // The ID of the project to which the test is assigned in the k6 Cloud UI.
  //     // By default tests are executed in default project.
  //     projectID: "",
  //     // The name of the test in the k6 Cloud UI.
  //     // Test runs with the same name will be grouped.
  //     name: "script.js"
  //   }
  // },

  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};