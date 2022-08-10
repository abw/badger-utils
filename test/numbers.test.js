import test from 'ava';
import {
  commas, price, priceOrPOA, priceOrZero, pounds
} from '../src/index.js'

// commas
test(
  'commas(123)',
  t => t.is(commas(123), '123')
);
test(
  'commas(12345)',
  t => t.is(commas(12345), '12,345')
);
test(
  'commas(12345.67)',
  t => t.is(commas(12345.67), '12,345.67')
);
test(
  'commas(12345.67, " ")',
  t => t.is(commas(12345.67, " "), '12 345.67')
);


// price
test(
  'price(12345)',
  t => t.is(price(12345), '£12,345.00')
);
test(
  'price(12345.67)',
  t => t.is(price(12345.67), '£12,345.67')
);
test(
  'price(12345.678)',
  t => t.is(price(12345.678), '£12,345.68')
);
test(
  'price(12345.678, { thousands: " " })',
  t => t.is(price(12345.678, { thousands: " " }), '£12 345.68')
);
test(
  'price(12345.678, { currency: "$" })',
  t => t.is(price(12345.678, { currency: "$" }), '$12,345.68')
);

// priceOrPOA
test(
  'priceOrPOA(12345)',
  t => t.is(priceOrPOA(12345), '£12,345.00')
);
test(
  'priceOrPOA(0)',
  t => t.is(priceOrPOA(0), '£POA')
);
test(
  'priceOrPOA(undefined)',
  t => t.is(priceOrPOA(undefined), '£POA')
);
test(
  'priceOrPOA(0, { poa: "Please Call" })',
  t => t.is(priceOrPOA(0, { poa: "Please Call" }), '£Please Call')
);
test(
  'priceOrPOA(12345.678, { thousands: " " })',
  t => t.is(priceOrPOA(12345.678, { thousands: " " }), '£12 345.68')
);
test(
  'priceOrPOA(0, { currency: "$", poa: "TBA" })',
  t => t.is(priceOrPOA(0, { currency: "$", poa: "TBA" }), '$TBA')
);

// priceOrZero
test(
  'priceOrZero(12345)',
  t => t.is(priceOrZero(12345), '£12,345.00')
);
test(
  'priceOrZero(0)',
  t => t.is(priceOrZero(0), '£0.00')
);
test(
  'priceOrZero(undefined)',
  t => t.is(priceOrZero(undefined), '£0.00')
);
test(
  'priceOrZero(12345.678, { thousands: " " })',
  t => t.is(priceOrZero(12345.678, { thousands: " " }), '£12 345.68')
);
test(
  'priceOrZero(0, { currency: "$" })',
  t => t.is(priceOrZero(0, { currency: "$", poa: "TBA" }), '$0.00')
);


// pounds
test(
  'pounds(12345)',
  t => t.is(pounds(12345), '£12,345')
);
test(
  'pounds(12345.67)',
  t => t.is(pounds(12345.67), '£12,345')
);
test(
  'pounds(0)',
  t => t.is(pounds(0), '')
);
test(
  'pounds(12345, { currency: "$", thousands: " "})',
  t => t.is(pounds(12345, { currency: "$", thousands: " "}), '$12 345')
);

