import { screen, fireEvent } from '@testing-library/react';

import fetchMock from 'fetch-mock-jest';

import render from '../../../utils/testRender'
import { store } from '../../../app/store';
import weatherData from './weatherFixtures.json';

import Weather from '../Weather';

describe('Weather', () => {

  test('should render weather app', async () => {
    render(<Weather />, { store });

    screen.getByRole('textbox', { name: /Place zipcode/i });
    screen.getByRole('button', { name: "Search" });
  });

  test('should search zipcode', async () => {

    fetchMock.get('/full-report?zipcode=95630', weatherData);

    render(<Weather />, { store });

    const input = screen.getByPlaceholderText('ZIP code');

    fireEvent.change(input, { target: { value: '95630' } });

    // This fake keypress to allow 100% branches coverage
    fireEvent.keyPress(input, { key: 'Fake', code: 'Fake', charCode: 13 });

    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(await screen.getByAltText('Loading...')).toBeInTheDocument();

    store.dispatch({
      type: 'weather/fetchWeatherData/fulfilled',
      payload: weatherData,
    });

    expect(await screen.getByText('Folsom')).toBeInTheDocument();

    expect(await screen.getByText('few clouds')).toBeInTheDocument();

    // screen.debug();
    fetchMock.restore();
  });

  test('should display error', async () => {

    fetchMock
		  .get('/full-report?zipcode=123456', 500);

    render(<Weather />, { store });

    const input = screen.getByPlaceholderText('ZIP code');

    fireEvent.change(input, { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: "Search" }));

    store.dispatch({
      type: 'weather/fetchWeatherData/rejected',
      error: { message: 'failed' },
    });

    expect(await screen.getByText('failed')).toBeInTheDocument();

    fetchMock.restore();

  });
});
