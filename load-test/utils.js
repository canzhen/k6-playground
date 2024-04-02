import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export function getEnvValue(key, defaultValue = "") {
  return __ENV[key] === undefined ? defaultValue : __ENV[key];
}

export function randomRecentDate(pastDays = 100) {
  let now = new Date();
  now.setDate(now.getDate() - randomIntBetween(0, pastDays));
  return now;
}

export function randomFutureStartAndEndDates(
  futureDays = 100,
  durationDays = 60
) {
  let futureStart = new Date();
  futureStart.setDate(
    futureStart.getDate() + randomIntBetween(1, futureDays)
  );
  let futureEnd = new Date();
  futureEnd.setDate(futureStart.getDate() + randomIntBetween(1, durationDays));
  return {
    start: futureStart,
    end: futureEnd,
  };
}
