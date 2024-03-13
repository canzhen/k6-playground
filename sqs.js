import exec from 'k6/execution'

import { AWSConfig, SQSClient } from 'https://jslib.k6.io/aws/0.11.0/sqs.js'

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const sqs = new SQSClient(awsConfig);
const queueName = 'sbx-k6-test';
const testQueue = 'https://sqs.us-east-1.amazonaws.com/749143309851/' + queueName;

const payload = {
    "id": "187903",
    "type": "REINDEX_VEHICLE",
    "indexVehicleDto": {
      "advanceNotice": {
        "custom": 86400,
        "home": 86400,
        "poi": 86400
      },
      "address": {
        "country": "US",
        "state": "CA",
        "city": "San Francisco"
      },
      "created": [
        2016,
        9,
        19,
        22,
        51,
        12
      ],
      "dailyMileage": {
        "value": 500,
        "unit": "MILES"
      },
      "engine": "COMBUSTION",
      "host": {
        "id": "1",
        "reviewCount": 813,
        "isAllStar": false,
        "businessHours": {
          "monday": [
            {
              "start": [
                0,
                30
              ],
              "end": [
                4,
                30
              ]
            },
            {
              "start": [
                8,
                0
              ],
              "end": [
                12,
                30
              ]
            }
          ],
          "tuesday": [
            {
              "start": [
                11,
                0
              ],
              "end": [
                14,
                30
              ]
            },
            {
              "start": [
                17,
                0
              ],
              "end": [
                17,
                30
              ]
            }
          ],
          "wednesday": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                30
              ]
            }
          ],
          "thursday": [
            {
              "start": [
                9,
                30
              ],
              "end": [
                17,
                0
              ]
            }
          ],
          "friday": [
            {
              "start": [
                10,
                0
              ],
              "end": [
                16,
                0
              ]
            }
          ],
          "saturday": [
            {
              "start": [
                1,
                30
              ],
              "end": [
                2,
                0
              ]
            }
          ],
          "sunday": [
            {
              "start": [
                21,
                0
              ],
              "end": [
                23,
                30
              ]
            }
          ],
          "mondayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "tuesdayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "wednesdayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "thursdayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "fridayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "saturdayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "sundayPoi": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "mondayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "tuesdayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "wednesdayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "thursdayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "fridayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "saturdayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ],
          "sundayCustom": [
            {
              "start": [
                0,
                0
              ],
              "end": [
                23,
                59,
                59,
                999999999
              ]
            }
          ]
        },
        "ignoreSchedulesOnRemoteUnlockedTrips": false,
        "remoteUnlockBusinessHours": null,
        "unavailabilities": []
      },
      "metrics": {
        "rating": 5,
        "reviewCount": 1,
        "tripCount": 5
      },
      "id": "187903",
      "image": "vehicle/images/J3tF7pkARPq7f-BY70JbvQ.jpg",
      "images": [
        "vehicle/images/J3tF7pkARPq7f-BY70JbvQ.jpg",
        "vehicle/images/jE7q9kY0TnO-S7zFChRXiA.jpg"
      ],
      "location": {
        "lat": 37.776525983262275,
        "lng": -122.4159148663101
      },
      "bookableLocations": [
        {
          "type": "point",
          "advanceNoticeHours": 24,
          "businessHours": {
            "monday": [
              {
                "start": [
                  0,
                  30
                ],
                "end": [
                  4,
                  30
                ]
              },
              {
                "start": [
                  8,
                  0
                ],
                "end": [
                  12,
                  30
                ]
              }
            ],
            "tuesday": [
              {
                "start": [
                  11,
                  0
                ],
                "end": [
                  14,
                  30
                ]
              },
              {
                "start": [
                  17,
                  0
                ],
                "end": [
                  17,
                  30
                ]
              }
            ],
            "wednesday": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  30
                ]
              }
            ],
            "thursday": [
              {
                "start": [
                  9,
                  30
                ],
                "end": [
                  17,
                  0
                ]
              }
            ],
            "friday": [
              {
                "start": [
                  10,
                  0
                ],
                "end": [
                  16,
                  0
                ]
              }
            ],
            "saturday": [
              {
                "start": [
                  1,
                  30
                ],
                "end": [
                  2,
                  0
                ]
              }
            ],
            "sunday": [
              {
                "start": [
                  21,
                  0
                ],
                "end": [
                  23,
                  30
                ]
              }
            ],
            "mondayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "tuesdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "wednesdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "thursdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "fridayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "saturdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "sundayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "mondayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "tuesdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "wednesdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "thursdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "fridayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "saturdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "sundayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ]
          },
          "fee": {
            "amount": 0,
            "currency": "USD"
          },
          "instantBook": true,
          "unavailabilities": [],
          "zoneId": "America/Los_Angeles",
          "point": {
            "lat": 37.776525983262275,
            "lng": -122.4159148663101
          }
        },
        {
          "type": "id",
          "advanceNoticeHours": 24,
          "businessHours": {
            "monday": [
              {
                "start": [
                  0,
                  30
                ],
                "end": [
                  4,
                  30
                ]
              },
              {
                "start": [
                  8,
                  0
                ],
                "end": [
                  12,
                  30
                ]
              }
            ],
            "tuesday": [
              {
                "start": [
                  11,
                  0
                ],
                "end": [
                  14,
                  30
                ]
              },
              {
                "start": [
                  17,
                  0
                ],
                "end": [
                  17,
                  30
                ]
              }
            ],
            "wednesday": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  30
                ]
              }
            ],
            "thursday": [
              {
                "start": [
                  9,
                  30
                ],
                "end": [
                  17,
                  0
                ]
              }
            ],
            "friday": [
              {
                "start": [
                  10,
                  0
                ],
                "end": [
                  16,
                  0
                ]
              }
            ],
            "saturday": [
              {
                "start": [
                  1,
                  30
                ],
                "end": [
                  2,
                  0
                ]
              }
            ],
            "sunday": [
              {
                "start": [
                  21,
                  0
                ],
                "end": [
                  23,
                  30
                ]
              }
            ],
            "mondayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "tuesdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "wednesdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "thursdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "fridayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "saturdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "sundayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "mondayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "tuesdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "wednesdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "thursdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "fridayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "saturdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "sundayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ]
          },
          "fee": {
            "amount": 0,
            "currency": "USD"
          },
          "instantBook": true,
          "unavailabilities": [],
          "zoneId": "America/Los_Angeles",
          "id": "33818"
        },
        {
          "type": "id",
          "advanceNoticeHours": 24,
          "businessHours": {
            "monday": [
              {
                "start": [
                  0,
                  30
                ],
                "end": [
                  4,
                  30
                ]
              },
              {
                "start": [
                  8,
                  0
                ],
                "end": [
                  12,
                  30
                ]
              }
            ],
            "tuesday": [
              {
                "start": [
                  11,
                  0
                ],
                "end": [
                  14,
                  30
                ]
              },
              {
                "start": [
                  17,
                  0
                ],
                "end": [
                  17,
                  30
                ]
              }
            ],
            "wednesday": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  30
                ]
              }
            ],
            "thursday": [
              {
                "start": [
                  9,
                  30
                ],
                "end": [
                  17,
                  0
                ]
              }
            ],
            "friday": [
              {
                "start": [
                  10,
                  0
                ],
                "end": [
                  16,
                  0
                ]
              }
            ],
            "saturday": [
              {
                "start": [
                  1,
                  30
                ],
                "end": [
                  2,
                  0
                ]
              }
            ],
            "sunday": [
              {
                "start": [
                  21,
                  0
                ],
                "end": [
                  23,
                  30
                ]
              }
            ],
            "mondayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "tuesdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "wednesdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "thursdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "fridayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "saturdayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "sundayPoi": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "mondayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "tuesdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "wednesdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "thursdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "fridayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "saturdayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ],
            "sundayCustom": [
              {
                "start": [
                  0,
                  0
                ],
                "end": [
                  23,
                  59,
                  59,
                  999999999
                ]
              }
            ]
          },
          "fee": {
            "amount": 0,
            "currency": "USD"
          },
          "instantBook": true,
          "unavailabilities": [],
          "zoneId": "America/Los_Angeles",
          "id": "40228"
        }
      ],
      "zoneId": "America/Los_Angeles",
      "make": "Jeep",
      "model": "Wrangler Unlimited",
      "pricing": {
        "boosts": {
          "sameDayFraction": 0.05
        },
        "dailyBase": {
          "amount": 91,
          "currency": "USD"
        },
        "dailyDeltas": {
          "2024-03-07": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-03-08": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-03-09": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-03-10": {
            "amount": 12,
            "currency": "USD"
          },
          "2024-03-11": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-03-12": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-03-13": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-03-14": {
            "amount": 4,
            "currency": "USD"
          },
          "2024-03-15": {
            "amount": 16,
            "currency": "USD"
          },
          "2024-03-16": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-03-17": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-03-18": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-03-19": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-03-20": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-03-21": {
            "amount": 1,
            "currency": "USD"
          },
          "2024-03-22": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-03-23": {
            "amount": 19,
            "currency": "USD"
          },
          "2024-03-24": {
            "amount": 14,
            "currency": "USD"
          },
          "2024-03-25": {
            "amount": -1,
            "currency": "USD"
          },
          "2024-03-26": {
            "amount": -2,
            "currency": "USD"
          },
          "2024-03-27": {
            "amount": 0,
            "currency": "USD"
          },
          "2024-03-28": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-03-29": {
            "amount": 25,
            "currency": "USD"
          },
          "2024-03-30": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-03-31": {
            "amount": 16,
            "currency": "USD"
          },
          "2024-04-01": {
            "amount": -1,
            "currency": "USD"
          },
          "2024-04-02": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-04-03": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-04-04": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-04-05": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-04-06": {
            "amount": 19,
            "currency": "USD"
          },
          "2024-04-07": {
            "amount": 19,
            "currency": "USD"
          },
          "2024-04-08": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-04-09": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-04-10": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-04-11": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-04-12": {
            "amount": 21,
            "currency": "USD"
          },
          "2024-04-13": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-04-14": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-04-15": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-04-16": {
            "amount": -2,
            "currency": "USD"
          },
          "2024-04-17": {
            "amount": 0,
            "currency": "USD"
          },
          "2024-04-18": {
            "amount": 6,
            "currency": "USD"
          },
          "2024-04-19": {
            "amount": 25,
            "currency": "USD"
          },
          "2024-04-20": {
            "amount": 34,
            "currency": "USD"
          },
          "2024-04-21": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-04-22": {
            "amount": -6,
            "currency": "USD"
          },
          "2024-04-23": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-04-24": {
            "amount": -7,
            "currency": "USD"
          },
          "2024-04-25": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-04-26": {
            "amount": 13,
            "currency": "USD"
          },
          "2024-04-27": {
            "amount": 27,
            "currency": "USD"
          },
          "2024-04-28": {
            "amount": 16,
            "currency": "USD"
          },
          "2024-04-29": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-04-30": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-05-01": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-05-02": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-05-03": {
            "amount": 19,
            "currency": "USD"
          },
          "2024-05-04": {
            "amount": 33,
            "currency": "USD"
          },
          "2024-05-05": {
            "amount": 19,
            "currency": "USD"
          },
          "2024-05-06": {
            "amount": -2,
            "currency": "USD"
          },
          "2024-05-07": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-05-08": {
            "amount": -1,
            "currency": "USD"
          },
          "2024-05-09": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-05-10": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-05-11": {
            "amount": 36,
            "currency": "USD"
          },
          "2024-05-12": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-05-13": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-05-14": {
            "amount": 1,
            "currency": "USD"
          },
          "2024-05-15": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-05-16": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-05-17": {
            "amount": 39,
            "currency": "USD"
          },
          "2024-05-18": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-05-19": {
            "amount": 55,
            "currency": "USD"
          },
          "2024-05-20": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-05-21": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-05-22": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-05-23": {
            "amount": 7,
            "currency": "USD"
          },
          "2024-05-24": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-05-25": {
            "amount": 37,
            "currency": "USD"
          },
          "2024-05-26": {
            "amount": 26,
            "currency": "USD"
          },
          "2024-05-27": {
            "amount": 6,
            "currency": "USD"
          },
          "2024-05-28": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-05-29": {
            "amount": 7,
            "currency": "USD"
          },
          "2024-05-30": {
            "amount": 13,
            "currency": "USD"
          },
          "2024-05-31": {
            "amount": 31,
            "currency": "USD"
          },
          "2024-06-01": {
            "amount": 45,
            "currency": "USD"
          },
          "2024-06-02": {
            "amount": 33,
            "currency": "USD"
          },
          "2024-06-03": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-06-04": {
            "amount": 10,
            "currency": "USD"
          },
          "2024-06-05": {
            "amount": 14,
            "currency": "USD"
          },
          "2024-06-06": {
            "amount": 21,
            "currency": "USD"
          },
          "2024-06-07": {
            "amount": 46,
            "currency": "USD"
          },
          "2024-06-08": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-06-09": {
            "amount": 47,
            "currency": "USD"
          },
          "2024-06-10": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-06-11": {
            "amount": 13,
            "currency": "USD"
          },
          "2024-06-12": {
            "amount": 14,
            "currency": "USD"
          },
          "2024-06-13": {
            "amount": 18,
            "currency": "USD"
          },
          "2024-06-14": {
            "amount": 38,
            "currency": "USD"
          },
          "2024-06-15": {
            "amount": 55,
            "currency": "USD"
          },
          "2024-06-16": {
            "amount": 39,
            "currency": "USD"
          },
          "2024-06-17": {
            "amount": 13,
            "currency": "USD"
          },
          "2024-06-18": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-06-19": {
            "amount": 12,
            "currency": "USD"
          },
          "2024-06-20": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-06-21": {
            "amount": 36,
            "currency": "USD"
          },
          "2024-06-22": {
            "amount": 49,
            "currency": "USD"
          },
          "2024-06-23": {
            "amount": 32,
            "currency": "USD"
          },
          "2024-06-24": {
            "amount": 16,
            "currency": "USD"
          },
          "2024-06-25": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-06-26": {
            "amount": 38,
            "currency": "USD"
          },
          "2024-06-27": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-06-28": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-06-29": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-06-30": {
            "amount": 50,
            "currency": "USD"
          },
          "2024-07-01": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-07-02": {
            "amount": 14,
            "currency": "USD"
          },
          "2024-07-03": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-07-04": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-07-05": {
            "amount": 46,
            "currency": "USD"
          },
          "2024-07-06": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-07-07": {
            "amount": 46,
            "currency": "USD"
          },
          "2024-07-08": {
            "amount": 21,
            "currency": "USD"
          },
          "2024-07-09": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-07-10": {
            "amount": 21,
            "currency": "USD"
          },
          "2024-07-11": {
            "amount": 28,
            "currency": "USD"
          },
          "2024-07-12": {
            "amount": 52,
            "currency": "USD"
          },
          "2024-07-13": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-07-14": {
            "amount": 53,
            "currency": "USD"
          },
          "2024-07-15": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-07-16": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-07-17": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-07-18": {
            "amount": 28,
            "currency": "USD"
          },
          "2024-07-19": {
            "amount": 49,
            "currency": "USD"
          },
          "2024-07-20": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-07-21": {
            "amount": 50,
            "currency": "USD"
          },
          "2024-07-22": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-07-23": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-07-24": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-07-25": {
            "amount": 25,
            "currency": "USD"
          },
          "2024-07-26": {
            "amount": 49,
            "currency": "USD"
          },
          "2024-07-27": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-07-28": {
            "amount": 51,
            "currency": "USD"
          },
          "2024-07-29": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-07-30": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-07-31": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-08-01": {
            "amount": 29,
            "currency": "USD"
          },
          "2024-08-02": {
            "amount": 50,
            "currency": "USD"
          },
          "2024-08-03": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-08-04": {
            "amount": 48,
            "currency": "USD"
          },
          "2024-08-05": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-08-06": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-08-07": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-08-08": {
            "amount": 30,
            "currency": "USD"
          },
          "2024-08-09": {
            "amount": 55,
            "currency": "USD"
          },
          "2024-08-10": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-08-11": {
            "amount": 51,
            "currency": "USD"
          },
          "2024-08-12": {
            "amount": 20,
            "currency": "USD"
          },
          "2024-08-13": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-08-14": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-08-15": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-08-16": {
            "amount": 42,
            "currency": "USD"
          },
          "2024-08-17": {
            "amount": 57,
            "currency": "USD"
          },
          "2024-08-18": {
            "amount": 40,
            "currency": "USD"
          },
          "2024-08-19": {
            "amount": 13,
            "currency": "USD"
          },
          "2024-08-20": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-08-21": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-08-22": {
            "amount": 18,
            "currency": "USD"
          },
          "2024-08-23": {
            "amount": 47,
            "currency": "USD"
          },
          "2024-08-24": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-08-25": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-08-26": {
            "amount": 25,
            "currency": "USD"
          },
          "2024-08-27": {
            "amount": 6,
            "currency": "USD"
          },
          "2024-08-28": {
            "amount": 4,
            "currency": "USD"
          },
          "2024-08-29": {
            "amount": 7,
            "currency": "USD"
          },
          "2024-08-30": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-08-31": {
            "amount": 34,
            "currency": "USD"
          },
          "2024-09-01": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-09-02": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-09-03": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-09-04": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-09-05": {
            "amount": 10,
            "currency": "USD"
          },
          "2024-09-06": {
            "amount": 28,
            "currency": "USD"
          },
          "2024-09-07": {
            "amount": 40,
            "currency": "USD"
          },
          "2024-09-08": {
            "amount": 27,
            "currency": "USD"
          },
          "2024-09-09": {
            "amount": 4,
            "currency": "USD"
          },
          "2024-09-10": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-09-11": {
            "amount": 4,
            "currency": "USD"
          },
          "2024-09-12": {
            "amount": 10,
            "currency": "USD"
          },
          "2024-09-13": {
            "amount": 29,
            "currency": "USD"
          },
          "2024-09-14": {
            "amount": 41,
            "currency": "USD"
          },
          "2024-09-15": {
            "amount": 28,
            "currency": "USD"
          },
          "2024-09-16": {
            "amount": 4,
            "currency": "USD"
          },
          "2024-09-17": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-09-18": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-09-19": {
            "amount": 7,
            "currency": "USD"
          },
          "2024-09-20": {
            "amount": 26,
            "currency": "USD"
          },
          "2024-09-21": {
            "amount": 37,
            "currency": "USD"
          },
          "2024-09-22": {
            "amount": 22,
            "currency": "USD"
          },
          "2024-09-23": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-09-24": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-09-25": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-09-26": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-09-27": {
            "amount": 18,
            "currency": "USD"
          },
          "2024-09-28": {
            "amount": 29,
            "currency": "USD"
          },
          "2024-09-29": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-09-30": {
            "amount": -2,
            "currency": "USD"
          },
          "2024-10-01": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-10-02": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-10-03": {
            "amount": 5,
            "currency": "USD"
          },
          "2024-10-04": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-10-05": {
            "amount": 35,
            "currency": "USD"
          },
          "2024-10-06": {
            "amount": 24,
            "currency": "USD"
          },
          "2024-10-07": {
            "amount": 1,
            "currency": "USD"
          },
          "2024-10-08": {
            "amount": -2,
            "currency": "USD"
          },
          "2024-10-09": {
            "amount": -2,
            "currency": "USD"
          },
          "2024-10-10": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-10-11": {
            "amount": 19,
            "currency": "USD"
          },
          "2024-10-12": {
            "amount": 33,
            "currency": "USD"
          },
          "2024-10-13": {
            "amount": 18,
            "currency": "USD"
          },
          "2024-10-14": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-10-15": {
            "amount": -6,
            "currency": "USD"
          },
          "2024-10-16": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-10-17": {
            "amount": 0,
            "currency": "USD"
          },
          "2024-10-18": {
            "amount": 16,
            "currency": "USD"
          },
          "2024-10-19": {
            "amount": 27,
            "currency": "USD"
          },
          "2024-10-20": {
            "amount": 14,
            "currency": "USD"
          },
          "2024-10-21": {
            "amount": -7,
            "currency": "USD"
          },
          "2024-10-22": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-10-23": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-10-24": {
            "amount": -6,
            "currency": "USD"
          },
          "2024-10-25": {
            "amount": 9,
            "currency": "USD"
          },
          "2024-10-26": {
            "amount": 16,
            "currency": "USD"
          },
          "2024-10-27": {
            "amount": 8,
            "currency": "USD"
          },
          "2024-10-28": {
            "amount": -9,
            "currency": "USD"
          },
          "2024-10-29": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-10-30": {
            "amount": -9,
            "currency": "USD"
          },
          "2024-10-31": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-11-01": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-11-02": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-11-03": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-11-04": {
            "amount": -4,
            "currency": "USD"
          },
          "2024-11-05": {
            "amount": -8,
            "currency": "USD"
          },
          "2024-11-06": {
            "amount": -8,
            "currency": "USD"
          },
          "2024-11-07": {
            "amount": -3,
            "currency": "USD"
          },
          "2024-11-08": {
            "amount": 9,
            "currency": "USD"
          },
          "2024-11-09": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-11-10": {
            "amount": 8,
            "currency": "USD"
          },
          "2024-11-11": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-11-12": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-11-13": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-11-14": {
            "amount": -5,
            "currency": "USD"
          },
          "2024-11-15": {
            "amount": 9,
            "currency": "USD"
          },
          "2024-11-16": {
            "amount": 21,
            "currency": "USD"
          },
          "2024-11-17": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-11-18": {
            "amount": 0,
            "currency": "USD"
          },
          "2024-11-19": {
            "amount": 3,
            "currency": "USD"
          },
          "2024-11-20": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-11-21": {
            "amount": 36,
            "currency": "USD"
          },
          "2024-11-22": {
            "amount": 45,
            "currency": "USD"
          },
          "2024-11-23": {
            "amount": 34,
            "currency": "USD"
          },
          "2024-11-24": {
            "amount": 13,
            "currency": "USD"
          },
          "2024-11-25": {
            "amount": -10,
            "currency": "USD"
          },
          "2024-11-26": {
            "amount": -13,
            "currency": "USD"
          },
          "2024-11-27": {
            "amount": -13,
            "currency": "USD"
          },
          "2024-11-28": {
            "amount": -8,
            "currency": "USD"
          },
          "2024-11-29": {
            "amount": 4,
            "currency": "USD"
          },
          "2024-11-30": {
            "amount": 10,
            "currency": "USD"
          },
          "2024-12-01": {
            "amount": 2,
            "currency": "USD"
          },
          "2024-12-02": {
            "amount": -12,
            "currency": "USD"
          },
          "2024-12-03": {
            "amount": -12,
            "currency": "USD"
          },
          "2024-12-04": {
            "amount": -12,
            "currency": "USD"
          },
          "2024-12-05": {
            "amount": -6,
            "currency": "USD"
          },
          "2024-12-06": {
            "amount": 8,
            "currency": "USD"
          },
          "2024-12-07": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-12-08": {
            "amount": 11,
            "currency": "USD"
          },
          "2024-12-09": {
            "amount": -7,
            "currency": "USD"
          },
          "2024-12-10": {
            "amount": -8,
            "currency": "USD"
          },
          "2024-12-11": {
            "amount": -6,
            "currency": "USD"
          },
          "2024-12-12": {
            "amount": -1,
            "currency": "USD"
          },
          "2024-12-13": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-12-14": {
            "amount": 33,
            "currency": "USD"
          },
          "2024-12-15": {
            "amount": 35,
            "currency": "USD"
          },
          "2024-12-16": {
            "amount": 28,
            "currency": "USD"
          },
          "2024-12-17": {
            "amount": 39,
            "currency": "USD"
          },
          "2024-12-18": {
            "amount": 47,
            "currency": "USD"
          },
          "2024-12-19": {
            "amount": 51,
            "currency": "USD"
          },
          "2024-12-20": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-12-21": {
            "amount": 59,
            "currency": "USD"
          },
          "2024-12-22": {
            "amount": 57,
            "currency": "USD"
          },
          "2024-12-23": {
            "amount": 35,
            "currency": "USD"
          },
          "2024-12-24": {
            "amount": 27,
            "currency": "USD"
          },
          "2024-12-25": {
            "amount": 23,
            "currency": "USD"
          },
          "2024-12-26": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-12-27": {
            "amount": 17,
            "currency": "USD"
          },
          "2024-12-28": {
            "amount": 15,
            "currency": "USD"
          },
          "2024-12-29": {
            "amount": 6,
            "currency": "USD"
          },
          "2024-12-30": {
            "amount": -8,
            "currency": "USD"
          },
          "2024-12-31": {
            "amount": -9,
            "currency": "USD"
          },
          "2025-01-01": {
            "amount": 9,
            "currency": "USD"
          },
          "2025-01-02": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-01-03": {
            "amount": 21,
            "currency": "USD"
          },
          "2025-01-04": {
            "amount": 32,
            "currency": "USD"
          },
          "2025-01-05": {
            "amount": 16,
            "currency": "USD"
          },
          "2025-01-06": {
            "amount": -4,
            "currency": "USD"
          },
          "2025-01-07": {
            "amount": -6,
            "currency": "USD"
          },
          "2025-01-08": {
            "amount": -5,
            "currency": "USD"
          },
          "2025-01-09": {
            "amount": 0,
            "currency": "USD"
          },
          "2025-01-10": {
            "amount": 22,
            "currency": "USD"
          },
          "2025-01-11": {
            "amount": 45,
            "currency": "USD"
          },
          "2025-01-12": {
            "amount": 36,
            "currency": "USD"
          },
          "2025-01-13": {
            "amount": 10,
            "currency": "USD"
          },
          "2025-01-14": {
            "amount": -4,
            "currency": "USD"
          },
          "2025-01-15": {
            "amount": -5,
            "currency": "USD"
          },
          "2025-01-16": {
            "amount": 0,
            "currency": "USD"
          },
          "2025-01-17": {
            "amount": 16,
            "currency": "USD"
          },
          "2025-01-18": {
            "amount": 31,
            "currency": "USD"
          },
          "2025-01-19": {
            "amount": 17,
            "currency": "USD"
          },
          "2025-01-20": {
            "amount": -6,
            "currency": "USD"
          },
          "2025-01-21": {
            "amount": -7,
            "currency": "USD"
          },
          "2025-01-22": {
            "amount": -7,
            "currency": "USD"
          },
          "2025-01-23": {
            "amount": -5,
            "currency": "USD"
          },
          "2025-01-24": {
            "amount": 14,
            "currency": "USD"
          },
          "2025-01-25": {
            "amount": 26,
            "currency": "USD"
          },
          "2025-01-26": {
            "amount": 18,
            "currency": "USD"
          },
          "2025-01-27": {
            "amount": -1,
            "currency": "USD"
          },
          "2025-01-28": {
            "amount": -3,
            "currency": "USD"
          },
          "2025-01-29": {
            "amount": -2,
            "currency": "USD"
          },
          "2025-01-30": {
            "amount": 3,
            "currency": "USD"
          },
          "2025-01-31": {
            "amount": 23,
            "currency": "USD"
          },
          "2025-02-01": {
            "amount": 37,
            "currency": "USD"
          },
          "2025-02-02": {
            "amount": 25,
            "currency": "USD"
          },
          "2025-02-03": {
            "amount": -2,
            "currency": "USD"
          },
          "2025-02-04": {
            "amount": -4,
            "currency": "USD"
          },
          "2025-02-05": {
            "amount": -2,
            "currency": "USD"
          },
          "2025-02-06": {
            "amount": 8,
            "currency": "USD"
          },
          "2025-02-07": {
            "amount": 36,
            "currency": "USD"
          },
          "2025-02-08": {
            "amount": 59,
            "currency": "USD"
          },
          "2025-02-09": {
            "amount": 57,
            "currency": "USD"
          },
          "2025-02-10": {
            "amount": 23,
            "currency": "USD"
          },
          "2025-02-11": {
            "amount": 4,
            "currency": "USD"
          },
          "2025-02-12": {
            "amount": 2,
            "currency": "USD"
          },
          "2025-02-13": {
            "amount": 8,
            "currency": "USD"
          },
          "2025-02-14": {
            "amount": 29,
            "currency": "USD"
          },
          "2025-02-15": {
            "amount": 42,
            "currency": "USD"
          },
          "2025-02-16": {
            "amount": 25,
            "currency": "USD"
          },
          "2025-02-17": {
            "amount": -2,
            "currency": "USD"
          },
          "2025-02-18": {
            "amount": -5,
            "currency": "USD"
          },
          "2025-02-19": {
            "amount": -5,
            "currency": "USD"
          },
          "2025-02-20": {
            "amount": -1,
            "currency": "USD"
          },
          "2025-02-21": {
            "amount": 24,
            "currency": "USD"
          },
          "2025-02-22": {
            "amount": 38,
            "currency": "USD"
          },
          "2025-02-23": {
            "amount": 26,
            "currency": "USD"
          },
          "2025-02-24": {
            "amount": 2,
            "currency": "USD"
          },
          "2025-02-25": {
            "amount": 0,
            "currency": "USD"
          },
          "2025-02-26": {
            "amount": 0,
            "currency": "USD"
          },
          "2025-02-27": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-02-28": {
            "amount": 29,
            "currency": "USD"
          },
          "2025-03-01": {
            "amount": 46,
            "currency": "USD"
          },
          "2025-03-02": {
            "amount": 33,
            "currency": "USD"
          },
          "2025-03-03": {
            "amount": 8,
            "currency": "USD"
          },
          "2025-03-04": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-03-05": {
            "amount": 8,
            "currency": "USD"
          },
          "2025-03-06": {
            "amount": 12,
            "currency": "USD"
          },
          "2025-03-07": {
            "amount": 36,
            "currency": "USD"
          },
          "2025-03-08": {
            "amount": 56,
            "currency": "USD"
          },
          "2025-03-09": {
            "amount": 36,
            "currency": "USD"
          },
          "2025-03-10": {
            "amount": 8,
            "currency": "USD"
          },
          "2025-03-11": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-03-12": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-03-13": {
            "amount": 11,
            "currency": "USD"
          },
          "2025-03-14": {
            "amount": 34,
            "currency": "USD"
          },
          "2025-03-15": {
            "amount": 52,
            "currency": "USD"
          },
          "2025-03-16": {
            "amount": 36,
            "currency": "USD"
          },
          "2025-03-17": {
            "amount": 7,
            "currency": "USD"
          },
          "2025-03-18": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-03-19": {
            "amount": 7,
            "currency": "USD"
          },
          "2025-03-20": {
            "amount": 12,
            "currency": "USD"
          },
          "2025-03-21": {
            "amount": 34,
            "currency": "USD"
          },
          "2025-03-22": {
            "amount": 50,
            "currency": "USD"
          },
          "2025-03-23": {
            "amount": 28,
            "currency": "USD"
          },
          "2025-03-24": {
            "amount": 4,
            "currency": "USD"
          },
          "2025-03-25": {
            "amount": 0,
            "currency": "USD"
          },
          "2025-03-26": {
            "amount": 1,
            "currency": "USD"
          },
          "2025-03-27": {
            "amount": 6,
            "currency": "USD"
          },
          "2025-03-28": {
            "amount": 24,
            "currency": "USD"
          },
          "2025-03-29": {
            "amount": 40,
            "currency": "USD"
          },
          "2025-03-30": {
            "amount": 26,
            "currency": "USD"
          },
          "2025-03-31": {
            "amount": 1,
            "currency": "USD"
          },
          "2025-04-01": {
            "amount": 0,
            "currency": "USD"
          },
          "2025-04-02": {
            "amount": 3,
            "currency": "USD"
          },
          "2025-04-03": {
            "amount": 10,
            "currency": "USD"
          },
          "2025-04-04": {
            "amount": 35,
            "currency": "USD"
          },
          "2025-04-05": {
            "amount": 56,
            "currency": "USD"
          },
          "2025-04-06": {
            "amount": 39,
            "currency": "USD"
          },
          "2025-04-07": {
            "amount": 12,
            "currency": "USD"
          },
          "2025-04-08": {
            "amount": 10,
            "currency": "USD"
          },
          "2025-04-09": {
            "amount": 15,
            "currency": "USD"
          },
          "2025-04-10": {
            "amount": 22,
            "currency": "USD"
          }
        },
        "discounts": {
          "threeDayFraction": 0.12,
          "sevenDayFraction": 0.12,
          "sevenDayEarlyBirdFraction": 0.05,
          "twoWeekFraction": 0.12,
          "threeWeekFraction": 0,
          "thirtyDayFraction": 0.15,
          "twoMonthFraction": 0.15,
          "threeMonthFraction": 0
        }
      },
      "tmv": {
        "amount": 45580,
        "currency": "USD"
      },
      "isRemoteUnlock": false,
      "seats": 5,
      "tmvTier": "DELUXE",
      "transmission": "AUTOMATIC",
      "tripDuration": {
        "min": 172800,
        "max": 7776000,
        "minWeekend": null,
        "minForPoi": 172800,
        "maxForPoi": null,
        "minForCustom": 259200,
        "maxForCustom": 7776000
      },
      "type": "SUV",
      "year": 2021,
      "minimumAgeToRent": 25,
      "bookings": [],
      "categories": [
        "PREMIUM"
      ],
      "features": [
        "GPS",
        "AUX_INPUT"
      ],
      "instantBookLocationType": [
        "HOME",
        "POI"
      ],
      "promotions": [],
      "unavailabilities": [
        {
          "start": [
            2024,
            3,
            6,
            9,
            0
          ],
          "end": [
            2024,
            3,
            7,
            17,
            0
          ]
        },
        {
          "start": [
            2024,
            3,
            13,
            9,
            0
          ],
          "end": [
            2024,
            3,
            14,
            17,
            0
          ]
        },
        {
          "start": [
            2024,
            3,
            20,
            9,
            0
          ],
          "end": [
            2024,
            3,
            21,
            17,
            0
          ]
        },
        {
          "start": [
            2024,
            3,
            27,
            9,
            0
          ],
          "end": [
            2024,
            3,
            28,
            17,
            0
          ]
        }
      ],
      "delivery": {
        "minimumDurationFreeDelivery": null,
        "custom": null,
        "poi": [
          {
            "id": "33818",
            "type": "AIRPORT",
            "fee": {
              "amount": 0,
              "currency": "USD"
            }
          },
          {
            "id": "40228",
            "type": "LODGING",
            "fee": {
              "amount": 0,
              "currency": "USD"
            }
          }
        ]
      },
      "searchV10FourAttributes": {
        "vehicleId": "187903",
        "fulfillmentRate": 0.7468355,
        "hostLoginCount": 250,
        "instantBook": true,
        "numImages": 2,
        "cancellationRate": 0.22025317,
        "declinedExpiredRate": 0.032911394,
        "avgHostRating": 4.5525,
        "avgResponseTime": 27,
        "numRequests": 395,
        "referencePriceVTwoFourOne": 104.45,
        "tmv": 45580,
        "categoryAggregateId": 5,
        "vehicleDescriptionLength": 0
      },
      "prerankAttributesDto": {
        "vehicleId": "187903",
        "fulfillmentRate": 0.7468355,
        "hostLoginCount": 250,
        "instantBook": true,
        "numImages": 2,
        "cancellationRate": 0.22025317,
        "avgHostRating": 4.5525,
        "numRequests": 395,
        "referencePrice": 104.45
      }
    }
};

export default async function () {
    console.log('sending message to queue ' + testQueue);
    // If our test queue does not exist, abort the execution.
    const queuesResponse = await sqs.listQueues({'queueNamePrefix': queueName});
    if (queuesResponse.urls.filter((q) => q === testQueue).length == 0) {
        console.log('queue ' + testQueue +  ' does not exist, aborting test...')
        exec.test.abort()
        return;
    }

    // Send message to test queue
    let res;
    try {
        await sqs.sendMessage(testQueue, JSON.stringify(payload));
    } catch (e) {
        console.log('failed to send message to queue');
        console.error(e);
        return;
    }
    console.log('message sent to queue, response: ' + res);
}


export const options = {
    // A number specifying the number of VUs to run concurrently.
    vus: 1,
    // A string specifying the total duration of the test run.
    // duration: '3s',
  };