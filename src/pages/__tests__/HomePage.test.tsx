import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';

// Mock the Product and SearchBar components
jest.mock('../../components/Product', () => {
  return function MockProduct({ product }) {
    return <div data-testid={`product-${product.id}`}>{product.title}</div>;
  };
});

jest.mock('../../components/SearchBar', () => {
  return function MockSearchBar({ onSearch }) {
    return <div data-testid="search-bar">Search Bar</div>;
  };
});

describe('HomePage Component', () => {
  test('shows loading state initially', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<HomePage />)).not.toThrow();
  });
});
