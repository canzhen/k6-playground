import {
  randomItem,
  randomIntBetween,
} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const STATE_TO_CITIES = {
  AK: [
    { name: "Anchorage", longitude: -149.9003, latitude: 61.2181, count: 1438 },
    { name: "Fairbanks", longitude: -147.7164, latitude: 64.8378, count: 148 },
    { name: "Juneau", longitude: -134.4197, latitude: 58.3019, count: 132 },
    { name: "Wasilla", longitude: -149.4419, latitude: 61.5814, count: 103 },
    { name: "North Pole", longitude: -147.3487, latitude: 64.7511, count: 47 },
    { name: "Sitka", longitude: -135.33, latitude: 57.0531, count: 39 },
    { name: "Kodiak", longitude: -152.4072, latitude: 57.79, count: 34 },
    { name: "Seward", longitude: -149.4372, latitude: 60.1042, count: 25 },
    { name: "Ketchikan", longitude: -131.6461, latitude: 55.3422, count: 23 },
    { name: "Palmer", longitude: -149.1128, latitude: 61.5997, count: 21 },
    { name: "Soldotna", longitude: -151.0674, latitude: 60.4878, count: 18 },
    { name: "Kenai", longitude: -151.2583, latitude: 60.5544, count: 14 },
    { name: "Skagway", longitude: -135.3314, latitude: 59.4553, count: 12 },
    { name: "Homer", longitude: -151.5483, latitude: 59.6425, count: 8 },
  ],
  AL: [
    { name: "Birmingham", longitude: -86.8025, latitude: 33.5207, count: 94 },
    { name: "Huntsville", longitude: -86.5861, latitude: 34.7304, count: 86 },
    { name: "Mobile", longitude: -88.0431, latitude: 30.6954, count: 75 },
    { name: "Irondale", longitude: -86.7044, latitude: 33.5387, count: 57 },
    { name: "Montgomery", longitude: -86.299, latitude: 32.3668, count: 56 },
    { name: "Bessemer", longitude: -86.9544, latitude: 33.4018, count: 53 },
    { name: "Madison", longitude: -86.7483, latitude: 34.6993, count: 27 },
    { name: "Tuscaloosa", longitude: -87.5692, latitude: 33.2098, count: 16 },
    { name: "Fairhope", longitude: -87.9036, latitude: 30.523, count: 12 },
    { name: "Phenix City", longitude: -85.0008, latitude: 32.4709, count: 12 },
    { name: "Hoover", longitude: -86.8127, latitude: 33.3768, count: 10 },
    { name: "Gulf Shores", longitude: -87.7008, latitude: 30.246, count: 9 },
    { name: "Saraland", longitude: -88.0684, latitude: 30.8207, count: 9 },
    { name: "Bay Minette", longitude: -87.773, latitude: 30.8823, count: 8 },
    { name: "Foley", longitude: -87.6836, latitude: 30.4066, count: 8 },
  ],
  CA: [
    {
      name: "Los Angeles",
      longitude: -118.2437,
      latitude: 34.0522,
      count: 11855,
    },
    {
      name: "San Francisco",
      longitude: -122.4194,
      latitude: 37.7749,
      count: 6095,
    },
    { name: "San Diego", longitude: -117.1611, latitude: 32.7157, count: 2904 },
    { name: "Sacramento", longitude: -121.4944, latitude: 38.5816, count: 874 },
    { name: "San Jose", longitude: -121.8863, latitude: 37.3382, count: 830 },
    { name: "Fresno", longitude: -119.7726, latitude: 36.7372, count: 598 },
    { name: "Oakland", longitude: -122.2711, latitude: 37.8044, count: 507 },
    { name: "Long Beach", longitude: -118.1937, latitude: 33.7701, count: 417 },
    {
      name: "Santa Barbara",
      longitude: -119.6982,
      latitude: 34.4208,
      count: 286,
    },
    { name: "Santa Cruz", longitude: -122.0308, latitude: 36.9741, count: 213 },
    {
      name: "Palm Springs",
      longitude: -116.5453,
      latitude: 33.8303,
      count: 170,
    },
    { name: "Palo Alto", longitude: -122.143, latitude: 37.4419, count: 168 },
    { name: "Berkeley", longitude: -122.2727, latitude: 37.8715, count: 154 },
    {
      name: "Santa Monica",
      longitude: -118.4814,
      latitude: 34.0195,
      count: 143,
    },
    {
      name: "Newport Beach",
      longitude: -117.9289,
      latitude: 33.6189,
      count: 122,
    },
  ],
  CO: [
    { name: "Denver", longitude: -104.9903, latitude: 39.7392, count: 1423 },
    {
      name: "Colorado Springs",
      longitude: -104.8214,
      latitude: 38.8339,
      count: 296,
    },
    { name: "Aurora", longitude: -104.8319, latitude: 39.7294, count: 150 },
    { name: "Boulder", longitude: -105.2705, latitude: 40.015, count: 102 },
    {
      name: "Fort Collins",
      longitude: -105.0844,
      latitude: 40.5853,
      count: 71,
    },
    { name: "Pueblo", longitude: -104.6091, latitude: 38.2544, count: 53 },
    { name: "Aspen", longitude: -106.8371, latitude: 39.1911, count: 49 },
    { name: "Vail", longitude: -106.355, latitude: 39.6403, count: 31 },
    { name: "Durango", longitude: -107.8801, latitude: 37.2753, count: 24 },
    {
      name: "Grand Junction",
      longitude: -108.5507,
      latitude: 39.0639,
      count: 22,
    },
    {
      name: "Glenwood Springs",
      longitude: -107.3237,
      latitude: 39.5501,
      count: 18,
    },
    { name: "Telluride", longitude: -107.8111, latitude: 37.9375, count: 16 },
    {
      name: "Steamboat Springs",
      longitude: -106.8317,
      latitude: 40.4849,
      count: 14,
    },
    {
      name: "Beaver Creek",
      longitude: -106.5161,
      latitude: 39.6042,
      count: 12,
    },
    {
      name: "Snowmass Village",
      longitude: -106.9486,
      latitude: 39.1903,
      count: 12,
    },
  ],
  FL: [
    {
      name: "Miami",
      longitude: -80.1917902,
      latitude: 25.7616798,
      count: 1736,
    },
    {
      name: "Orlando",
      longitude: -81.3792365,
      latitude: 28.5383355,
      count: 918,
    },
    { name: "Tampa", longitude: -82.4571776, latitude: 27.950575, count: 860 },
    {
      name: "Jacksonville",
      longitude: -81.655651,
      latitude: 30.3321838,
      count: 551,
    },
    {
      name: "Fort Lauderdale",
      longitude: -80.1373174,
      latitude: 26.1224386,
      count: 381,
    },
    {
      name: "Key West",
      longitude: -81.7887022,
      latitude: 24.5552406,
      count: 276,
    },
    {
      name: "Pensacola",
      longitude: -87.2169149,
      latitude: 30.421309,
      count: 211,
    },
    {
      name: "Sarasota",
      longitude: -82.5306527,
      latitude: 27.3364347,
      count: 179,
    },
    {
      name: "Naples",
      longitude: -81.7948103,
      latitude: 26.1420358,
      count: 159,
    },
    {
      name: "Fort Myers",
      longitude: -81.8723084,
      latitude: 26.640628,
      count: 144,
    },
    {
      name: "St. Petersburg",
      longitude: -82.6792685,
      latitude: 27.7676008,
      count: 140,
    },
    {
      name: "Destin",
      longitude: -86.4957834,
      latitude: 30.3935337,
      count: 125,
    },
    {
      name: "Panama City Beach",
      longitude: -85.8271377,
      latitude: 30.1765918,
      count: 120,
    },
    {
      name: "Coral Gables",
      longitude: -80.2710465,
      latitude: 25.72149,
      count: 115,
    },
    {
      name: "West Palm Beach",
      longitude: -80.0533746,
      latitude: 26.7153424,
      count: 108,
    },
  ],
  GA: [
    { name: "Atlanta", longitude: -84.388, latitude: 33.749, count: 2125 },
    { name: "Savannah", longitude: -81.0998, latitude: 32.0835, count: 194 },
    { name: "Augusta", longitude: -81.9748, latitude: 33.4735, count: 110 },
    { name: "Alpharetta", longitude: -84.2941, latitude: 34.0754, count: 76 },
    { name: "Athens", longitude: -83.3741, latitude: 33.9519, count: 61 },
    { name: "Macon", longitude: -83.6324, latitude: 32.8407, count: 51 },
    { name: "Marietta", longitude: -84.5499, latitude: 33.9526, count: 46 },
    { name: "Roswell", longitude: -84.3606, latitude: 34.0232, count: 36 },
    { name: "Duluth", longitude: -84.1446, latitude: 34.0029, count: 35 },
    { name: "Columbus", longitude: -84.9877, latitude: 32.4609, count: 34 },
    { name: "Decatur", longitude: -84.2963, latitude: 33.7748, count: 32 },
    {
      name: "Sandy Springs",
      longitude: -84.3715,
      latitude: 33.9304,
      count: 29,
    },
    { name: "Kennesaw", longitude: -84.6015, latitude: 34.0234, count: 25 },
    {
      name: "Warner Robins",
      longitude: -83.6242,
      latitude: 32.6207,
      count: 20,
    },
    { name: "Suwanee", longitude: -84.0709, latitude: 34.0515, count: 19 },
  ],
  IL: [
    { name: "Chicago", longitude: -87.6298, latitude: 41.8781, count: 5463 },
    { name: "Springfield", longitude: -89.6501, latitude: 39.7817, count: 148 },
    { name: "Peoria", longitude: -89.5889, latitude: 40.6936, count: 78 },
    { name: "Rockford", longitude: -89.0939, latitude: 42.2711, count: 77 },
    { name: "Champaign", longitude: -88.2434, latitude: 40.1164, count: 68 },
    { name: "Naperville", longitude: -88.1535, latitude: 41.7508, count: 66 },
    { name: "Bloomington", longitude: -88.9937, latitude: 40.4842, count: 62 },
    { name: "Evanston", longitude: -87.6847, latitude: 42.0451, count: 50 },
    { name: "Aurora", longitude: -88.3201, latitude: 41.7606, count: 48 },
    { name: "Schaumburg", longitude: -88.0834, latitude: 42.0334, count: 46 },
    { name: "Joliet", longitude: -88.0817, latitude: 41.525, count: 45 },
    { name: "Elgin", longitude: -88.2826, latitude: 42.0354, count: 39 },
    { name: "Oak Park", longitude: -87.7845, latitude: 41.885, count: 38 },
    { name: "Gurnee", longitude: -87.9531, latitude: 42.3703, count: 31 },
    {
      name: "Downers Grove",
      longitude: -88.0112,
      latitude: 41.8089,
      count: 28,
    },
  ],
  LA: [
    { name: "New Orleans", longitude: -90.0715, latitude: 29.9511, count: 980 },
    { name: "Baton Rouge", longitude: -91.1403, latitude: 30.4583, count: 254 },
    { name: "Shreveport", longitude: -93.7502, latitude: 32.5252, count: 108 },
    { name: "Lafayette", longitude: -92.0198, latitude: 30.2241, count: 87 },
    { name: "Lake Charles", longitude: -93.2174, latitude: 30.2266, count: 53 },
    { name: "Metairie", longitude: -90.1528, latitude: 29.9841, count: 50 },
    { name: "Alexandria", longitude: -92.4451, latitude: 31.3113, count: 40 },
    { name: "Monroe", longitude: -92.1193, latitude: 32.5093, count: 28 },
    { name: "Kenner", longitude: -90.2417, latitude: 29.9941, count: 24 },
    { name: "Covington", longitude: -90.1121, latitude: 30.4755, count: 21 },
    { name: "Slidell", longitude: -89.9845, latitude: 30.2752, count: 19 },
    { name: "Houma", longitude: -90.7195, latitude: 29.5958, count: 18 },
    { name: "Mandeville", longitude: -90.0651, latitude: 30.3583, count: 14 },
    { name: "West Monroe", longitude: -92.147, latitude: 32.5185, count: 13 },
    { name: "Bossier City", longitude: -93.7321, latitude: 32.515, count: 12 },
  ],
  MD: [
    { name: "Baltimore", longitude: -76.6122, latitude: 39.2904, count: 754 },
    { name: "Annapolis", longitude: -76.4922, latitude: 38.9784, count: 33 },
    { name: "Bethesda", longitude: -77.0947, latitude: 38.9847, count: 26 },
    { name: "Columbia", longitude: -76.8595, latitude: 39.2037, count: 26 },
    { name: "Frederick", longitude: -77.4105, latitude: 39.4142, count: 23 },
    {
      name: "Silver Spring",
      longitude: -77.0261,
      latitude: 38.9907,
      count: 22,
    },
    { name: "Towson", longitude: -76.6075, latitude: 39.4011, count: 19 },
    { name: "Gaithersburg", longitude: -77.1964, latitude: 39.1435, count: 15 },
    { name: "Rockville", longitude: -77.1528, latitude: 39.0836, count: 15 },
    { name: "Hagerstown", longitude: -77.7209, latitude: 39.6418, count: 13 },
    { name: "Salisbury", longitude: -75.588, latitude: 38.3607, count: 13 },
    { name: "Laurel", longitude: -76.8483, latitude: 39.0993, count: 11 },
    { name: "Waldorf", longitude: -76.9353, latitude: 38.6261, count: 11 },
    { name: "Ellicott City", longitude: -76.845, latitude: 39.2673, count: 10 },
    { name: "Bel Air", longitude: -76.3483, latitude: 39.5359, count: 8 },
  ],
  NV: [
    { name: "Las Vegas", longitude: -115.1398, latitude: 36.1699, count: 2511 },
    { name: "Reno", longitude: -119.8138, latitude: 39.5296, count: 238 },
    { name: "Henderson", longitude: -115.0375, latitude: 36.0397, count: 163 },
    {
      name: "North Las Vegas",
      longitude: -115.1467,
      latitude: 36.1989,
      count: 96,
    },
    { name: "Sparks", longitude: -119.7527, latitude: 39.5349, count: 45 },
    { name: "Carson City", longitude: -119.7674, latitude: 39.1638, count: 40 },
    { name: "Elko", longitude: -115.5012, latitude: 40.8324, count: 18 },
    { name: "Boulder City", longitude: -114.886, latitude: 35.9786, count: 14 },
    { name: "Mesquite", longitude: -114.0672, latitude: 36.8055, count: 11 },
    { name: "Laughlin", longitude: -114.6323, latitude: 35.1678, count: 9 },
    { name: "Fernley", longitude: -119.2512, latitude: 39.6082, count: 8 },
    {
      name: "Incline Village",
      longitude: -119.9366,
      latitude: 39.2508,
      count: 7,
    },
    { name: "Gardnerville", longitude: -119.7472, latitude: 38.941, count: 6 },
    { name: "Fallon", longitude: -118.7774, latitude: 39.4735, count: 5 },
    { name: "Dayton", longitude: -119.5695, latitude: 39.2369, count: 5 },
  ],
  NY: [
    { name: "New York", longitude: -74.006, latitude: 40.7128, count: 15887 },
    { name: "Buffalo", longitude: -78.8784, latitude: 42.8864, count: 213 },
    { name: "Rochester", longitude: -77.6109, latitude: 43.1566, count: 154 },
    { name: "Syracuse", longitude: -76.1474, latitude: 43.0481, count: 95 },
    { name: "Albany", longitude: -73.7562, latitude: 42.6526, count: 61 },
    { name: "Yonkers", longitude: -73.8912, latitude: 40.9312, count: 57 },
    { name: "Schenectady", longitude: -73.9396, latitude: 42.8142, count: 25 },
    { name: "Ithaca", longitude: -76.5019, latitude: 42.443, count: 23 },
    { name: "White Plains", longitude: -73.7629, latitude: 41.0339, count: 20 },
    { name: "New Rochelle", longitude: -73.7824, latitude: 40.9115, count: 17 },
    { name: "Tarrytown", longitude: -73.8716, latitude: 41.0762, count: 16 },
    { name: "Poughkeepsie", longitude: -73.9352, latitude: 41.7004, count: 16 },
    { name: "Binghamton", longitude: -75.9179, latitude: 42.0987, count: 15 },
    { name: "Hempstead", longitude: -73.6187, latitude: 40.7062, count: 14 },
    { name: "Kingston", longitude: -73.9772, latitude: 41.927, count: 12 },
  ],
  TX: [
    { name: "Houston", longitude: -95.3698, latitude: 29.7604, count: 3783 },
    { name: "Austin", longitude: -97.7431, latitude: 30.2672, count: 1166 },
    { name: "Dallas", longitude: -96.7969, latitude: 32.7767, count: 1102 },
    { name: "San Antonio", longitude: -98.4936, latitude: 29.4241, count: 893 },
    { name: "Fort Worth", longitude: -97.33, latitude: 32.7555, count: 359 },
    { name: "El Paso", longitude: -106.485, latitude: 31.7619, count: 256 },
    { name: "Plano", longitude: -96.6989, latitude: 33.0198, count: 137 },
    { name: "Arlington", longitude: -97.1081, latitude: 32.7357, count: 128 },
    { name: "Irving", longitude: -96.9489, latitude: 32.814, count: 116 },
    {
      name: "Corpus Christi",
      longitude: -97.3964,
      latitude: 27.8006,
      count: 84,
    },
    { name: "Lubbock", longitude: -101.8552, latitude: 33.5779, count: 64 },
    { name: "Garland", longitude: -96.6389, latitude: 32.9126, count: 57 },
    { name: "McKinney", longitude: -96.6398, latitude: 33.1976, count: 50 },
    {
      name: "Grand Prairie",
      longitude: -97.0068,
      latitude: 32.7459,
      count: 49,
    },
    { name: "Amarillo", longitude: -101.8313, latitude: 35.2211, count: 48 },
  ],
  WA: [
    { name: "Seattle", longitude: -122.3321, latitude: 47.6062, count: 2589 },
    { name: "Spokane", longitude: -117.426, latitude: 47.6588, count: 220 },
    { name: "Tacoma", longitude: -122.4443, latitude: 47.2529, count: 177 },
    { name: "Vancouver", longitude: -122.6615, latitude: 45.6387, count: 116 },
    { name: "Bellevue", longitude: -122.2007, latitude: 47.6104, count: 94 },
    { name: "Olympia", longitude: -122.9007, latitude: 47.0379, count: 46 },
    { name: "Bellingham", longitude: -122.4781, latitude: 48.7519, count: 44 },
    { name: "Everett", longitude: -122.2021, latitude: 47.9789, count: 42 },
    { name: "Redmond", longitude: -122.1215, latitude: 47.6739, count: 41 },
    { name: "Renton", longitude: -122.2171, latitude: 47.4829, count: 38 },
    { name: "Kent", longitude: -122.2348, latitude: 47.3809, count: 34 },
    { name: "Kirkland", longitude: -122.2087, latitude: 47.6769, count: 32 },
    { name: "Yakima", longitude: -120.5059, latitude: 46.6021, count: 27 },
    { name: "Federal Way", longitude: -122.3167, latitude: 47.3223, count: 26 },
    {
      name: "Spokane Valley",
      longitude: -117.2394,
      latitude: 47.6733,
      count: 24,
    },
  ],
  DC: [
    { name: "Washington", longitude: -77.0369, latitude: 38.9072, count: 1618 },
  ],
  PA: [
    {
      name: "Philadelphia",
      longitude: -75.1652,
      latitude: 39.9526,
      count: 1936,
    },
    { name: "Pittsburgh", longitude: -79.9959, latitude: 40.4406, count: 357 },
    { name: "Allentown", longitude: -75.4979, latitude: 40.6023, count: 48 },
    { name: "Harrisburg", longitude: -76.8861, latitude: 40.2732, count: 36 },
    { name: "Erie", longitude: -80.0851, latitude: 42.1292, count: 32 },
    { name: "Reading", longitude: -75.9269, latitude: 40.3356, count: 32 },
    { name: "Lancaster", longitude: -76.3055, latitude: 40.0379, count: 30 },
    { name: "York", longitude: -76.7277, latitude: 39.9626, count: 26 },
    { name: "Bethlehem", longitude: -75.3705, latitude: 40.6259, count: 25 },
    { name: "Scranton", longitude: -75.6512, latitude: 41.408, count: 25 },
    { name: "Easton", longitude: -75.2219, latitude: 40.6884, count: 24 },
    { name: "Wilkes-Barre", longitude: -75.8813, latitude: 41.2454, count: 18 },
    { name: "Altoona", longitude: -78.3947, latitude: 40.5187, count: 15 },
    { name: "Johnstown", longitude: -78.9219, latitude: 40.3267, count: 14 },
    { name: "State College", longitude: -77.86, latitude: 40.7934, count: 11 },
  ],
};

