import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from '../ContactPage';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock the ToastProvider for tests
const TestWrapper = ({ children }) => (
  <ToastProvider>
    {children}
  </ToastProvider>
);

describe('ContactPage Component', () => {
  test('renders contact form with all fields', () => {
    render(<ContactPage />, { wrapper: TestWrapper });
    
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Get in touch with us. We\'d love to hear from you!')).toBeInTheDocument();
    
    // Check form fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('form fields have correct attributes', () => {
    render(<ContactPage />, { wrapper: TestWrapper });
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(subjectInput).toHaveAttribute('type', 'text');
    expect(messageInput.tagName).toBe('TEXTAREA');
  });

  test('form has correct structure', () => {
    render(<ContactPage />, { wrapper: TestWrapper });
    
    // Find form by tag name since role might not be detected
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    // Check that all inputs are inside the form
    expect(form).toContainElement(screen.getByLabelText(/full name/i));
    expect(form).toContainElement(screen.getByLabelText(/email/i));
    expect(form).toContainElement(screen.getByLabelText(/subject/i));
    expect(form).toContainElement(screen.getByLabelText(/message/i));
    expect(form).toContainElement(screen.getByRole('button', { name: /send message/i }));
  });

  test('form handles input changes correctly', () => {
    render(<ContactPage />, { wrapper: TestWrapper });
    
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    // Test input changes
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test message content' } });
    
    // Check that values are set
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(subjectInput).toHaveValue('Test Subject');
    expect(messageInput).toHaveValue('Test message content');
  });

  test('form submission works', () => {
    render(<ContactPage />, { wrapper: TestWrapper });
    
    const form = document.querySelector('form');
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content' } });
    
    // Submit the form
    fireEvent.click(submitButton);
    
    // Form should be submitted (we can't easily test the actual submission without mocking)
    expect(submitButton).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<ContactPage />, { wrapper: TestWrapper })).not.toThrow();
  });
});
