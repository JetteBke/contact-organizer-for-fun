import React from 'react';
import { render} from '@testing-library/react';
import App from './App';

test('renders different routes of the app', () => {
  const wrapper = render(<App />);

  expect(wrapper.getAllByRole("link")).toHaveLength(2);
  expect(wrapper.getByText("Alle Kontakte")).toBeInTheDocument()
  expect(wrapper.getByText("Kontakt hinzufügen")).toBeInTheDocument()
});
