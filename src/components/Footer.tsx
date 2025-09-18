import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%,  #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin-top: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  color: #ecf0f1;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const Footer: React.FC = () => {
  console.log('🦶 Footer component rendered');
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; 2024 eCommerce Store. All rights reserved. Made by Marsh Woolgar</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