export function getRandomCountryStateCityAndLocation() {
  const country = "US"; // for now, we're only testing United States
  let states = [];
  for (const [state, _] of Object.entries(STATE_TO_CITIES)) {
    states.push(state);
  }
  const state = randomItem(states);
  const cityDetails = randomItem(STATE_TO_CITIES[state]);
  return [
    country,
    state,
    cityDetails.name,
    cityDetails.longitude,
    cityDetails.latitude,
  ];
}

export function randomBoolean() {
  randomIntBetween(0, 1) == 1 ? true : false;
}

export const COUNTRY_TO_STATES = {
  US: [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ],
  FR: [
    "ARA",
    "BFC",
    "BRE",
    "CVL",
    "COR",
    "GES",
    "HDF",
    "IDF",
    "NOR",
    "NAQ",
    "OCC",
    "PDL",
    "PAC",
    "GUF",
    "GLP",
    "MTQ",
    "MYT",
    "REU",
  ],
  CA: [
    "AB",
    "BC",
    "MB",
    "NB",
    "NL",
    "NS",
    "NT",
    "NU",
    "ON",
    "PE",
    "QC",
    "SK",
    "YT",
  ],
  GB: ["ENG", "SCT", "WLS"],
};

// com/turo/search/dto/v2/LocationFilterDto.kt
const SEARCH_LOCATION_TYPES = [
  "area",
  "boundingbox",
  "country",
  "poi",
  "point",
];
const INDEXING_LOCATION_TYPES = ["area", "point", "id"];
// com/turo/common/enums/Country.kt
const COUNTRIES = ["US", "FR", "CA", "GB"];
const CURRENCIES = ["USD", "EUR", "JPY", "GBP", "CHF", "AUD", "CAD"];
// com/turo/common/enums/PoiType.kt
const POI_TYPES = ["AIRPORT", "STREET", "LODGING", "TRAIN_STATION"];
// com/turo/search/enums/PickupType.kt
const PICKUP_TYPES = ["ALL", "PICKUP_AT", "PICKUP_NEAR"];
// com/turo/search/enums/SortType.kt
const SORT_TYPES = ["RELEVANCE", "PRICE", "DISTANCE", "SCORE", "RANDOMIZED"];
// com/turo/search/enums/SortDirection.kt
const SORT_DIRECTIONS = ["ASC", "DESC"];
// com/turo/common/enums/Engine.kt
const ENGINES = ["HYBRID", "ELECTRIC", "COMBUSTION"];
// in vehicle search microservice, the make/model is just a string,
// so we have to come up with our own map[string][]string
const MODELS_TO_MAKES = {
  Toyota: ["Camry", "Corolla", "Rav4"],
  Honda: ["Civic", "Accord", "Pilot"],
  Ford: ["F-150", "Focus", "Escape"],
  Chevrolet: ["Silverado", "Malibu", "Equinox"],
  Nissan: ["Altima", "Sentra", "Rogue"],
  Jeep: ["Wrangler", "Cherokee", "Grand Cherokee"],
  GMC: ["Sierra", "Terrain", "Acadia"],
  Subaru: ["Outback", "Forester", "Impreza"],
  Hyundai: ["Sonata", "Elantra", "Tucson"],
  Kia: ["Sorento", "Sportage", "Forte"],
  BMW: ["3 Series", "5 Series", "X5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC"],
  Audi: ["A4", "Q5", "A6"],
  Lexus: ["RX", "ES", "NX"],
  Mazda: ["CX-5", "Mazda3", "Mazda6"],
  Volkswagen: ["Jetta", "Passat", "Tiguan"],
  Buick: ["Enclave", "Encore", "Regal"],
  Cadillac: ["Escalade", "XT5", "CTS"],
  Acura: ["MDX", "RDX", "TLX"],
  Infiniti: ["Q50", "QX60", "QX80"],
  Lincoln: ["Navigator", "MKZ", "Nautilus"],
  Chrysler: ["Pacifica", "300", "Voyager"],
  Dodge: ["Challenger", "Durango", "Journey"],
  Ram: ["1500", "2500", "3500"],
  Mitsubishi: ["Outlander", "Eclipse Cross", "Mirage"],
  "Land Rover": ["Range Rover", "Discovery", "Defender"],
  Jaguar: ["F-Pace", "XE", "XF"],
  Porsche: ["911", "Cayenne", "Panamera"],
  Mini: ["Cooper", "Countryman", "Clubman"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y"],
  Fiat: ["500", "500X", "124 Spider"],
  Genesis: ["G70", "G80", "G90"],
  Smart: ["Fortwo"],
  "Alfa Romeo": ["Giulia", "Stelvio"],
  Maserati: ["Ghibli", "Levante", "Quattroporte"],
  Bentley: ["Continental GT", "Bentayga", "Flying Spur"],
  Lamborghini: ["Urus", "Huracan", "Aventador"],
  Ferrari: ["F8 Tributo", "812 Superfast", "SF90 Stradale"],
  McLaren: ["570S", "720S", "Speedtail"],
  Bugatti: ["Chiron", "Veyron"],
  Koenigsegg: ["Agera RS", "Jesko", "Regera"],
  "Rolls-Royce": ["Phantom", "Cullinan", "Wraith"],
  "Aston Martin": ["DB11", "Vantage", "DBS Superleggera"],
  Lotus: ["Evora", "Exige", "Elise"],
  Polestar: ["2", "1"],
  Lucid: ["Air"],
  "GMC Hummer EV": ["SUT", "SUV"],
  Byton: ["M-Byte", "K-Byte"],
  NIO: ["ES6", "ES8", "ET7"],
  Rimac: ["C_Two"],
  "Faraday Future": ["FF 91"],
  "Lordstown Motors": ["Endurance"],
  Canoo: ["Lifestyle Vehicle"],
  Fisker: ["Ocean"],
  "Alpha Motor Corporation": ["Ace", "Jax"],
  "Atlis Motor Vehicles": ["XT", "XP"],
  "Bollinger Motors": ["B1", "B2"],
  "Karma Automotive": ["Revero", "GS-6"],
  "Nikola Corporation": ["Badger", "Tre"],
  Sony: ["Vision-S"],
  "VW ID. Buzz": ["Cargo", "Passenger"],
};
// com/turo/common/enums/TmvTier.kt
const TMV_TIERS = ["STANDARD", "DELUXE", "SUPER_DELUXE"];
// com/turo/common/enums/VehicleCategory.kt
const CATEGORIES = [
  "AFFORDABLE",
  "PREMIUM",
  "SPORTY_SPINS",
  "OUTDOOR_ADVENTURE",
  "FAMILY_FRIENDLY",
  "FUN_IN_THE_SUN",
  "FUEL_SIPPER",
  "NEW_CAR_SMELL",
  "UPSCALE_PREMIUM",
];
const FEATURES = [
  "ACCESSIBLE",
  "ALL_WHEEL_DRIVE",
  "ANDROID_AUTO",
  "APPLE_CARPLAY",
  "AUX_INPUT",
  "BACKUP_CAMERA",
  "BIKE_RACK",
  "BLIND_SPOT_WARNING",
  "BLUETOOTH",
  "CHILD_SEAT",
  "CONVERTIBLE",
  "GPS",
  "HEATED_SEATS",
  "KEYLESS_ENTRY",
  "PET_FRIENDLY",
  "SKI_RACK",
  "SNOW_TIRES",
  "SUNROOF",
  "TOLL_PASS",
  "USB_CHARGER",
  "USB_INPUT",
];
const VEHICLE_TYPES = [
  "CAR",
  "SUV",
  "MINIVAN",
  "TRUCK",
  "VAN",
  "CARGO_VAN",
  "CARGO_MINIVAN",
  "PASSENGER_VAN",
  "PASSENGER_MINIVAN",
];
const TRANSMISSIONS = ["AUTOMATIC", "MANUAL"];
const INSTANT_BOOK_LOCATION_TYPES = ["HOME", "POI", "CUSTOM"];

export function randomId() {
  return randomIntBetween(100000, 999999);
}

export function randomCountry() {
  return randomItem(COUNTRIES);
}

export function randomSearchLocationType() {
  return randomItem(SEARCH_LOCATION_TYPES);
}

export function randomIndexingLocationType() {
  return randomItem(INDEXING_LOCATION_TYPES);
}

export function randomCurrency() {
  return randomItem(CURRENCIES);
}

export function randomMaxDeliveryFee() {
  return randomIntBetween(0, 200);
}

export function randomPickupType() {
  return randomItem(PICKUP_TYPES);
}

export function randomTopRightGeoPoint() { 
  return {
    lat: randomIntBetween(0, 90),
    lng: randomIntBetween(0, 180),
  };
}

export function randomBottomLeftGeoPoint() {
  return {
    lat: randomIntBetween(-90, 0),
    lng: randomIntBetween(-180, 0),
  };
}

export function randomGeoPoint() {
  return {
    lat: randomIntBetween(-90, 90),
    lng: randomIntBetween(-180, 180),
  };
}

export function randomSortType() {
  return randomItem(SORT_TYPES);
}

export function randomSortDirection() {
  return randomItem(SORT_DIRECTIONS);
}

export function randomEngine() {
  return randomItem(ENGINES);
}

export function randomEngines() {
  let engines = [];
  for (let i = 0; i < randomIntBetween(0, ENGINES.length); i++) {
    engines.push(randomItem(ENGINES));
  }
  return engines;
}

export function randomTVMTier() {
  return randomItem(TMV_TIERS);
}

export function randomTVMTiers() {
  let tmvTiers = [];
  for (let i = 0; i < randomIntBetween(0, TMV_TIERS.length); i++) {
    tmvTiers.push(randomItem(TMV_TIERS));
  }
}

export function randomFeature() {
  return randomItem(FEATURES);
}

export function randomFeatures() {
  let features = [];
  for (let i = 0; i < randomIntBetween(0, FEATURES.length); i++) {
    features.push(randomItem(FEATURES));
  }
  return features;
}

export function randodmVehicleType() {
  return randomItem(VEHICLE_TYPES);
}

export function randomVehicleTypes() {
  let types = [];
  for (let i = 0; i < randomIntBetween(0, VEHICLE_TYPES.length); i++) {
    types.push(randomItem(VEHICLE_TYPES));
  }
  return types;
}

export function randomCategory() {
  return randomItem(CATEGORIES);
}

export function randomMakeAndModel() {
  const makes = Object.keys(MODELS_TO_MAKES);
  const randomMake = randomItem(makes);
  const models = MODELS_TO_MAKES[randomMake];
  const randomModel = randomItem(models);
  return [randomMake, randomModel];
}

export function randomTransmission() {
  return randomItem(TRANSMISSIONS);
}

export function randomInstantBookLocationTypes() {
  let types = [];
  for (
    let i = 0;
    i < randomIntBetween(0, INSTANT_BOOK_LOCATION_TYPES.length);
    i++
  ) {
    types.push(randomItem(INSTANT_BOOK_LOCATION_TYPES));
  }
  return types;
}

export function randomMakesAndModels() {
  const makes = Object.keys(MODELS_TO_MAKES);
  const makeIterNum = randomIntBetween(0, makes.length);
  let randomMakes = [];
  let randomModels = [];
  for (let i = 0; i < makeIterNum; i++) {
    const randomMake = randomItem(makes);
    randomMakes.push(randomMake);
    const models = MODELS_TO_MAKES[randomMake];
    const modelIterNum = randomIntBetween(0, models.length);
    for (let j = 0; j < modelIterNum; j++) {
      randomModels.push(randomItem(models));
    }
  }
  return [randomMakes, randomModels];
}
