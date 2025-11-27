/**
 * API test data for Airport Gap service
 */

export const BaseUrls = {
  SAUCEDEMO: 'https://www.saucedemo.com',
  AIRPORT_GAP_API: 'https://airportgap.com/api'
} as const;

export const ApiEndpoints = {
  AIRPORTS: 'https://airportgap.com/api/airports',
  DISTANCE: 'https://airportgap.com/api/airports/distance'
} as const;

export const ExpectedAirports = {
  AKUREYRI: 'Akureyri Airport',
  ST_ANTHONY: 'St. Anthony Airport',
  CFB_BAGOTVILLE: 'CFB Bagotville'
} as const;

export const AirportCodes = {
  KIX: 'KIX',
  NRT: 'NRT'
} as const;

export const ExpectedCounts = {
  TOTAL_AIRPORTS: 30
} as const;

export const ExpectedDistances = {
  KIX_TO_NRT_MIN_KM: 400
} as const;