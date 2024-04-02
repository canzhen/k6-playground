import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { randomRecentDate } from "../utils.js";
import exec from "k6/execution";
import {
  getRandomCountryStateCityAndLocation,
  randomId,
  randomEngine,
  randomBoolean,
  randodmVehicleType,
  randomTVMTier,
  randomTransmission,
  randomCategory,
  randomMakeAndModel,
  randomFeatures,
} from "../common.js";

// com/turo/index/dto/IndexVehicleWrapperDto.kt
const INDEXING_TYPES = [
  "REINDEX_VEHICLE",
  "REMOVE_VEHICLE",
  "UPSERT_SEARCHER_ATTRIBUTES",
];

function getIndexingPayloadByType(indexingType) {
  const [
    country,
    state,
    city,
    lng,
    lat,
  ] = getRandomCountryStateCityAndLocation();
  const [make, model] = randomMakeAndModel();
  const randomCreatedDate = randomRecentDate();
  const businessHours = randomBusinessHours();
  const isRemoteUnlockEnabled = randomBoolean();
  const vehicleId = randomId();
  const airportId = randomId();
  const lodgingId = randomId();
  switch (indexingType) {
    case "REINDEX_VEHICLE":
      return {
        id: randomId(),
        type: indexingType,
        indexVehicleDto: {
          make: make,
          model: model,
          zoneId: "America/Los_Angeles", // for now, we're only testing United States
          advanceNotice: {
            custom: randomIntBetween(100000, 999999),
            home: randomIntBetween(100000, 999999),
            poi: randomIntBetween(100000, 999999),
          },
          address: {
            country: country,
            state: state,
            city: city,
          },
          location: {
            lng: lng,
            lat: lat,
          },
          created: [
            randomCreatedDate.getFullYear(),
            randomCreatedDate.getMonth(),
            randomCreatedDate.getUTCDate(),
            randomCreatedDate.getHours(),
            randomCreatedDate.getMinutes(),
            randomCreatedDate.getSeconds(),
          ],
          dailyMileage: {
            value: randomIntBetween(100, 900),
            unit: "MILES", // for now, we're only testing United States
          },
          engine: randomEngine(),
          host: {
            id: randomId(),
            reviewCount: randomIntBetween(1, 900),
            isAllStar: randomBoolean(),
            businessHours: businessHours,
            ignoreSchedulesOnRemoteUnlockedTrips: randomBoolean(),
            // the hours a host can unlock a vehicle remotely.
            // not all vehicles can be remotely unlocked.
            remoteUnlockBusinessHours: isRemoteUnlockEnabled
              ? businessHours
              : null,
            unavailabilities: randomBoolean()
              ? [
                  {
                    start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
                    end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
                  },
                ]
              : [],
          },
          metrics: {
            rating: randomIntBetween(1, 5),
            reviewCount: randomIntBetween(1, 1000),
            tripCount: randomIntBetween(1, 1000),
          },
          // we don't care about image urls, it will be returned from the search result
          // and won't impact the performance of the search or indexing
          image: "vehicle/images/J3tF7pkARPq7f-BY70JbvQ.jpg",
          images: [
            "vehicle/images/J3tF7pkARPq7f-BY70JbvQ.jpg",
            "vehicle/images/jE7q9kY0TnO-S7zFChRXiA.jpg",
          ],
          bookableLocations: randomBookableLocations(
            businessHours,
            airportId,
            lodgingId
          ),
          pricing: randomPricing(),
          tmv: {
            amount: randomIntBetween(20000, 40000),
            currency: "USD", // for now, we're only testing United States
          },
          isRemoteUnlock: isRemoteUnlockEnabled,
          seats: 5,
          tmvTier: randomTVMTier(),
          transmission: randomTransmission(),
          tripDuration: {
            min: randomIntBetween(1, 10) * 60 * 60 * 24,
            max: randomIntBetween(60, 120) * 60 * 60 * 24,
            minWeekend: null,
            minForPoi: (1 * 60) & (60 * 24),
            maxForPoi: null,
            minForCustom: (1 * 60) & (60 * 24),
            maxForCustom: (120 * 60) & (60 * 24),
          },
          type: randodmVehicleType(),
          year: randomIntBetween(2015, 2024),
          minimumAgeToRent: 25,
          bookings: [],
          categories: randomCategory(),
          features: randomFeatures(),
          instantBookLocationType: ["HOME", "POI"],
          promotions: [],
          unavailabilities: [],
          delivery: {
            minimumDurationFreeDelivery: null,
            custom: null,
            poi: [
              {
                id: airportId,
                type: "AIRPORT",
                fee: {
                  amount: 0,
                  currency: "USD",
                },
              },
              {
                id: lodgingId,
                type: "LODGING",
                fee: {
                  amount: 0,
                  currency: "USD",
                },
              },
            ],
          },
          searchV10FourAttributes: {
            vehicleId: vehicleId,
            fulfillmentRate: 0.7468355,
            hostLoginCount: 250,
            instantBook: true,
            numImages: 2,
            cancellationRate: 0.22025317,
            declinedExpiredRate: 0.032911394,
            avgHostRating: 4.5525,
            avgResponseTime: 27,
            numRequests: 395,
            referencePriceVTwoFourOne: 104.45,
            tmv: 45580,
            categoryAggregateId: 5,
            vehicleDescriptionLength: 0,
          },
          prerankAttributesDto: {
            vehicleId: vehicleId,
            fulfillmentRate: 0.7468355,
            hostLoginCount: 250,
            instantBook: true,
            numImages: 2,
            cancellationRate: 0.22025317,
            avgHostRating: 4.5525,
            numRequests: 395,
            referencePrice: 104.45,
          },
        },
      };
    default:
      exec.test.abort("invalid indexing type: " + indexingType);
  }
}

