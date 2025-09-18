import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';

// Mock the Header and Footer components
jest.mock('../Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock('../Footer', () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer Component</div>;
  };
});

describe('Layout Component', () => {
  test('renders header, main content, and footer', () => {
    render(
      <Layout>
        <div data-testid="main-content">Main Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('renders children in main section', () => {
    const testContent = 'Test Child Content';
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    );
    
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  test('renders multiple children', () => {
    render(
      <Layout>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
        <div data-testid="child3">Child 3</div>
      </Layout>
    );
    
    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
    expect(screen.getByTestId('child3')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<Layout>Test</Layout>)).not.toThrow();
  });

  test('renders with no children', () => {
    render(<Layout />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
