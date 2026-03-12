import { render, screen } from '@testing-library/react';

import App from './App';

test('renders without crashing and shows search input', () => {
  render(<App />);
  expect(screen.getByRole('searchbox', { name: /search icons/i })).toBeInTheDocument();
});
