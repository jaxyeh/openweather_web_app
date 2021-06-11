import { store } from '../../../app/store';

import {
  Status,
  cityNameSelector,
} from '../weatherSlice';

describe('store/weather', () => {

  const fixture = {
    current: {
      current: {
        data: 'current'
      }
    },
    forecast: {
      city: {
        name: 'somecity'
      },
      data: 'forecast'
    }
  };

  test('weather/fetchWeatherData/pending', () => {
    store.dispatch({ type: 'weather/fetchWeatherData/pending' });

    const { status } = store.getState().weather;
    expect(status).toBe(Status.Loading);
  });

  test('weather/fetchWeatherData/rejected', () => {
    store.dispatch({
      type: 'weather/fetchWeatherData/rejected',
      error: { message: 'failed' },
    });

    const { status, errorMessage } = store.getState().weather;
    expect(status).toBe(Status.Failed);
    expect(errorMessage).toBe('failed');
  });

  test('weather/fetchWeatherData/fulfilled', () => {
    store.dispatch({
      type: 'weather/fetchWeatherData/fulfilled',
      payload: fixture,
    });

    const {
      status,
      currentData,
      forecastData,
    } = store.getState().weather;
    expect(status).toBe(Status.Idle);
    expect(currentData).toBe(fixture.current.current);
    expect(forecastData).toBe(fixture.forecast);
  });


  test('weather/cityNameSelector', () => {
    store.dispatch({
      type: 'weather/fetchWeatherData/fulfilled',
      payload: fixture,
    });

    const state = store.getState();

    expect(cityNameSelector(state)).toEqual('somecity');
  });
});
