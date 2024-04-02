import {
  randomId,
  randomSearchLocationType,
  randomCurrency,
  randomMaxDeliveryFee,
  randomPickupType,
  randomGeoPoint,
  randomTopRightGeoPoint,
  randomBottomLeftGeoPoint,
  randomSortType,
  randomSortDirection,
  randomEngines,
  randomTVMTiers,
  randomFeatures,
  randomVehicleTypes,
  randomMakesAndModels,
} from "../common.js";
import { randomFutureStartAndEndDates } from "../utils.js";

// com/turo/search/dto/v2/LocationFilterDto.kt
// com/turo/search/dto/LocationFilterDto.kt
function randomLocationData(locationType) {
  const randomCountry = "US"; // for the mvp, we are only testing within US
  switch (locationType) {
    case "area":
      return {
        type: locationType,
        point: randomGeoPoint(),
        country: randomCountry,
      };
    case "boundingbox":
      return {
        type: locationType,
        country: randomCountry,
        bottomLeft: randomBottomLeftGeoPoint(),
        topRight: randomTopRightGeoPoint(),
      };
    case "country":
      return {
        type: locationType,
        country: randomCountry,
      };
    case "poi":
      return {
        type: locationType,
        locationId: randomId(),
        maxDeliveryFee: {
          amount: randomMaxDeliveryFee(),
          currency: randomCurrency(),
        },
        pickupType: randomPickupType(),
        country: randomCountry,
      };
    case "point":
      return {
        type: locationType,
        point: randomGeoPoint(),
        maxDeliveryFee: {
          amount: randomMaxDeliveryFee(),
          currency: randomCurrency,
        },
        pickupType: randomPickupType(),
        country: randomCountry,
      };
    default:
      return {};
  }
}

export const randomSearchPayload = () => {
  const [makes, models] = randomMakesAndModels();
  return {
    // com/turo/search/dto/FiltersDto.kt
    filters: {
      location: randomLocationData(randomSearchLocationType()),
      engines: randomEngines(),
      makes: makes,
      models: models,
      dates: randomFutureStartAndEndDates(),
      tmvTiers: randomTVMTiers(),
      features: randomFeatures(),
      types: randomVehicleTypes(),
    },
    sorts: {
      direction: randomSortDirection(),
      type: randomSortType(),
    },
    searchContext: {
      searchId: randomId(),
    },
  };
};
