import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('App', () => {
  const renderComponent = () => render(<App />);

  it('랜더링 테스트', () => {
    const { getByText } = renderComponent();
    const element = getByText('Hello from Cart!');
    expect(element).toBeInTheDocument();
  });
});