// vehicle-search-common/src/main/kotlin/com/turo/index/dto/BusinessHoursDto.kt
function randomBusinessHours() {
  return {
    monday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    tuesday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    wednesday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    thursday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    friday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    saturday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    sunday: [
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
      {
        start: [randomIntBetween(0, 12), randomIntBetween(0, 59)],
        end: [randomIntBetween(12, 24), randomIntBetween(0, 59)],
      },
    ],
    mondayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    tuesdayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    wednesdayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    thursdayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    fridayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    saturdayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    sundayPoi: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    mondayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    tuesdayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    wednesdayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    thursdayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    fridayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    saturdayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
    sundayCustom: [
      {
        start: [0, 0],
        end: [23, 59, 59, 999999999],
      },
    ],
  };
}

// list of 'Location'
// vehicle-search-common/src/main/kotlin/com/turo/elasticsearch/fragments/Location.kt
function randomBookableLocations(businessHours, airportId, lodgingId) {
  return [
    {
      type: "piont",
      advanceNoticeHours: 24 * randomIntBetween(1, 3),
      businessHours: businessHours,
      // the fee to the delivery
      fee: {
        amount: randomIntBetween(0, 100),
        currency: "USD", // for now we're only testing United States
      },
      instantBook: true,
      zoneId: "America/Los_Angeles", // for now we're only testing United States
      point: {
        lat: 37.776525983262275,
        lng: -122.4159148663101,
      },
    },
    {
      type: "id",
      id: airportId,
      advanceNoticeHours: 24 * randomIntBetween(1, 3),
      businessHours: businessHours,
      fee: {
        amount: 0,
        currency: "USD",
      },
      instantBook: true,
      unavailabilities: [],
      zoneId: "America/Los_Angeles",
    },
    {
      type: "id",
      id: lodgingId,
      advanceNoticeHours: 24 * randomIntBetween(1, 3),
      businessHours: businessHours,
      fee: {
        amount: 0,
        currency: "USD",
      },
      instantBook: true,
      unavailabilities: [],
      zoneId: "America/Los_Angeles",
    },
  ];
}

function randomPricing() {
  // for MVP, only doing location search, will consider more advanced searches later
  return {};
}

export const randomIndexingPayload = () => {
  // only testing indexing for now
  // 'UPSERT_SEARCHER_ATTRIBUTES' is for storing driver age and other user attributes
  return getIndexingPayloadByType("REINDEX_VEHICLE");
};
