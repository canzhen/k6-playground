import {
  randomItem,
  randomIntBetween,
} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { weightedRandom } from "./utils.js";

const STATE_TO_CITIES = {
  AK: [
    { name: "Anchorage", longitude: -149.9003, latitude: 61.2181, count: 1438 },
    { name: "Fairbanks", longitude: -147.7164, latitude: 64.8378, count: 140 },
    { name: "Juneau", longitude: -134.4197, latitude: 58.3019, count: 132 },
    { name: "Wasilla", longitude: -149.4326, latitude: 61.5814, count: 103 },
    { name: "North Pole", longitude: -147.358, latitude: 64.7511, count: 47 },
    { name: "Sitka", longitude: -135.3358, latitude: 57.0531, count: 39 },
    { name: "Kodiak", longitude: -152.4072, latitude: 57.79, count: 34 },
    { name: "Seward", longitude: -149.4394, latitude: 60.1042, count: 25 },
    { name: "Ketchikan", longitude: -131.6461, latitude: 55.3422, count: 23 },
    { name: "Palmer", longitude: -149.1128, latitude: 61.6046, count: 21 },
    { name: "Soldotna", longitude: -151.0708, latitude: 60.4867, count: 18 },
    { name: "Kenai", longitude: -151.2583, latitude: 60.5544, count: 14 },
    { name: "Skagway", longitude: -135.3317, latitude: 59.4567, count: 12 },
    { name: "Homer", longitude: -151.5483, latitude: 59.6425, count: 8 },
    { name: "FAIRBANKS", longitude: -147.7181, latitude: 64.8378, count: 8 },
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
  AZ: [
    { name: "Phoenix", longitude: -112.074, latitude: 33.4484, count: 2694 },
    { name: "Scottsdale", longitude: -111.9261, latitude: 33.4942, count: 489 },
    { name: "Tempe", longitude: -111.9396, latitude: 33.4255, count: 474 },
    { name: "Mesa", longitude: -111.8315, latitude: 33.4152, count: 420 },
    { name: "Gilbert", longitude: -111.789, latitude: 33.3528, count: 366 },
    { name: "Chandler", longitude: -111.8413, latitude: 33.3062, count: 313 },
    { name: "Tucson", longitude: -110.9747, latitude: 32.2226, count: 241 },
    {
      name: "Queen Creek",
      longitude: -111.6342,
      latitude: 33.2537,
      count: 128,
    },
    { name: "Glendale", longitude: -112.1859, latitude: 33.5387, count: 118 },
    { name: "Peoria", longitude: -112.2374, latitude: 33.5806, count: 74 },
    { name: "Avondale", longitude: -112.3496, latitude: 33.4356, count: 68 },
    { name: "Surprise", longitude: -112.3809, latitude: 33.6292, count: 42 },
    { name: "Goodyear", longitude: -112.3577, latitude: 33.4353, count: 37 },
    { name: "Tolleson", longitude: -112.2563, latitude: 33.4507, count: 35 },
    {
      name: "Litchfield Park",
      longitude: -112.3577,
      latitude: 33.4934,
      count: 34,
    },
  ],
  AR: [
    { name: "Little Rock", longitude: -92.2896, latitude: 34.7465, count: 86 },
    { name: "Bentonville", longitude: -94.2088, latitude: 36.3729, count: 56 },
    { name: "Benton", longitude: -92.5913, latitude: 34.5645, count: 34 },
    { name: "Bryant", longitude: -92.4958, latitude: 34.5965, count: 27 },
    { name: "Springdale", longitude: -94.1288, latitude: 36.1867, count: 25 },
    {
      name: "North Little Rock",
      longitude: -92.2669,
      latitude: 34.7695,
      count: 24,
    },
    { name: "Rogers", longitude: -94.1185, latitude: 36.332, count: 20 },
    { name: "Centerton", longitude: -94.2905, latitude: 36.3593, count: 13 },
    { name: "Fort Smith", longitude: -94.3986, latitude: 35.3859, count: 8 },
    { name: "Fayetteville", longitude: -94.1574, latitude: 36.0626, count: 7 },
    { name: "Russellville", longitude: -93.1338, latitude: 35.2784, count: 6 },
    { name: "Sherwood", longitude: -92.2243, latitude: 34.8151, count: 6 },
    { name: "Cave Springs", longitude: -94.2949, latitude: 36.2872, count: 4 },
    { name: "Alexander", longitude: -92.4027, latitude: 34.6446, count: 3 },
    { name: "Hot Springs", longitude: -93.0581, latitude: 34.5037, count: 3 },
  ],
  CA: [
    {
      name: "Los Angeles",
      longitude: -118.2437,
      latitude: 34.0522,
      count: 5131,
    },
    { name: "San Diego", longitude: -117.1611, latitude: 32.7157, count: 2160 },
    { name: "Irvine", longitude: -117.7947, latitude: 33.6846, count: 788 },
    { name: "Glendale", longitude: -118.2551, latitude: 34.1425, count: 693 },
    { name: "San Jose", longitude: -121.8863, latitude: 37.3382, count: 659 },
    { name: "Sacramento", longitude: -121.4944, latitude: 38.5816, count: 546 },
    {
      name: "San Francisco",
      longitude: -122.4194,
      latitude: 37.7749,
      count: 500,
    },
    { name: "Inglewood", longitude: -118.3287, latitude: 33.9617, count: 462 },
    { name: "Hawthorne", longitude: -118.3526, latitude: 33.9164, count: 356 },
    { name: "Fremont", longitude: -121.9886, latitude: 37.5485, count: 300 },
    { name: "Santa Ana", longitude: -117.8677, latitude: 33.7455, count: 280 },
    { name: "Burlingame", longitude: -122.3631, latitude: 37.5841, count: 264 },
    { name: "Ontario", longitude: -117.6509, latitude: 34.0633, count: 257 },
    { name: "Costa Mesa", longitude: -117.9187, latitude: 33.6412, count: 245 },
    {
      name: "Garden Grove",
      longitude: -117.9414,
      latitude: 33.7739,
      count: 244,
    },
  ],
  CO: [
    { name: "Denver", longitude: -104.9903, latitude: 39.7392, count: 1447 },
    { name: "Aurora", longitude: -104.8319, latitude: 39.7294, count: 1366 },
    {
      name: "Colorado Springs",
      longitude: -104.8214,
      latitude: 38.8339,
      count: 390,
    },
    { name: "Thornton", longitude: -104.9719, latitude: 39.868, count: 166 },
    {
      name: "Commerce City",
      longitude: -104.9339,
      latitude: 39.8083,
      count: 150,
    },
    { name: "Littleton", longitude: -105.0166, latitude: 39.6133, count: 131 },
    { name: "Arvada", longitude: -105.0875, latitude: 39.8028, count: 114 },
    { name: "Parker", longitude: -104.7623, latitude: 39.5186, count: 110 },
    { name: "Lakewood", longitude: -105.0814, latitude: 39.7047, count: 93 },
    { name: "Englewood", longitude: -104.9876, latitude: 39.6469, count: 82 },
    { name: "Centennial", longitude: -104.8772, latitude: 39.5808, count: 77 },
    { name: "Wheat Ridge", longitude: -105.0866, latitude: 39.7661, count: 77 },
    { name: "Westminster", longitude: -105.0372, latitude: 39.8367, count: 70 },
    { name: "Montrose", longitude: -107.8747, latitude: 38.4783, count: 65 },
    {
      name: "Grand Junction",
      longitude: -108.5507,
      latitude: 39.0639,
      count: 60,
    },
  ],
  CT: [
    { name: "Stamford", longitude: -73.5387, latitude: 41.0534, count: 65 },
    { name: "Danbury", longitude: -73.454, latitude: 41.3948, count: 48 },
    { name: "Waterbury", longitude: -73.0514, latitude: 41.5582, count: 43 },
    { name: "Hartford", longitude: -72.6831, latitude: 41.7637, count: 42 },
    { name: "Bridgeport", longitude: -73.2048, latitude: 41.1865, count: 35 },
    { name: "New Haven", longitude: -72.9279, latitude: 41.3083, count: 34 },
    { name: "Stratford", longitude: -73.1313, latitude: 41.1845, count: 30 },
    {
      name: "West Hartford",
      longitude: -72.7437,
      latitude: 41.7621,
      count: 27,
    },
    {
      name: "East Hartford",
      longitude: -72.6128,
      latitude: 41.7637,
      count: 26,
    },
    { name: "West Haven", longitude: -72.952, latitude: 41.2707, count: 24 },
    { name: "Bristol", longitude: -72.9451, latitude: 41.6718, count: 20 },
    { name: "Manchester", longitude: -72.5288, latitude: 41.7759, count: 20 },
    { name: "Farmington", longitude: -72.8324, latitude: 41.7213, count: 18 },
    { name: "Norwalk", longitude: -73.4085, latitude: 41.1177, count: 16 },
    { name: "Suffield", longitude: -72.6548, latitude: 41.9918, count: 16 },
  ],
  DC: [
    { name: "Washington", longitude: -77.0369, latitude: 38.9072, count: 233 },
  ],
  DE: [
    { name: "Wilmington", longitude: -75.5466, latitude: 39.7391, count: 87 },
    { name: "Newark", longitude: -75.7497, latitude: 39.678, count: 57 },
    { name: "Middletown", longitude: -75.7156, latitude: 39.4496, count: 44 },
    { name: "New Castle", longitude: -75.5777, latitude: 39.662, count: 42 },
    { name: "Bear", longitude: -75.6503, latitude: 39.6084, count: 24 },
    {
      name: "Camden Wyoming",
      longitude: -75.6476,
      latitude: 39.119,
      count: 15,
    },
    { name: "Claymont", longitude: -75.4466, latitude: 39.8035, count: 13 },
    { name: "Smyrna", longitude: -75.6045, latitude: 39.2998, count: 10 },
    { name: "Townsend", longitude: -75.6956, latitude: 39.3943, count: 10 },
    { name: "Dover", longitude: -75.5244, latitude: 39.1582, count: 9 },
  ],
  FL: [
    { name: "Orlando", longitude: -81.3792, latitude: 28.5383, count: 3864 },
    { name: "Miami", longitude: -80.1917, latitude: 25.7617, count: 2511 },
    { name: "Tampa", longitude: -82.4572, latitude: 27.9506, count: 1337 },
    {
      name: "Jacksonville",
      longitude: -81.6557,
      latitude: 30.3322,
      count: 888,
    },
    {
      name: "Fort Lauderdale",
      longitude: -80.1373,
      latitude: 26.1224,
      count: 712,
    },
    { name: "Kissimmee", longitude: -81.4076, latitude: 28.292, count: 694 },
    { name: "Hollywood", longitude: -80.1495, latitude: 26.0112, count: 528 },
    { name: "Fort Myers", longitude: -81.8723, latitude: 26.6406, count: 448 },
    {
      name: "West Palm Beach",
      longitude: -80.0534,
      latitude: 26.7153,
      count: 404,
    },
    { name: "Doral", longitude: -80.3553, latitude: 25.8195, count: 347 },
    { name: "Sarasota", longitude: -82.5307, latitude: 27.3364, count: 313 },
    { name: "Dania Beach", longitude: -80.1373, latitude: 26.0523, count: 290 },
    { name: "Boca Raton", longitude: -80.1248, latitude: 26.3683, count: 274 },
    { name: "Hialeah", longitude: -80.2781, latitude: 25.8576, count: 245 },
    {
      name: "Pembroke Pines",
      longitude: -80.2963,
      latitude: 26.0078,
      count: 236,
    },
  ],
  GA: [
    { name: "Atlanta", longitude: -84.388, latitude: 33.749, count: 1380 },
    {
      name: "Lawrenceville",
      longitude: -83.9869,
      latitude: 33.9562,
      count: 232,
    },
    {
      name: "College Park",
      longitude: -84.4133,
      latitude: 33.6534,
      count: 231,
    },
    { name: "Savannah", longitude: -81.0998, latitude: 32.0835, count: 214 },
    { name: "Marietta", longitude: -84.5113, latitude: 33.9526, count: 211 },
    { name: "East Point", longitude: -84.4409, latitude: 33.6796, count: 146 },
    { name: "Decatur", longitude: -84.2963, latitude: 33.7748, count: 141 },
    { name: "Fairburn", longitude: -84.579, latitude: 33.5679, count: 130 },
    { name: "Conyers", longitude: -84.0177, latitude: 33.6676, count: 119 },
    { name: "Pooler", longitude: -81.2749, latitude: 32.1155, count: 112 },
    {
      name: "Stone Mountain",
      longitude: -84.1057,
      latitude: 33.8082,
      count: 104,
    },
    { name: "Suwanee", longitude: -84.068, latitude: 34.0515, count: 93 },
    { name: "Snellville", longitude: -84.0033, latitude: 33.8573, count: 88 },
    { name: "Norcross", longitude: -84.2135, latitude: 33.9412, count: 85 },
    { name: "Douglasville", longitude: -84.7152, latitude: 33.7515, count: 73 },
  ],
  HI: [
    { name: "Honolulu", longitude: -157.8583, latitude: 21.3069, count: 2644 },
    { name: "Lihue", longitude: -159.3711, latitude: 21.9811, count: 1081 },
    {
      name: "Kailua-Kona",
      longitude: -156.0414,
      latitude: 19.6406,
      count: 924,
    },
    { name: "Kahului", longitude: -156.4578, latitude: 20.8893, count: 819 },
    { name: "Wailuku", longitude: -156.5047, latitude: 20.8911, count: 304 },
    { name: "Kihei", longitude: -156.4529, latitude: 20.7554, count: 296 },
    { name: "Ewa Beach", longitude: -158.0092, latitude: 21.3156, count: 210 },
    { name: "Hilo", longitude: -155.09, latitude: 19.7071, count: 178 },
    { name: "Kalaoa", longitude: -155.9605, latitude: 19.7359, count: 148 },
    { name: "Kapaʻa", longitude: -159.319, latitude: 22.0964, count: 117 },
    { name: "Kapolei", longitude: -158.0875, latitude: 21.3904, count: 117 },
    { name: "Mililani", longitude: -158.0153, latitude: 21.4704, count: 106 },
    { name: "Kailua", longitude: -157.8036, latitude: 21.4022, count: 97 },
    { name: "Waipahu", longitude: -158.0073, latitude: 21.3867, count: 94 },
    { name: "Koloa", longitude: -159.4645, latitude: 21.9042, count: 84 },
  ],
  IA: [
    {
      name: "West Des Moines",
      longitude: -93.7766,
      latitude: 41.5772,
      count: 53,
    },
    { name: "Des Moines", longitude: -93.6091, latitude: 41.5868, count: 29 },
    { name: "Ankeny", longitude: -93.6001, latitude: 41.7318, count: 17 },
    { name: "Cedar Rapids", longitude: -91.6656, latitude: 41.9779, count: 11 },
    { name: "Coralville", longitude: -91.5835, latitude: 41.6764, count: 10 },
    {
      name: "Council Bluffs",
      longitude: -95.8608,
      latitude: 41.2619,
      count: 8,
    },
    { name: "Davenport", longitude: -90.5776, latitude: 41.5236, count: 7 },
    { name: "Waterloo", longitude: -92.3329, latitude: 42.4928, count: 7 },
    { name: "Waukee", longitude: -93.867, latitude: 41.6145, count: 7 },
    { name: "Hiawatha", longitude: -91.6956, latitude: 42.0495, count: 5 },
    { name: "Urbandale", longitude: -93.7122, latitude: 41.6267, count: 5 },
    { name: "Dubuque", longitude: -90.6646, latitude: 42.5006, count: 4 },
    { name: "Bettendorf", longitude: -90.4835, latitude: 41.5454, count: 3 },
    { name: "Eldridge", longitude: -90.5856, latitude: 41.6556, count: 3 },
    { name: "IOWA CITY", longitude: -91.5302, latitude: 41.6611, count: 3 },
  ],
  ID: [
    { name: "Boise", longitude: -116.2146, latitude: 43.615, count: 338 },
    { name: "Meridian", longitude: -116.3915, latitude: 43.6121, count: 111 },
    { name: "Nampa", longitude: -116.5625, latitude: 43.5407, count: 69 },
    {
      name: "Coeur d'Alene",
      longitude: -116.7805,
      latitude: 47.6777,
      count: 54,
    },
    { name: "Idaho Falls", longitude: -112.0339, latitude: 43.4926, count: 41 },
    { name: "Twin Falls", longitude: -114.4609, latitude: 42.546, count: 38 },
    { name: "Pocatello", longitude: -112.4441, latitude: 42.8713, count: 32 },
    { name: "Caldwell", longitude: -116.6874, latitude: 43.6629, count: 25 },
    { name: "Eagle", longitude: -116.3915, latitude: 43.6956, count: 24 },
    { name: "Rexburg", longitude: -111.789, latitude: 43.826, count: 19 },
    { name: "Post Falls", longitude: -116.8684, latitude: 47.717, count: 18 },
    { name: "Moscow", longitude: -116.9177, latitude: 46.7324, count: 17 },
    { name: "Lewiston", longitude: -117.0026, latitude: 46.4153, count: 17 },
    { name: "Hayden", longitude: -116.792, latitude: 47.7623, count: 16 },
    {
      name: "Mountain Home",
      longitude: -115.6936,
      latitude: 43.133,
      count: 14,
    },
  ],
  IL: [
    { name: "Chicago", longitude: -87.6298, latitude: 41.8781, count: 2372 },
    { name: "Rockford", longitude: -89.0937, latitude: 42.2711, count: 69 },
    { name: "Springfield", longitude: -89.6501, latitude: 39.7817, count: 65 },
    { name: "Peoria", longitude: -89.5889, latitude: 40.6936, count: 52 },
    { name: "Naperville", longitude: -88.1535, latitude: 41.7508, count: 51 },
    { name: "Aurora", longitude: -88.3201, latitude: 41.7606, count: 47 },
    { name: "Champaign", longitude: -88.2434, latitude: 40.1164, count: 44 },
    { name: "Bloomington", longitude: -88.9937, latitude: 40.4842, count: 37 },
    { name: "Joliet", longitude: -88.0817, latitude: 41.525, count: 35 },
    { name: "Elgin", longitude: -88.2826, latitude: 42.0372, count: 34 },
    { name: "Decatur", longitude: -88.9548, latitude: 39.8403, count: 31 },
    { name: "Schaumburg", longitude: -88.0834, latitude: 42.0334, count: 29 },
    { name: "Evanston", longitude: -87.6847, latitude: 42.0451, count: 28 },
    { name: "Bolingbrook", longitude: -88.0684, latitude: 41.6986, count: 25 },
    { name: "Des Plaines", longitude: -87.8889, latitude: 42.0334, count: 22 },
  ],
  IN: [
    {
      name: "Indianapolis",
      longitude: -86.1581,
      latitude: 39.7684,
      count: 739,
    },
    { name: "Fort Wayne", longitude: -85.1394, latitude: 41.0793, count: 86 },
    { name: "Evansville", longitude: -87.545, latitude: 37.9716, count: 69 },
    { name: "South Bend", longitude: -86.25, latitude: 41.6764, count: 49 },
    { name: "Bloomington", longitude: -86.5264, latitude: 39.1653, count: 48 },
    { name: "Lafayette", longitude: -86.8753, latitude: 40.4167, count: 33 },
    { name: "Carmel", longitude: -86.118, latitude: 39.9784, count: 31 },
    { name: "Fishers", longitude: -86.0133, latitude: 39.9568, count: 28 },
    { name: "Elkhart", longitude: -85.9767, latitude: 41.6816, count: 23 },
    { name: "Terre Haute", longitude: -87.4139, latitude: 39.4667, count: 22 },
    { name: "Greenwood", longitude: -86.1067, latitude: 39.6137, count: 22 },
    { name: "Muncie", longitude: -85.379, latitude: 40.1934, count: 20 },
    { name: "Anderson", longitude: -85.6803, latitude: 40.1053, count: 20 },
    { name: "Noblesville", longitude: -86.0086, latitude: 40.0456, count: 19 },
    {
      name: "West Lafayette",
      longitude: -86.9081,
      latitude: 40.4259,
      count: 17,
    },
  ],
  KS: [
    { name: "Wichita", longitude: -97.3375, latitude: 37.6872, count: 71 },
    {
      name: "Overland Park",
      longitude: -94.6708,
      latitude: 38.9822,
      count: 69,
    },
    { name: "Olathe", longitude: -94.8191, latitude: 38.8814, count: 42 },
    { name: "Lenexa", longitude: -94.7452, latitude: 38.9536, count: 21 },
    { name: "Kansas City", longitude: -94.6275, latitude: 39.1142, count: 18 },
    { name: "Shawnee", longitude: -94.7152, latitude: 39.0228, count: 14 },
    { name: "Lawrence", longitude: -95.2353, latitude: 38.9717, count: 9 },
    { name: "Mission", longitude: -94.6715, latitude: 39.0277, count: 5 },
    {
      name: "Prairie Village",
      longitude: -94.6311,
      latitude: 38.9917,
      count: 5,
    },
    { name: "Valley Center", longitude: -97.3684, latitude: 37.8252, count: 5 },
    { name: "Junction City", longitude: -96.8266, latitude: 39.0286, count: 4 },
    { name: "Leawood", longitude: -94.6169, latitude: 38.9667, count: 4 },
    { name: "Manhattan", longitude: -96.5717, latitude: 39.1836, count: 4 },
    {
      name: "Bonner Springs",
      longitude: -94.8836,
      latitude: 39.0597,
      count: 3,
    },
    { name: "Dodge City", longitude: -100.017, latitude: 37.7528, count: 2 },
  ],
  KY: [
    { name: "Louisville", longitude: -85.7585, latitude: 38.2527, count: 181 },
    { name: "Lexington", longitude: -84.5037, latitude: 38.0406, count: 92 },
    {
      name: "Bowling Green",
      longitude: -86.4436,
      latitude: 36.9685,
      count: 22,
    },
    { name: "Owensboro", longitude: -87.1112, latitude: 37.7715, count: 12 },
    { name: "Florence", longitude: -84.6266, latitude: 38.9988, count: 8 },
    { name: "Richmond", longitude: -84.2941, latitude: 37.7479, count: 6 },
    { name: "Georgetown", longitude: -84.5588, latitude: 38.2098, count: 6 },
    { name: "Hopkinsville", longitude: -87.4989, latitude: 36.8656, count: 5 },
    { name: "Nicholasville", longitude: -84.5541, latitude: 37.8806, count: 5 },
    { name: "Versailles", longitude: -84.7735, latitude: 38.0522, count: 5 },
    { name: "Covington", longitude: -84.5086, latitude: 39.0837, count: 4 },
    { name: "Independence", longitude: -84.5442, latitude: 38.9435, count: 4 },
    { name: "Taylor Mill", longitude: -84.4939, latitude: 39.0102, count: 4 },
    { name: "Hebron", longitude: -84.7126, latitude: 39.0616, count: 3 },
    { name: "Shively", longitude: -85.8219, latitude: 38.2001, count: 3 },
  ],
  LA: [
    { name: "New Orleans", longitude: -90.0715, latitude: 29.9511, count: 244 },
    { name: "Baton Rouge", longitude: -91.1403, latitude: 30.4515, count: 105 },
    { name: "Shreveport", longitude: -93.7502, latitude: 32.5252, count: 50 },
    { name: "Lafayette", longitude: -92.0198, latitude: 30.2241, count: 42 },
    { name: "Lake Charles", longitude: -93.2174, latitude: 30.2266, count: 22 },
    { name: "Kenner", longitude: -90.2417, latitude: 29.9941, count: 16 },
    { name: "Bossier City", longitude: -93.7321, latitude: 32.515, count: 15 },
    { name: "Monroe", longitude: -92.1193, latitude: 32.5093, count: 13 },
    { name: "Alexandria", longitude: -92.4451, latitude: 31.3113, count: 12 },
    { name: "Houma", longitude: -90.7195, latitude: 29.5958, count: 8 },
    { name: "Marrero", longitude: -90.1121, latitude: 29.8994, count: 7 },
    { name: "New Iberia", longitude: -91.8187, latitude: 30.0035, count: 7 },
    { name: "Central", longitude: -91.0586, latitude: 30.5433, count: 6 },
    { name: "Slidell", longitude: -89.7793, latitude: 30.2752, count: 5 },
    { name: "Ruston", longitude: -92.6409, latitude: 32.5232, count: 4 },
  ],
  MA: [
    { name: "Boston", longitude: -71.0589, latitude: 42.3601, count: 208 },
    { name: "Worcester", longitude: -71.8023, latitude: 42.2626, count: 18 },
    { name: "Springfield", longitude: -72.5898, latitude: 42.1015, count: 17 },
    { name: "Lowell", longitude: -71.3162, latitude: 42.6334, count: 12 },
    { name: "Cambridge", longitude: -71.1097, latitude: 42.3736, count: 11 },
    { name: "Quincy", longitude: -71.0023, latitude: 42.2529, count: 11 },
    { name: "Brockton", longitude: -71.0184, latitude: 42.0834, count: 8 },
    { name: "Newton", longitude: -71.2092, latitude: 42.337, count: 7 },
    { name: "Lynn", longitude: -70.9495, latitude: 42.4668, count: 7 },
    { name: "Somerville", longitude: -71.1003, latitude: 42.3876, count: 7 },
    { name: "Lawrence", longitude: -71.1631, latitude: 42.707, count: 6 },
    { name: "Framingham", longitude: -71.4162, latitude: 42.2793, count: 6 },
    { name: "Brookline", longitude: -71.1203, latitude: 42.3317, count: 6 },
    { name: "Haverhill", longitude: -71.0773, latitude: 42.7762, count: 5 },
    { name: "Waltham", longitude: -71.2356, latitude: 42.3765, count: 5 },
  ],
  MD: [
    { name: "Baltimore", longitude: -76.6122, latitude: 39.2904, count: 203 },
    { name: "Columbia", longitude: -76.8605, latitude: 39.2037, count: 15 },
    {
      name: "Silver Spring",
      longitude: -77.0261,
      latitude: 38.9907,
      count: 12,
    },
    { name: "Frederick", longitude: -77.4105, latitude: 39.4142, count: 8 },
    { name: "Germantown", longitude: -77.2653, latitude: 39.1732, count: 7 },
    { name: "Rockville", longitude: -77.1528, latitude: 39.084, count: 7 },
    { name: "Gaithersburg", longitude: -77.2016, latitude: 39.1434, count: 7 },
    { name: "Annapolis", longitude: -76.4922, latitude: 38.9784, count: 6 },
    { name: "Bethesda", longitude: -77.0947, latitude: 38.9847, count: 6 },
    { name: "Laurel", longitude: -76.8483, latitude: 39.0993, count: 5 },
    { name: "Waldorf", longitude: -76.9353, latitude: 38.6246, count: 5 },
    { name: "Ellicott City", longitude: -76.8458, latitude: 39.2673, count: 4 },
    { name: "Salisbury", longitude: -75.5916, latitude: 38.3607, count: 4 },
    { name: "Bowie", longitude: -76.7797, latitude: 39.0068, count: 4 },
    { name: "Towson", longitude: -76.6073, latitude: 39.4015, count: 4 },
  ],
  ME: [
    { name: "Portland", longitude: -70.2553, latitude: 43.6591, count: 39 },
    { name: "Lewiston", longitude: -70.171, latitude: 44.1003, count: 7 },
    { name: "Bangor", longitude: -68.7778, latitude: 44.8012, count: 6 },
    {
      name: "South Portland",
      longitude: -70.2533,
      latitude: 43.6415,
      count: 4,
    },
    { name: "Auburn", longitude: -70.2409, latitude: 44.0979, count: 3 },
    { name: "Biddeford", longitude: -70.4594, latitude: 43.4926, count: 3 },
    { name: "Augusta", longitude: -69.791, latitude: 44.3106, count: 2 },
    { name: "Saco", longitude: -70.4428, latitude: 43.5008, count: 2 },
    { name: "Brunswick", longitude: -69.9653, latitude: 43.9145, count: 2 },
    { name: "Sanford", longitude: -70.7711, latitude: 43.4385, count: 2 },
    { name: "Scarborough", longitude: -70.3366, latitude: 43.5908, count: 2 },
    { name: "Westbrook", longitude: -70.3574, latitude: 43.6774, count: 2 },
    { name: "Waterville", longitude: -69.6317, latitude: 44.552, count: 2 },
    { name: "Gorham", longitude: -70.4664, latitude: 43.6792, count: 1 },
    { name: "Kittery", longitude: -70.7486, latitude: 43.0885, count: 1 },
  ],
  MI: [
    { name: "Detroit", longitude: -83.0458, latitude: 42.3314, count: 236 },
    { name: "Grand Rapids", longitude: -85.6681, latitude: 42.9634, count: 24 },
    { name: "Warren", longitude: -83.028, latitude: 42.5145, count: 16 },
    {
      name: "Sterling Heights",
      longitude: -83.0302,
      latitude: 42.5803,
      count: 11,
    },
    { name: "Ann Arbor", longitude: -83.743, latitude: 42.2808, count: 9 },
    { name: "Lansing", longitude: -84.5555, latitude: 42.7325, count: 8 },
    { name: "Flint", longitude: -83.6875, latitude: 43.0125, count: 8 },
    { name: "Dearborn", longitude: -83.1763, latitude: 42.3223, count: 7 },
    { name: "Livonia", longitude: -83.3527, latitude: 42.3684, count: 6 },
    { name: "Troy", longitude: -83.1499, latitude: 42.6056, count: 6 },
    { name: "Westland", longitude: -83.4002, latitude: 42.3242, count: 5 },
    {
      name: "Farmington Hills",
      longitude: -83.3677,
      latitude: 42.4984,
      count: 5,
    },
    { name: "Kalamazoo", longitude: -85.5872, latitude: 42.2917, count: 5 },
    { name: "Wyoming", longitude: -85.7053, latitude: 42.9134, count: 4 },
    { name: "Southfield", longitude: -83.2219, latitude: 42.4734, count: 4 },
  ],
  MN: [
    { name: "Minneapolis", longitude: -93.265, latitude: 44.9778, count: 167 },
    { name: "Saint Paul", longitude: -93.0899, latitude: 44.9537, count: 91 },
    { name: "Rochester", longitude: -92.4802, latitude: 44.0121, count: 12 },
    { name: "Duluth", longitude: -92.1005, latitude: 46.7867, count: 11 },
    { name: "Bloomington", longitude: -93.2983, latitude: 44.8408, count: 11 },
    { name: "Brooklyn Park", longitude: -93.3563, latitude: 45.0941, count: 8 },
    { name: "Plymouth", longitude: -93.4555, latitude: 45.0105, count: 8 },
    { name: "Woodbury", longitude: -92.9585, latitude: 44.9239, count: 7 },
    { name: "Maple Grove", longitude: -93.4555, latitude: 45.0725, count: 7 },
    { name: "Saint Cloud", longitude: -94.1632, latitude: 45.5579, count: 6 },
    { name: "Eagan", longitude: -93.1669, latitude: 44.8041, count: 6 },
    { name: "Eden Prairie", longitude: -93.4708, latitude: 44.8547, count: 6 },
    { name: "Coon Rapids", longitude: -93.303, latitude: 45.1732, count: 6 },
    { name: "Burnsville", longitude: -93.275, latitude: 44.7677, count: 5 },
    { name: "Apple Valley", longitude: -93.2005, latitude: 44.7311, count: 5 },
  ],
  MO: [
    { name: "Kansas City", longitude: -94.5786, latitude: 39.0997, count: 88 },
    { name: "St. Louis", longitude: -90.1994, latitude: 38.627, count: 64 },
    { name: "Springfield", longitude: -93.2923, latitude: 37.2086, count: 12 },
    { name: "Columbia", longitude: -92.3341, latitude: 38.9517, count: 11 },
    { name: "Independence", longitude: -94.4155, latitude: 39.0911, count: 10 },
    { name: "Saint Charles", longitude: -90.4966, latitude: 38.7881, count: 8 },
    { name: "O'Fallon", longitude: -90.6998, latitude: 38.8106, count: 7 },
    { name: "Chesterfield", longitude: -90.5336, latitude: 38.6631, count: 6 },
    { name: "Florissant", longitude: -90.3039, latitude: 38.7892, count: 6 },
    {
      name: "Jefferson City",
      longitude: -92.1735,
      latitude: 38.5767,
      count: 5,
    },
    { name: "Joplin", longitude: -94.5133, latitude: 37.0842, count: 4 },
    { name: "Saint Peters", longitude: -90.6298, latitude: 38.7875, count: 4 },
    { name: "Blue Springs", longitude: -94.2816, latitude: 39.0169, count: 4 },
    { name: "Saint Joseph", longitude: -94.8552, latitude: 39.7675, count: 4 },
    { name: "Ballwin", longitude: -90.5397, latitude: 38.5951, count: 3 },
  ],
  MS: [
    { name: "Jackson", longitude: -90.1848, latitude: 32.2988, count: 15 },
    { name: "Gulfport", longitude: -89.0928, latitude: 30.3674, count: 7 },
    { name: "Hattiesburg", longitude: -89.2903, latitude: 31.3271, count: 4 },
    { name: "Biloxi", longitude: -88.8853, latitude: 30.396, count: 4 },
    { name: "Southaven", longitude: -89.9785, latitude: 34.988, count: 2 },
    { name: "Meridian", longitude: -88.7034, latitude: 32.3643, count: 2 },
    { name: "Olive Branch", longitude: -89.8469, latitude: 34.9618, count: 2 },
    { name: "Tupelo", longitude: -88.7034, latitude: 34.2576, count: 1 },
    { name: "Pearl", longitude: -90.1047, latitude: 32.2746, count: 1 },
    { name: "Clinton", longitude: -90.3218, latitude: 32.3415, count: 1 },
    { name: "Ridgeland", longitude: -90.1239, latitude: 32.4285, count: 1 },
    { name: "Starkville", longitude: -88.8184, latitude: 33.4504, count: 1 },
    { name: "Brandon", longitude: -89.9854, latitude: 32.2732, count: 1 },
    { name: "Madison", longitude: -90.1377, latitude: 32.461, count: 1 },
    { name: "Columbus", longitude: -88.4273, latitude: 33.4957, count: 1 },
  ],
  NH: [
    { name: "Manchester", longitude: -71.4548, latitude: 42.9956, count: 7 },
    { name: "Nashua", longitude: -71.4676, latitude: 42.7654, count: 4 },
    { name: "Portsmouth", longitude: -70.7626, latitude: 43.0718, count: 1 },
    { name: "Dover", longitude: -70.8737, latitude: 43.1979, count: 1 },
    { name: "Rochester", longitude: -70.9757, latitude: 43.3045, count: 1 },
    { name: "Hampton", longitude: -70.8384, latitude: 42.9376, count: 1 },
    { name: "Salem", longitude: -71.208, latitude: 42.7762, count: 1 },
    { name: "Concord", longitude: -71.5375, latitude: 43.2081, count: 1 },
  ],
  NE: [
    { name: "Omaha", longitude: -95.9345, latitude: 41.2565, count: 42 },
    { name: "Lincoln", longitude: -96.7311, latitude: 40.8136, count: 6 },
    { name: "Bellevue", longitude: -95.9345, latitude: 41.1544, count: 1 },
    { name: "Papillion", longitude: -96.0425, latitude: 41.1544, count: 1 },
  ],
  ND: [
    { name: "Fargo", longitude: -96.7898, latitude: 46.8772, count: 17 },
    { name: "Bismarck", longitude: -100.7837, latitude: 46.8083, count: 4 },
    { name: "Grand Forks", longitude: -97.0586, latitude: 47.9253, count: 1 },
    { name: "Minot", longitude: -101.2963, latitude: 48.2325, count: 1 },
  ],
  NC: [
    { name: "Charlotte", longitude: -80.8431, latitude: 35.2271, count: 40 },
    { name: "Raleigh", longitude: -78.6382, latitude: 35.7796, count: 12 },
    { name: "Greensboro", longitude: -79.791, latitude: 36.0726, count: 6 },
    { name: "Durham", longitude: -78.8986, latitude: 35.994, count: 5 },
    { name: "Wilmington", longitude: -77.9447, latitude: 34.2257, count: 4 },
    { name: "Cary", longitude: -78.7811, latitude: 35.7915, count: 3 },
    { name: "Asheville", longitude: -82.553, latitude: 35.5951, count: 2 },
    { name: "Concord", longitude: -80.5795, latitude: 35.4088, count: 2 },
    { name: "Fayetteville", longitude: -78.8784, latitude: 35.0527, count: 2 },
    { name: "Jacksonville", longitude: -77.4302, latitude: 34.7541, count: 1 },
    { name: "Morrisville", longitude: -78.8256, latitude: 35.8601, count: 1 },
    { name: "Huntersville", longitude: -80.8487, latitude: 35.4107, count: 1 },
    { name: "Matthews", longitude: -80.7209, latitude: 35.1168, count: 1 },
    { name: "Arden", longitude: -82.553, latitude: 35.4304, count: 1 },
    { name: "Winston-Salem", longitude: -80.2442, latitude: 36.0999, count: 1 },
  ],
  MT: [
    { name: "Bozeman", longitude: -111.0447, latitude: 45.6769, count: 378 },
    { name: "Belgrade", longitude: -111.1719, latitude: 45.7805, count: 265 },
    { name: "Kalispell", longitude: -114.3123, latitude: 48.2026, count: 204 },
    { name: "Missoula", longitude: -113.9959, latitude: 46.8787, count: 125 },
    { name: "Whitefish", longitude: -114.3594, latitude: 48.4111, count: 73 },
    {
      name: "Columbia Falls",
      longitude: -114.1891,
      latitude: 48.3705,
      count: 54,
    },
    { name: "Billings", longitude: -108.5007, latitude: 45.7833, count: 36 },
    { name: "Great Falls", longitude: -111.3008, latitude: 47.5002, count: 15 },
    { name: "Livingston", longitude: -110.5583, latitude: 45.6666, count: 11 },
    { name: "Helena", longitude: -112.0361, latitude: 46.5884, count: 10 },
    {
      name: "West Yellowstone",
      longitude: -111.094,
      latitude: 44.6624,
      count: 9,
    },
    { name: "Bigfork", longitude: -114.0895, latitude: 48.0651, count: 8 },
    { name: "Manhattan", longitude: -111.3337, latitude: 45.856, count: 8 },
    { name: "Big Sky", longitude: -111.4066, latitude: 45.2841, count: 7 },
    { name: "Somers", longitude: -114.2391, latitude: 48.1274, count: 7 },
  ],
  "NJ": [
      {"name": "Jersey City", "longitude": -74.0776, "latitude": 40.7282, "count": 345},
      {"name": "Newark", "longitude": -74.1724, "latitude": 40.7357, "count": 186},
      {"name": "Elizabeth", "longitude": -74.2111, "latitude": 40.6639, "count": 122},
      {"name": "North Bergen", "longitude": -74.0121, "latitude": 40.8043, "count": 73},
      {"name": "Lodi", "longitude": -74.0818, "latitude": 40.8823, "count": 65},
      {"name": "Woodbridge Township", "longitude": -74.2885, "latitude": 40.5559, "count": 53},
      {"name": "Union", "longitude": -74.2643, "latitude": 40.6976, "count": 52},
      {"name": "Clifton", "longitude": -74.1638, "latitude": 40.8584, "count": 51},
      {"name": "Rahway", "longitude": -74.2765, "latitude": 40.6082, "count": 51},
      {"name": "Edison", "longitude": -74.4121, "latitude": 40.5187, "count": 50},
      {"name": "Union City", "longitude": -74.03, "latitude": 40.7673, "count": 44},
      {"name": "Fort Lee", "longitude": -73.9732, "latitude": 40.8509, "count": 39},
      {"name": "Kearny", "longitude": -74.1472, "latitude": 40.7684, "count": 39},
      {"name": "South Amboy", "longitude": -74.2966, "latitude": 40.4774, "count": 38},
      {"name": "Bayonne", "longitude": -74.1143, "latitude": 40.6687, "count": 37}
  ],
  "NM": [
      {"name": "Albuquerque", "longitude": -106.6504, "latitude": 35.0844, "count": 273},
      {"name": "Rio Rancho", "longitude": -106.6709, "latitude": 35.2328, "count": 63},
      {"name": "Santa Fe", "longitude": -105.9378, "latitude": 35.6869, "count": 35},
      {"name": "Taos", "longitude": -105.9378, "latitude": 36.4072, "count": 6},
      {"name": "El Prado", "longitude": -105.6056, "latitude": 36.4813, "count": 5},
      {"name": "Las Cruces", "longitude": -106.7637, "latitude": 32.3199, "count": 5},
      {"name": "Carlsbad", "longitude": -104.2288, "latitude": 32.4207, "count": 3},
      {"name": "Clovis", "longitude": -103.1958, "latitude": 34.4048, "count": 3},
      {"name": "Farmington", "longitude": -108.2187, "latitude": 36.7281, "count": 3},
      {"name": "Los Ranchos de Albuquerque", "longitude": -106.6326, "latitude": 35.1613, "count": 3},
      {"name": "Roswell", "longitude": -104.523, "latitude": 33.3943, "count": 3},
      {"name": "Ranchos de Taos", "longitude": -105.6241, "latitude": 36.3586, "count": 2},
      {"name": "Alamogordo", "longitude": -105.9699, "latitude": 32.8994, "count": 1},
      {"name": "Artesia", "longitude": -104.4084, "latitude": 32.8425, "count": 1},
      {"name": "Aztec", "longitude": -108.6179, "latitude": 36.8236, "count": 1}
  ],
  "NV": [
      {"name": "Las Vegas", "longitude": -115.1398, "latitude": 36.1699, "count": 3465},
      {"name": "Henderson", "longitude": -115.0362, "latitude": 36.0397, "count": 345},
      {"name": "Reno", "longitude": -119.8129, "latitude": 39.5296, "count": 317},
      {"name": "North Las Vegas", "longitude": -115.1485, "latitude": 36.2907, "count": 206},
      {"name": "Sparks", "longitude": -119.7527, "latitude": 39.5357, "count": 65},
      {"name": "Enterprise", "longitude": -115.2794, "latitude": 36.0044, "count": 12},
      {"name": "Mesquite", "longitude": -114.0672, "latitude": 36.8075, "count": 11},
      {"name": "Paradise", "longitude": -115.1398, "latitude": 36.0972, "count": 11},
      {"name": "Nellis Air Force Base", "longitude": -115.0332, "latitude": 36.2489, "count": 7},
      {"name": "Carson City", "longitude": -119.7674, "latitude": 39.1638, "count": 6},
      {"name": "Spring Valley", "longitude": -115.2791, "latitude": 36.0822, "count": 6},
      {"name": "SPARKS", "longitude": -119.7527, "latitude": 39.5357, "count": 5},
      {"name": "Incline Village", "longitude": -119.9373, "latitude": 39.2438, "count": 4},
      {"name": "Pahrump", "longitude": -116.0019, "latitude": 36.2083, "count": 4},
      {"name": "Fernley", "longitude": -119.2511, "latitude": 39.6084, "count": 3}
  ],
  "NY": [
      {"name": "Brooklyn", "longitude": -73.9442, "latitude": 40.6782, "count": 604},
      {"name": "New York", "longitude": -74.006, "latitude": 40.7128, "count": 377},
      {"name": "Bronx", "longitude": -73.8648, "latitude": 40.8448, "count": 245},
      {"name": "Jamaica", "longitude": -73.7919, "latitude": 40.6915, "count": 122},
      {"name": "Long Island City", "longitude": -73.9539, "latitude": 40.7447, "count": 112},
      {"name": "Staten Island", "longitude": -74.1424, "latitude": 40.5795, "count": 61},
      {"name": "Fresh Meadows", "longitude": -73.7824, "latitude": 40.7335, "count": 60},
      {"name": "Buffalo", "longitude": -78.8784, "latitude": 42.8864, "count": 59},
      {"name": "Astoria", "longitude": -73.9213, "latitude": 40.7644, "count": 55},
      {"name": "Woodside", "longitude": -73.9068, "latitude": 40.7454, "count": 54},
      {"name": "Springfield Gardens", "longitude": -73.7571, "latitude": 40.667, "count": 51},
      {"name": "Flushing", "longitude": -73.8316, "latitude": 40.7644, "count": 50},
      {"name": "Yonkers", "longitude": -73.8587, "latitude": 40.9312, "count": 50},
      {"name": "Howard Beach", "longitude": -73.8382, "latitude": 40.6546, "count": 48},
      {"name": "East Elmhurst", "longitude": -73.867, "latitude": 40.7701, "count": 41}
  ],
  "OH": [
      {"name": "Columbus", "longitude": -83.0007, "latitude": 39.9612, "count": 227},
      {"name": "Cincinnati", "longitude": -84.512, "latitude": 39.1031, "count": 193},
      {"name": "Cleveland", "longitude": -81.6944, "latitude": 41.4993, "count": 190},
      {"name": "Dayton", "longitude": -84.1916, "latitude": 39.7589, "count": 59},
      {"name": "Toledo", "longitude": -83.5379, "latitude": 41.6528, "count": 48},
      {"name": "Akron", "longitude": -81.519, "latitude": 41.0814, "count": 47},
      {"name": "Parma", "longitude": -81.7229, "latitude": 41.4041, "count": 45},
      {"name": "New Albany", "longitude": -82.813, "latitude": 40.0814, "count": 42},
      {"name": "Shaker Heights", "longitude": -81.545, "latitude": 41.4739, "count": 30},
      {"name": "West Chester Township", "longitude": -84.4084, "latitude": 39.3321, "count": 30},
      {"name": "Westerville", "longitude": -82.927, "latitude": 40.1262, "count": 29},
      {"name": "Mason", "longitude": -84.3102, "latitude": 39.3601, "count": 25},
      {"name": "Reynoldsburg", "longitude": -82.8121, "latitude": 39.9548, "count": 22},
      {"name": "Dublin", "longitude": -83.1141, "latitude": 40.0992, "count": 19},
      {"name": "Loveland", "longitude": -84.2016, "latitude": 39.2688, "count": 17}
  ],
  "OK": [
      {"name": "Oklahoma City", "longitude": -97.5164, "latitude": 35.4676, "count": 247},
      {"name": "Tulsa", "longitude": -95.9928, "latitude": 36.154, "count": 107},
      {"name": "Edmond", "longitude": -97.4781, "latitude": 35.6528, "count": 98},
      {"name": "Warr Acres", "longitude": -97.6186, "latitude": 35.5226, "count": 22},
      {"name": "Lawton", "longitude": -98.3959, "latitude": 34.6036, "count": 19},
      {"name": "Broken Arrow", "longitude": -95.7975, "latitude": 36.0609, "count": 17},
      {"name": "Moore", "longitude": -97.4867, "latitude": 35.3395, "count": 17},
      {"name": "Yukon", "longitude": -97.7636, "latitude": 35.5067, "count": 16},
      {"name": "Norman", "longitude": -97.4395, "latitude": 35.2226, "count": 12},
      {"name": "Mustang", "longitude": -97.7237, "latitude": 35.3842, "count": 9},
      {"name": "Bixby", "longitude": -95.8777, "latitude": 35.942, "count": 7},
      {"name": "Choctaw", "longitude": -97.2637, "latitude": 35.4988, "count": 6},
      {"name": "Elk City", "longitude": -99.411, "latitude": 35.4111, "count": 6},
      {"name": "Midwest City", "longitude": -97.3964, "latitude": 35.4495, "count": 6},
      {"name": "Owasso", "longitude": -95.8525, "latitude": 36.2695, "count": 6}
  ],
  "OR": [
      {"name": "Portland", "longitude": -122.6765, "latitude": 45.5231, "count": 636},
      {"name": "Eugene", "longitude": -123.0868, "latitude": 44.0521, "count": 103},
      {"name": "Beaverton", "longitude": -122.8037, "latitude": 45.4871, "count": 100},
      {"name": "Bend", "longitude": -121.3153, "latitude": 44.0582, "count": 75},
      {"name": "Medford", "longitude": -122.8756, "latitude": 42.3265, "count": 43},
      {"name": "Clackamas", "longitude": -122.559, "latitude": 45.4079, "count": 37},
      {"name": "Happy Valley", "longitude": -122.5115, "latitude": 45.4465, "count": 37},
      {"name": "Springfield", "longitude": -123.022, "latitude": 44.0462, "count": 31},
      {"name": "Milwaukie", "longitude": -122.6397, "latitude": 45.4461, "count": 29},
      {"name": "Redmond", "longitude": -121.1726, "latitude": 44.2726, "count": 25},
      {"name": "Gresham", "longitude": -122.4302, "latitude": 45.5001, "count": 24},
      {"name": "Hillsboro", "longitude": -122.9367, "latitude": 45.5229, "count": 22},
      {"name": "Salem", "longitude": -123.0351, "latitude": 44.9429, "count": 20},
      {"name": "Tigard", "longitude": -122.7811, "latitude": 45.4312, "count": 19},
      {"name": "Lake Oswego", "longitude": -122.6706, "latitude": 45.4207, "count": 17}
  ],
  "PA": [
      {"name": "Philadelphia", "longitude": -75.1652, "latitude": 39.9526, "count": 561},
      {"name": "Pittsburgh", "longitude": -79.9959, "latitude": 40.4406, "count": 139},
      {"name": "Allentown", "longitude": -75.4902, "latitude": 40.6084, "count": 48},
      {"name": "Yeadon", "longitude": -75.2506, "latitude": 39.9366, "count": 41},
      {"name": "Harrisburg", "longitude": -76.8844, "latitude": 40.2732, "count": 29},
      {"name": "Lancaster", "longitude": -76.3055, "latitude": 40.0379, "count": 26},
      {"name": "Tinicum Township", "longitude": -75.2966, "latitude": 39.8692, "count": 19},
      {"name": "West Chester", "longitude": -75.601, "latitude": 39.9607, "count": 18},
      {"name": "Media", "longitude": -75.3899, "latitude": 39.9171, "count": 17},
      {"name": "Lebanon", "longitude": -76.4111, "latitude": 40.3409, "count": 16},
      {"name": "Bethlehem", "longitude": -75.3705, "latitude": 40.6259, "count": 15},
      {"name": "Coraopolis", "longitude": -80.1626, "latitude": 40.5187, "count": 14},
      {"name": "Norristown", "longitude": -75.3412, "latitude": 40.1215, "count": 12},
      {"name": "Clifton Heights", "longitude": -75.282, "latitude": 39.9298, "count": 11},
      {"name": "Reading", "longitude": -75.9269, "latitude": 40.3356, "count": 11}
  ],
"RI": [
    {"name": "Providence", "longitude": -71.4128, "latitude": 41.824, "count": 54},
    {"name": "Warwick", "longitude": -71.4162, "latitude": 41.7001, "count": 41},
    {"name": "Cranston", "longitude": -71.4372, "latitude": 41.7798, "count": 22},
    {"name": "Johnston", "longitude": -71.5188, "latitude": 41.824, "count": 17},
    {"name": "Pawtucket", "longitude": -71.3636, "latitude": 41.8787, "count": 15},
    {"name": "Lincoln", "longitude": -71.4348, "latitude": 41.9215, "count": 14},
    {"name": "Tiverton", "longitude": -71.1846, "latitude": 41.6253, "count": 13},
    {"name": "North Providence", "longitude": -71.4451, "latitude": 41.8501, "count": 12},
    {"name": "West Warwick", "longitude": -71.5188, "latitude": 41.7001, "count": 7},
    {"name": "CRANSTON", "longitude": -71.4372, "latitude": 41.7798, "count": 5},
    {"name": "East Providence", "longitude": -71.358, "latitude": 41.8137, "count": 4},
    {"name": "Charlestown", "longitude": -71.5036, "latitude": 41.3851, "count": 3},
    {"name": "Cumberland", "longitude": -71.4128, "latitude": 41.9659, "count": 3},
    {"name": "East Greenwich", "longitude": -71.4713, "latitude": 41.6608, "count": 3},
    {"name": "North Kingstown", "longitude": -71.5562, "latitude": 41.622, "count": 3}
],
"SC": [
    {"name": "Myrtle Beach", "longitude": -78.8867, "latitude": 33.6891, "count": 289},
    {"name": "North Charleston", "longitude": -80.0642, "latitude": 32.8546, "count": 214},
    {"name": "Columbia", "longitude": -81.0348, "latitude": 34.0007, "count": 137},
    {"name": "Charleston", "longitude": -79.9311, "latitude": 32.7765, "count": 92},
    {"name": "Summerville", "longitude": -80.1757, "latitude": 33.0185, "count": 82},
    {"name": "Greenville", "longitude": -82.394, "latitude": 34.8526, "count": 69},
    {"name": "Mount Pleasant", "longitude": -79.8284, "latitude": 32.8323, "count": 57},
    {"name": "Fort Mill", "longitude": -80.9451, "latitude": 35.0074, "count": 29},
    {"name": "Greer", "longitude": -82.2279, "latitude": 34.9387, "count": 29},
    {"name": "Ladson", "longitude": -80.1051, "latitude": 32.9859, "count": 25},
    {"name": "Spartanburg", "longitude": -81.932, "latitude": 34.9496, "count": 24},
    {"name": "West Columbia", "longitude": -81.0718, "latitude": 33.9935, "count": 24},
    {"name": "Bluffton", "longitude": -80.8682, "latitude": 32.2371, "count": 22},
    {"name": "Goose Creek", "longitude": -80.0326, "latitude": 32.981, "count": 22},
    {"name": "Hilton Head Island", "longitude": -80.7549, "latitude": 32.2163, "count": 22}
  ],
  "SD": [
      {"name": "Rapid City", "longitude": -103.231, "latitude": 44.0805, "count": 72},
      {"name": "Sioux Falls", "longitude": -96.731, "latitude": 43.5446, "count": 42},
      {"name": "Piedmont", "longitude": -103.319, "latitude": 44.1598, "count": 5},
      {"name": "Box Elder", "longitude": -103.085, "latitude": 44.1125, "count": 4},
      {"name": "Harrisburg", "longitude": -96.701, "latitude": 43.4321, "count": 4},
      {"name": "Aberdeen", "longitude": -98.4859, "latitude": 45.4647, "count": 2},
      {"name": "Deadwood", "longitude": -103.723, "latitude": 44.3769, "count": 2},
      {"name": "Mitchell", "longitude": -98.0253, "latitude": 43.7094, "count": 2},
      {"name": "Summerset", "longitude": -103.352, "latitude": 44.1508, "count": 2},
      {"name": "Flandreau", "longitude": -96.5932, "latitude": 44.0501, "count": 1},
      {"name": "Lead", "longitude": -103.765, "latitude": 44.3506, "count": 1},
      {"name": "North Sioux City", "longitude": -96.4819, "latitude": 42.5585, "count": 1},
      {"name": "Pierre", "longitude": -100.351, "latitude": 44.3683, "count": 1},
      {"name": "Tea", "longitude": -96.8384, "latitude": 43.4461, "count": 1},
      {"name": "Vermillion", "longitude": -96.9281, "latitude": 42.7811, "count": 1}
  ],
  "TN": [
      {"name": "Nashville", "longitude": -86.7816, "latitude": 36.1627, "count": 733},
      {"name": "Memphis", "longitude": -90.0486, "latitude": 35.1495, "count": 233},
      {"name": "Knoxville", "longitude": -83.9207, "latitude": 35.9606, "count": 132},
      {"name": "Chattanooga", "longitude": -85.3097, "latitude": 35.0456, "count": 94},
      {"name": "Murfreesboro", "longitude": -86.3903, "latitude": 35.8456, "count": 72},
      {"name": "Brentwood", "longitude": -86.7816, "latitude": 36.0331, "count": 53},
      {"name": "Franklin", "longitude": -86.8689, "latitude": 35.9251, "count": 41},
      {"name": "Smyrna", "longitude": -86.5186, "latitude": 35.9828, "count": 40},
      {"name": "Clarksville", "longitude": -87.3595, "latitude": 36.5298, "count": 38},
      {"name": "Hendersonville", "longitude": -86.6188, "latitude": 36.3048, "count": 32},
      {"name": "Alcoa", "longitude": -83.9754, "latitude": 35.7894, "count": 22},
      {"name": "Farragut", "longitude": -84.1536, "latitude": 35.8849, "count": 21},
      {"name": "Maryville", "longitude": -83.973, "latitude": 35.7565, "count": 21},
      {"name": "Mt. Juliet", "longitude": -86.5167, "latitude": 36.2001, "count": 21},
      {"name": "Ooltewah", "longitude": -85.0622, "latitude": 35.0745, "count": 21}
  ],
  "TX": [
      {"name": "Houston", "longitude": -95.3698, "latitude": 29.7604, "count": 2725},
      {"name": "Austin", "longitude": -97.7431, "latitude": 30.2672, "count": 1263},
      {"name": "Dallas", "longitude": -96.7969, "latitude": 32.7767, "count": 1160},
      {"name": "San Antonio", "longitude": -98.4936, "latitude": 29.4241, "count": 847},
      {"name": "Irving", "longitude": -96.9489, "latitude": 32.814, "count": 420},
      {"name": "Frisco", "longitude": -96.8254, "latitude": 33.1507, "count": 336},
      {"name": "Fort Worth", "longitude": -97.3308, "latitude": 32.7555, "count": 333},
      {"name": "Arlington", "longitude": -97.1081, "latitude": 32.7357, "count": 296},
      {"name": "El Paso", "longitude": -106.485, "latitude": 31.7619, "count": 292},
      {"name": "Plano", "longitude": -96.6989, "latitude": 33.0198, "count": 277},
      {"name": "Katy", "longitude": -95.8244, "latitude": 29.7858, "count": 268},
      {"name": "Spring", "longitude": -95.4694, "latitude": 30.0799, "count": 217},
      {"name": "Grapevine", "longitude": -97.0736, "latitude": 32.9343, "count": 208},
      {"name": "Grand Prairie", "longitude": -97.0068, "latitude": 32.7459, "count": 204},
      {"name": "Richmond", "longitude": -95.7581, "latitude": 29.5822, "count": 183}
  ],
  "UT": [
      {"name": "Salt Lake City", "longitude": -111.891, "latitude": 40.7608, "count": 589},
      {"name": "Provo", "longitude": -111.657, "latitude": 40.2338, "count": 143},
      {"name": "South Jordan", "longitude": -111.929, "latitude": 40.5622, "count": 132},
      {"name": "Orem", "longitude": -111.723, "latitude": 40.2969, "count": 124},
      {"name": "Lehi", "longitude": -111.853, "latitude": 40.3916, "count": 102},
      {"name": "St. George", "longitude": -113.504, "latitude": 37.0965, "count": 95},
      {"name": "North Salt Lake", "longitude": -111.901, "latitude": 40.8489, "count": 88},
      {"name": "West Valley City", "longitude": -112.014, "latitude": 40.6916, "count": 80},
      {"name": "Sandy", "longitude": -111.841, "latitude": 40.5643, "count": 76},
      {"name": "Riverton", "longitude": -111.938, "latitude": 40.5219, "count": 63},
      {"name": "West Jordan", "longitude": -112.004, "latitude": 40.6097, "count": 62},
      {"name": "American Fork", "longitude": -111.792, "latitude": 40.3769, "count": 57},
      {"name": "Bountiful", "longitude": -111.892, "latitude": 40.8894, "count": 55},
      {"name": "Draper", "longitude": -111.863, "latitude": 40.5247, "count": 55},
      {"name": "Woods Cross", "longitude": -111.901, "latitude": 40.8723, "count": 52}
  ],
  "VA": [
      {"name": "Arlington", "longitude": -77.0879, "latitude": 38.8783, "count": 214},
      {"name": "Virginia Beach", "longitude": -75.9774, "latitude": 36.8529, "count": 188},
      {"name": "Alexandria", "longitude": -77.0469, "latitude": 38.8048, "count": 174},
      {"name": "Richmond", "longitude": -77.436, "latitude": 37.5407, "count": 150},
      {"name": "Fairfax", "longitude": -77.3064, "latitude": 38.8462, "count": 143},
      {"name": "Woodbridge", "longitude": -77.2645, "latitude": 38.6582, "count": 108},
      {"name": "Falls Church", "longitude": -77.1695, "latitude": 38.8823, "count": 90},
      {"name": "Norfolk", "longitude": -76.2859, "latitude": 36.8508, "count": 88},
      {"name": "Ashburn", "longitude": -77.4875, "latitude": 39.0438, "count": 71},
      {"name": "Sterling", "longitude": -77.4291, "latitude": 39.0062, "count": 68},
      {"name": "Chesapeake", "longitude": -76.3125, "latitude": 36.7682, "count": 67},
      {"name": "Chantilly", "longitude": -77.4302, "latitude": 38.8943, "count": 61},
      {"name": "Hampton", "longitude": -76.3452, "latitude": 37.0299, "count": 59},
      {"name": "Centreville", "longitude": -77.4387, "latitude": 38.8404, "count": 56},
      {"name": "Herndon", "longitude": -77.3988, "latitude": 38.9696, "count": 55}
  ],
  "VT": [
      {"name": "South Burlington", "longitude": -73.2225, "latitude": 44.4669, "count": 24},
      {"name": "Essex", "longitude": -73.1162, "latitude": 44.4906, "count": 7},
      {"name": "Colchester", "longitude": -73.2048, "latitude": 44.5457, "count": 4},
      {"name": "Burlington", "longitude": -73.2125, "latitude": 44.4759, "count": 3},
      {"name": "Williston", "longitude": -73.086, "latitude": 44.4259, "count": 3},
      {"name": "Cavendish", "longitude": -72.6785, "latitude": 43.3762, "count": 2},
      {"name": "Essex Junction", "longitude": -73.1171, "latitude": 44.4908, "count": 2},
      {"name": "S Burlington", "longitude": -73.2225, "latitude": 44.4669, "count": 2},
      {"name": "Barre", "longitude": -72.5091, "latitude": 44.1971, "count": 1},
      {"name": "Berlin", "longitude": -72.6047, "latitude": 44.2352, "count": 1},
      {"name": "Charlotte", "longitude": -73.2416, "latitude": 44.3091, "count": 1},
      {"name": "Dorset", "longitude": -73.1001, "latitude": 43.2615, "count": 1},
      {"name": "Enosburg", "longitude": -72.7985, "latitude": 44.9168, "count": 1},
      {"name": "Middlesex", "longitude": -72.7145, "latitude": 44.2797, "count": 1}
  ],
  "WA": [
      {"name": "Seattle", "longitude": -122.3321, "latitude": 47.6062, "count": 450},
      {"name": "SeaTac", "longitude": -122.296, "latitude": 47.444, "count": 254},
      {"name": "Vancouver", "longitude": -122.6615, "latitude": 45.6387, "count": 196},
      {"name": "Renton", "longitude": -122.2171, "latitude": 47.4799, "count": 177},
      {"name": "Bellevue", "longitude": -122.2007, "latitude": 47.6104, "count": 171},
      {"name": "Spokane", "longitude": -117.426, "latitude": 47.6588, "count": 161},
      {"name": "Tukwila", "longitude": -122.2609, "latitude": 47.4627, "count": 116},
      {"name": "Tacoma", "longitude": -122.4443, "latitude": 47.2529, "count": 94},
      {"name": "Kent", "longitude": -122.2348, "latitude": 47.3809, "count": 68},
      {"name": "Lynnwood", "longitude": -122.303, "latitude": 47.8279, "count": 67},
      {"name": "Kirkland", "longitude": -122.2087, "latitude": 47.6769, "count": 65},
      {"name": "Auburn", "longitude": -122.2284, "latitude": 47.3073, "count": 61},
      {"name": "Puyallup", "longitude": -122.2924, "latitude": 47.1854, "count": 58},
      {"name": "Bothell", "longitude": -122.2056, "latitude": 47.7623, "count": 53},
      {"name": "Federal Way", "longitude": -122.3157, "latitude": 47.3223, "count": 50}
  ],
  "WI": [
      {"name": "Milwaukee", "longitude": -87.9065, "latitude": 43.0389, "count": 137},
      {"name": "Madison", "longitude": -89.4012, "latitude": 43.0731, "count": 52},
      {"name": "Appleton", "longitude": -88.4154, "latitude": 44.2619, "count": 25},
      {"name": "Green Bay", "longitude": -88.0198, "latitude": 44.5192, "count": 25},
      {"name": "Franklin", "longitude": -88.0076, "latitude": 42.8871, "count": 23},
      {"name": "Mequon", "longitude": -87.9886, "latitude": 43.2216, "count": 21},
      {"name": "Racine", "longitude": -87.7829, "latitude": 42.7261, "count": 17},
      {"name": "Greendale", "longitude": -87.9995, "latitude": 42.9378, "count": 14},
      {"name": "Kenosha", "longitude": -87.8212, "latitude": 42.5847, "count": 14},
      {"name": "Oak Creek", "longitude": -87.8845, "latitude": 42.8858, "count": 14},
      {"name": "Wauwatosa", "longitude": -88.0076, "latitude": 43.0495, "count": 12},
      {"name": "Neenah", "longitude": -88.4626, "latitude": 44.1858, "count": 11},
      {"name": "Glendale", "longitude": -87.9274, "latitude": 43.1353, "count": 9},
      {"name": "Greenfield", "longitude": -87.9898, "latitude": 42.9614, "count": 9},
      {"name": "Sun Prairie", "longitude": -89.2131, "latitude": 43.1836, "count": 9}
  ],
  "WY": [
      {"name": "Jackson", "longitude": -110.7613, "latitude": 43.4799, "count": 159},
      {"name": "Cody", "longitude": -109.0565, "latitude": 44.5263, "count": 12},
      {"name": "Laramie", "longitude": -105.5911, "latitude": 41.3114, "count": 9},
      {"name": "Casper", "longitude": -106.3126, "latitude": 42.8666, "count": 5},
      {"name": "Teton Village", "longitude": -110.8307, "latitude": 43.5875, "count": 3},
      {"name": "Gillette", "longitude": -105.5014, "latitude": 44.2906, "count": 2},
      {"name": "Powell", "longitude": -108.7544, "latitude": 44.7536, "count": 2},
      {"name": "Riverton", "longitude": -108.4025, "latitude": 43.0286, "count": 2},
      {"name": "Cheyenne", "longitude": -104.8202, "latitude": 41.1399, "count": 1},
      {"name": "Etna", "longitude": -111.0069, "latitude": 43.0076, "count": 1},
      {"name": "Evansville", "longitude": -106.1845, "latitude": 42.8608, "count": 1},
      {"name": "Saratoga", "longitude": -106.7917, "latitude": 41.4545, "count": 1},
      {"name": "Sheridan", "longitude": -106.9569, "latitude": 44.7972, "count": 1},
      {"name": "South Park", "longitude": -106.9519, "latitude": 42.864, "count": 1},
      {"name": "Wilson", "longitude": -110.869, "latitude": 43.4799, "count": 1}
  ]
};

export function getRandomCountryStateCityAndLocation() {
  const country = "US"; // for now, we're only testing United States
  let states = [];
  let stateCounts = [];
  for (const [state, cityDetailList] of Object.entries(STATE_TO_CITIES)) {
    states.push(state);
    let stateTotalCount = 0;
    for (let i = 0; i < cityDetailList.length; i++) {
      const details = cityDetailList[i];
      stateTotalCount += details.count;
    }
    stateCounts.push(stateTotalCount);
  }
  console.log('states', states);
  console.log('stateCounts', stateCounts);
  const state = weightedRandom(states, stateCounts);
  const cityList = STATE_TO_CITIES[state];
  let cities = [];
  let cityCounts = [];
  for (let i = 0; i < cityList.length; i++) {
    cities.push(cityList[i]);
    cityCounts.push(cityList[i].count);
  }
  console.log('cities', cities);
  console.log('cityCounts', cityCounts);
  const cityDetails = weightedRandom(cities, cityCounts);
  return [
    country,
    state,
    cityDetails.name,
    cityDetails.longitude,
    cityDetails.latitude,
  ];
}

export function randomBoolean() {
  return randomIntBetween(0, 1) == 1 ? true : false;
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
  return randomIntBetween(100000, 999999).toString();
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

export function randomGeoPoint() {
  return {
    lat: randomIntBetween(-90, 90),
    lng: randomIntBetween(-180, 180),
  };
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
  return tmvTiers;
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

export function randomCategories() {
  let categories = [];
  for (let i = 0; i < randomIntBetween(0, CATEGORIES.length); i++) {
    categories.push(randomItem(CATEGORIES));
  }
  return categories;
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
