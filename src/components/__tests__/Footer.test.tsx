import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders copyright text', () => {
    render(<Footer />);
    
    expect(screen.getByText('© 2024 eCommerce Store. All rights reserved. Made by Marsh Woolgar')).toBeInTheDocument();
  });

  test('renders footer element', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  test('has correct text content', () => {
    render(<Footer />);
    
    const footerText = screen.getByText(/eCommerce Store/);
    expect(footerText).toBeInTheDocument();
    expect(footerText).toHaveTextContent('© 2024 eCommerce Store. All rights reserved. Made by Marsh Woolgar');
  });
});
