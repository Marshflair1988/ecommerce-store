import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock the CartIcon component
jest.mock('../CartIcon', () => {
  return function MockCartIcon() {
    return <div data-testid="cart-icon">Cart Icon</div>;
  };
});

// Mock the useCart hook
jest.mock('../../contexts/CartContext', () => ({
  useCart: () => ({
    getCartItemCount: () => 0,
    items: []
  })
}));

describe('Header Component', () => {
  test('renders header with logo', () => {
    render(<Header />);
    
    const logo = screen.getByText('E-Commerce Store');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  test('renders navigation links', () => {
    render(<Header />);
    
    const homeLink = screen.getByText('Home');
    const contactLink = screen.getByText('Contact');
    
    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('renders cart icon', () => {
    render(<Header />);
    
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveTextContent('Cart Icon');
  });

  test('has correct navigation structure', () => {
    render(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3); // Logo + Home + Contact
  });

  test('logo is clickable and navigates to home', () => {
    render(<Header />);
    
    const logo = screen.getByText('E-Commerce Store');
    expect(logo.tagName).toBe('A');
    expect(logo).toHaveAttribute('href', '/');
  });

  test('navigation links are clickable', () => {
    render(<Header />);
    
    const homeLink = screen.getByText('Home');
    const contactLink = screen.getByText('Contact');
    
    expect(homeLink.tagName).toBe('A');
    expect(contactLink.tagName).toBe('A');
  });

  test('renders without crashing', () => {
    expect(() => render(<Header />)).not.toThrow();
  });
});
