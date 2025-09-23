import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import styled from "styled-components";

const CartIconContainer = styled(Link)`
  position: relative;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    border: 1px solid rgba(102, 126, 234, 0.3);

    &:hover {
      color: #764ba2;
      background: rgba(118, 75, 162, 0.1);
      border-color: rgba(102, 126, 234, 0.5);
    }
  }
`;

const CartIconSVG = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform 0.3s ease;

  ${CartIconContainer}:hover & {
    transform: scale(1.1);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(238, 90, 36, 0.4);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CartIcon: React.FC = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <CartIconContainer to="/cart">
      <CartIconSVG viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </CartIconSVG>
      {itemCount > 0 && <CartCount>{itemCount}</CartCount>}
    </CartIconContainer>
  );
};

export default CartIcon;
