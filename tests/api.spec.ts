import { test, expect } from '@playwright/test';
import {
  ApiEndpoints,
  ExpectedAirports,
  AirportCodes,
  ExpectedCounts,
  ExpectedDistances
} from '../data/api.data';

interface Airport {
  id: string;
  type: string;
  attributes: {
    name: string;
    city: string;
    country: string;
    iata: string;
    icao: string;
    latitude: string;
    longitude: string;
    altitude: number;
    timezone: string;
  };
}

interface AirportResponse {
  data: Airport[];
}

test.describe('API Tests - Airport Gap', () => {
  // Test variables
  let data: AirportResponse;
  let airportNames: string[];
  const testDistance = ExpectedDistances.KIX_TO_NRT_MIN_KM;
  const testAirportsAmount = ExpectedCounts.TOTAL_AIRPORTS;
  let distance: BigInteger;


  test(`Scenario 1: Verify Airport Count: ${testAirportsAmount}  @api-tests`, async ({ request }) => {

    await test.step('Send GET request to airports endpoint', async () => {
      const response = await request.get(ApiEndpoints.AIRPORTS);
      expect(response.status()).toBe(200);
      data = await response.json();
    });

    await test.step(`Verify response contains exactly 30 airports`, async () => {
      expect(data.data.length).toBe(testAirportsAmount);
    });
  });

  test('Scenario 2: Verify Specific Airports @api-tests', async ({ request }) => {
    await test.step('Send GET request to airports endpoint', async () => {
      const response = await request.get(ApiEndpoints.AIRPORTS);
      expect(response.status()).toBe(200);
      const responseData: AirportResponse = await response.json();

      airportNames = responseData.data.map((airport: Airport) => airport.attributes.name);
    });
    await test.step(`Verify response includes the specified airports: ${ExpectedAirports.AKUREYRI}, ${ExpectedAirports.ST_ANTHONY}, ${ExpectedAirports.CFB_BAGOTVILLE} `, async () => {
      expect(airportNames).toContain(ExpectedAirports.AKUREYRI);
      expect(airportNames).toContain(ExpectedAirports.ST_ANTHONY);
      expect(airportNames).toContain(ExpectedAirports.CFB_BAGOTVILLE);
    });
  });

  test(`Scenario 3: Verify Distance of ${testDistance} Between Airports @api-tests`, async ({ request }) => {

    await test.step('Send GET request to airports endpoint', async () => {
      const testPayload = {
        from: AirportCodes.KIX,
        to: AirportCodes.NRT
      }

      const response = await request.post(ApiEndpoints.DISTANCE, {
        data: testPayload
      });
      expect(response.status()).toBe(200);

      const data = await response.json();
      distance = data.data.attributes.kilometers;
    });

    await test.step(`Verify calculated distance is greater than ${testDistance} km`, async () => {
      expect(distance).toBeGreaterThan(testDistance);
    });
  });

});
