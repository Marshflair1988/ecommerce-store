import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 4rem 0;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem auto;
  font-size: 3rem;
  color: white;
  box-shadow: 0 20px 40px rgba(46, 204, 113, 0.3);
  animation: bounce 1s ease-in-out;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }
`;

const SuccessTitle = styled.h1`
  color: #1a1a1a;
  margin-bottom: 1rem;
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SuccessMessage = styled.p`
  color: #6c757d;
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  font-weight: 400;
`;

const BackToStoreButton = styled.button`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1.25rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
`;

const CheckoutSuccessPage: React.FC = () => {
  const { clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the cart when the user reaches the checkout success page
    clearCart();
    
    // Show success toast
    addToast({
      type: 'success',
      message: 'Order completed successfully! Thank you for your purchase.',
      duration: 5000
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once

  const handleContinueShopping = (): void => {
    navigate('/');
  };

  return (
    <SuccessContainer>
      <SuccessIcon>✓</SuccessIcon>
      <SuccessTitle>Order Successful!</SuccessTitle>
      <SuccessMessage>
        Thank you for your purchase! Your order has been successfully placed and will be processed shortly.
        You will receive a confirmation email with your order details.
      </SuccessMessage>
      <BackToStoreButton 
        onClick={handleContinueShopping}
        type="button"
      >
        Continue Shopping
      </BackToStoreButton>
    </SuccessContainer>
  );
};

export default CheckoutSuccessPage;
