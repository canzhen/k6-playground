import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export function getEnvValue(key, defaultValue = "") {
  return __ENV[key] === undefined ? defaultValue : __ENV[key];
}

export function randomRecentDate(pastDays = 100) {
  let now = new Date();
  now.setDate(now.getDate() - randomIntBetween(1, pastDays));
  return now;
}

export function randomFutureStartAndEndDates(
  futureDays = 100,
  durationDays = 60
) {
  let futureStart = new Date();
  futureStart.setDate(futureStart.getDate() + randomIntBetween(1, futureDays));
  let futureEnd = new Date();
  futureEnd.setDate(futureStart.getDate() + randomIntBetween(1, durationDays));
  return {
    start: futureStart,
    end: futureEnd,
  };
}

export function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error("Items and weights must be of the same size");
  }

  if (!items.length) {
    throw new Error("Items must not be empty");
  }

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return items[itemIndex];
    }
  }
}
