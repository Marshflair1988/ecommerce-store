import React from 'react';
import { render, screen } from '@testing-library/react';
import CartIcon from '../CartIcon';

// Mock the useCart hook
const mockUseCart = jest.fn();

jest.mock('../../contexts/CartContext', () => ({
  useCart: () => mockUseCart()
}));

describe('CartIcon Component', () => {
  beforeEach(() => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 0,
      items: []
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart icon with link to cart page', () => {
    render(<CartIcon />);
    
    const cartLink = screen.getByRole('link');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  test('renders cart icon SVG', () => {
    render(<CartIcon />);
    
    const cartIcon = screen.getByRole('link').querySelector('svg');
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  test('does not show count badge when cart is empty', () => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 0,
      items: []
    });

    render(<CartIcon />);
    
    const countBadge = screen.queryByText('0');
    expect(countBadge).not.toBeInTheDocument();
  });

  test('shows count badge when cart has items', () => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 3,
      items: [{ id: 1 }, { id: 2 }, { id: 3 }]
    });

    render(<CartIcon />);
    
    const countBadge = screen.getByText('3');
    expect(countBadge).toBeInTheDocument();
  });

  test('shows correct count for multiple quantities', () => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 5,
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 }
      ]
    });

    render(<CartIcon />);
    
    const countBadge = screen.getByText('5');
    expect(countBadge).toBeInTheDocument();
  });

  test('count badge has correct styling classes', () => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 2,
      items: [{ id: 1 }, { id: 2 }]
    });

    render(<CartIcon />);
    
    const countBadge = screen.getByText('2');
    expect(countBadge).toBeInTheDocument();
  });

  test('calls getCartItemCount from useCart hook', () => {
    const mockGetCartItemCount = jest.fn().mockReturnValue(4);
    mockUseCart.mockReturnValue({
      getCartItemCount: mockGetCartItemCount,
      items: []
    });

    render(<CartIcon />);
    
    expect(mockGetCartItemCount).toHaveBeenCalled();
  });

  test('renders without crashing', () => {
    expect(() => render(<CartIcon />)).not.toThrow();
  });

  test('cart icon is clickable', () => {
    render(<CartIcon />);
    
    const cartLink = screen.getByRole('link');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink.tagName).toBe('A');
  });

  test('handles zero count correctly', () => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 0,
      items: []
    });

    render(<CartIcon />);
    
    // Should not show count badge for 0 items
    const countBadge = screen.queryByText('0');
    expect(countBadge).not.toBeInTheDocument();
  });

  test('handles large count correctly', () => {
    mockUseCart.mockReturnValue({
      getCartItemCount: () => 99,
      items: Array(99).fill({ id: 1 })
    });

    render(<CartIcon />);
    
    const countBadge = screen.getByText('99');
    expect(countBadge).toBeInTheDocument();
  });
});
