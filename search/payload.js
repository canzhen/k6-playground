import { faker } from "@faker-js/faker";

// com/turo/search/dto/v2/LocationFilterDto.kt
const LOCATION_TYPES = ["area", "boundingbox", "country", "poi", "point"];
// com/turo/common/enums/Country.kt
const COUNTRIES = ["US", "FR", "CA", "GB"];
const CURRENCIES = ["USD", "EUR", "JPY", "GBP", "CHF", "AUD", "CAD"];
// com/turo/common/enums/PoiType.kt
const POI_TYPES = ["AIRPORT", "STREET", "LODGING", "TRAIN_STATION"];
// com/turo/search/enums/PickupType.kt
const PICKUP_TYPES = ["ALL", "PICKUP_AT", "PICKKUP_NEAR"];
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
const FEATURES = [
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

function randomLocationId() {
  return faker.number.int({ min: 10000, max: 99999 });
}

function randomCountry() {
  return COUNTRIES[faker.number.int({ min: 0, max: COUNTRIES.length - 1 })];
}

function randomLocationType() {
  return LOCATION_TYPES[
    faker.number.int({ min: 0, max: LOCATION_TYPES.length - 1 })
  ];
}

function randomCurrency() {
  return CURRENCIES[faker.number.int({ min: 0, max: CURRENCIES.length - 1 })];
}

function randomPoiType() {
  return POI_TYPES[faker.number.int({ min: 0, max: CURRENCIES.length - 1 })];
}

function randomMaxDeliveryFee() {
  return faker.number.int({ min: 0, max: 200 });
}

function randomPickupType() {
  return PICKUP_TYPES[
    faker.number.int({ min: 0, max: PICKUP_TYPES.length - 1 })
  ];
}

function randomGeoPoint() {
  return {
    lat: faker.number.int({ min: -90, max: 90 }),
    lng: faker.number.int({ min: -180, max: 180 }),
  };
}

function randomSortType() {
  return SORT_TYPES[faker.number.int({ min: 0, max: SORT_TYPES.length - 1 })];
}

function randomSortDirection() {
  return SORT_DIRECTIONS[
    faker.number.int({ min: 0, max: SORT_DIRECTIONS.length - 1 })
  ];
}

function randomDates() {
  const start = faker.date.soon();
  let end = new Date();
  end.setDate(start.getDate() + faker.number.int({ min: 1, max: 60 }));
  return {
    end: end,
    start: start,
  };
}

function randomEngine() {
  return ENGINES[faker.number.int({ min: 0, max: ENGINES.length - 1 })];
}

function randomTVMTiers() {
  let tmvTiers = [];
  for (
    let i = 0;
    i < faker.number.int({ min: 0, max: TMV_TIERS.length });
    i++
  ) {
    tmvTiers.push(
      TMV_TIERS[faker.number.int({ min: 0, max: TMV_TIERS.length - 1 })]
    );
  }
}

function randomFeatures() {
  let features = [];
  for (let i = 0; i < faker.number.int({ min: 0, max: FEATURES.length }); i++) {
    features.push(
      FEATURES[faker.number.int({ min: 0, max: FEATURES.length - 1 })]
    );
  }
  return features;
}

function randomVehicleTypes() {
  let types = [];
  for (
    let i = 0;
    i < faker.number.int({ min: 0, max: VEHICLE_TYPES.length });
    i++
  ) {
    types.push(
      VEHICLE_TYPES[faker.number.int({ min: 0, max: VEHICLE_TYPES.length - 1 })]
    );
  }
  return types;
}

// com/turo/search/dto/v2/LocationFilterDto.kt
// com/turo/search/dto/LocationFilterDto.kt
function randomLocationData(locationType) {
  switch (locationType) {
    case "area":
      return {
        type: locationType,
        point: randomGeoPoint(),
        country: randomCountry(),
      };
    case "boundingbox":
      return {
        type: locationType,
        country: randomCountry(),
        bottomLeft: randomGeoPoint(),
        topRight: randomGeoPoint(),
      };
    case "country":
      return {
        type: locationType,
        country: randomCountry(),
      };
    case "poi":
      return {
        type: locationType,
        locationId: randomLocationId(),
        maxDeliveryFee: {
          amount: randomMaxDeliveryFee(),
          currency: randomCurrency(),
        },
        pickupType: randomPickupType(),
        country: randomCountry(),
      };
    case "point":
      return {
        type: locationType,
        point: randomGeoPoint(),
        maxDeliveryFee: {
          amount: randomMaxDeliveryFee(),
          currency: randomCurrency(),
        },
        pickupType: randomPickupType(),
        country: randomCountry(),
      };
    default:
      return {};
  }
}

function randomMakesAndModels() {
  const makes = Object.keys(MODELS_TO_MAKES);
  const makeIterNum = faker.number.int({ min: 0, max: makes.length });
  let randomMakes = [];
  let randomModels = [];
  for (let i = 0; i < makeIterNum; i++) {
    const randomMake =
      makes[faker.number.int({ min: 0, max: makes.length - 1 })];
    randomMakes.push(randomMake);
    const models = MODELS_TO_MAKES[randomMake];
    const modelIterNum = faker.number.int({
      min: 0,
      max: models.length,
    });
    for (let j = 0; j < modelIterNum; j++) {
      const randomModel =
        models[
          faker.number.int({
            min: 0,
            max: models.length - 1,
          })
        ];
      randomModels.push(randomModel);
    }
  }
  return [randomMakes, randomModels];
}

const [makes, models] = randomMakesAndModels();

export const randomSearchPayload = () => ({
  // com/turo/search/dto/FiltersDto.kt
  filters: {
    location: randomLocationData(randomLocationType()),
    engines: randomEngine(),
    makes: makes,
    models: models,
    dates: randomDates(),
    tmvTiers: randomTVMTiers(),
    features: randomFeatures(),
    types: randomVehicleTypes(),
  },
  sorts: {
    direction: randomSortDirection(),
    type: randomSortType(),
  },
});
