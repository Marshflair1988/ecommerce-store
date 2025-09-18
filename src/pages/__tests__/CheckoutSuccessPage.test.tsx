import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutSuccessPage from '../CheckoutSuccessPage';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the useCart hook
const mockClearCart = jest.fn();
jest.mock('../../contexts/CartContext', () => ({
  useCart: () => ({
    clearCart: mockClearCart
  })
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the ToastProvider for tests
const TestWrapper = ({ children }) => (
  <ToastProvider>
    {children}
  </ToastProvider>
);

describe('CheckoutSuccessPage Component', () => {
  beforeEach(() => {
    mockClearCart.mockClear();
    mockNavigate.mockClear();
  });

  test('renders success message', () => {
    render(<CheckoutSuccessPage />, { wrapper: TestWrapper });
    
    expect(screen.getByText('Order Successful!')).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your purchase/)).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  test('clears cart on component mount', () => {
    render(<CheckoutSuccessPage />, { wrapper: TestWrapper });
    
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  test('continue shopping button navigates to home page', () => {
    render(<CheckoutSuccessPage />, { wrapper: TestWrapper });
    
    const continueButton = screen.getByText('Continue Shopping');
    fireEvent.click(continueButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('renders without crashing', () => {
    expect(() => render(<CheckoutSuccessPage />)).not.toThrow();
  });
});

