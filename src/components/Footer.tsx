import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin-top: auto;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
  }

  @media (max-width: 768px) {
    padding: 1.5rem 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;

  @media (max-width: 768px) {
    max-width: none;
    margin: 0;
    padding: 0;
  }
`;

const FooterText = styled.p`
  margin: 0;
  color: #ecf0f1;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0 20px;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; eCommerce Store. All rights reserved.</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
