import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalizedWeather3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('axios');

describe('StormGrall client', () => {
    it('should return the normalized forecast from the StormGlass service', async () => {
        const lat = -33.5848745;
        const lng = 115.975434;

        axios.get = jest.fn().mockResolvedValue({ data: stormGlassWeather3HoursFixture });

        const stormGlass = new StormGlass(axios);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual(stormGlassNormalizedWeather3HoursFixture);
    });
});
