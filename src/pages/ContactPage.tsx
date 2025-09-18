import React, { useState } from 'react';
import styled from 'styled-components';
import { ContactFormData, ContactFormErrors } from '../types';
import { useToast } from '../contexts/ToastContext';

const ContactContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const PageTitle = styled.h1`
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  text-align: center;
  color: #6c757d;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  font-weight: 400;
`;

const ContactForm = styled.form`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

interface InputProps {
  hasError?: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e1e8ed'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#667eea'};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

const TextArea = styled.textarea<InputProps>`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e1e8ed'};
  border-radius: 12px;
  font-size: 1rem;
  min-height: 140px;
  resize: vertical;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#667eea'};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.25rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    subject: '',
    email: '',
    body: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { addToast } = useToast();

  const validateForm = (): boolean => {
    console.log('🔍 Validating contact form...');
    const newErrors: ContactFormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      console.log('❌ Full name validation failed: required');
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters long';
      console.log('❌ Full name validation failed: too short');
    } else {
      console.log('✅ Full name validation passed');
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      console.log('❌ Subject validation failed: required');
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long';
      console.log('❌ Subject validation failed: too short');
    } else {
      console.log('✅ Subject validation passed');
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      console.log('❌ Email validation failed: required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        console.log('❌ Email validation failed: invalid format');
      } else {
        console.log('✅ Email validation passed');
      }
    }

    // Body validation - FIXED: Changed from 3 to 10 characters minimum
    if (!formData.body.trim()) {
      newErrors.body = 'Message body is required';
      console.log('❌ Body validation failed: required');
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Message body must be at least 10 characters long';
      console.log('❌ Body validation failed: too short');
    } else {
      console.log('✅ Body validation passed');
    }

    const isValid = Object.keys(newErrors).length === 0;
    console.log('📋 Form validation result:', { isValid, errorCount: Object.keys(newErrors).length });
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('📝 Contact form submission attempted');
    
    if (validateForm()) {
      console.log('✅ Form validation passed, logging form data:', formData);
      
      // Show success message
      setIsSubmitted(true);
      
      // Show success toast
      addToast({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you soon.',
        duration: 5000
      });
      
      // Reset form
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: ''
      });
      
      // Clear errors
      setErrors({});
      console.log('🎉 Form submitted successfully, form reset');
    } else {
      console.log('❌ Form validation failed, submission blocked');
      
      // Show error toast
      addToast({
        type: 'error',
        message: 'Please fix the validation errors before submitting.',
        duration: 4000
      });
    }
  };

  return (
    <ContactContainer>
      <PageTitle>Contact Us</PageTitle>
      <PageSubtitle>Get in touch with us. We'd love to hear from you!</PageSubtitle>
      
      <ContactForm onSubmit={handleSubmit}>
        {isSubmitted && (
          <SuccessMessage>
            Thank you for your message! We'll get back to you soon.
          </SuccessMessage>
        )}
        
        <FormGroup>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            hasError={!!errors.fullName}
            placeholder="Enter your full name"
          />
          {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Subject *</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            hasError={!!errors.subject}
            placeholder="Enter subject"
          />
          {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            hasError={!!errors.email}
            placeholder="Enter your email address"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="body">Message *</Label>
          <TextArea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            hasError={!!errors.body}
            placeholder="Enter your message"
          />
          {errors.body && <ErrorMessage>{errors.body}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">
          Send Message
        </SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default ContactPage;
