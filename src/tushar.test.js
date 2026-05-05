import { render, screen } from '@testing-library/react';
import App from './tushar';

test('renders portfolio identity and primary sections', () => {
  render(<App />);

  expect(screen.getAllByText(/Tushar Vijayvargiya/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Senior iOS Developer/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: /App Store products/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Cravingly/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: /Send Email/i })).toBeInTheDocument();
});
