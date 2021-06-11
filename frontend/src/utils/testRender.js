import React from 'react';
import { render as testRender } from '@testing-library/react';
import { Provider } from 'react-redux';

export default function render(jsx, { store, ...otherOpts }) {
  return testRender(<Provider store={store}>{jsx}</Provider>, otherOpts);
}
