import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #2c3e50 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  
  &:hover {
    color: #f8f9fa;
    transform: scale(1.05);
    transition: all 0.3s ease;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  
  &:hover {
    background-color: rgba(255,255,255,0.15);
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 80%;
  }
`;

const MobileActions = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.3);
    background: transparent;
    color: white;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255,255,255,0.1);
    }
  }
`;

const HamburgerIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity={open ? 0 : 1}/>
    <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
  }
`;

const MobileMenuContent = styled.div`
  @media (max-width: 768px) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 12px 20px 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const MobileLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => setIsMobileMenuOpen(v => !v);
  const closeMobileMenu = (): void => setIsMobileMenuOpen(false);
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/" onClick={closeMobileMenu}>E-Commerce Store</Logo>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Nav>
        <DesktopActions>
          <CartIcon />
        </DesktopActions>
        <MobileActions>
          <CartIcon />
          <HamburgerButton
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-mobile-menu"
            onClick={toggleMobileMenu}
          >
            <HamburgerIcon open={isMobileMenuOpen} />
          </HamburgerButton>
        </MobileActions>
      </HeaderContent>
      {isMobileMenuOpen && (
        <MobileMenu id="site-mobile-menu" role="menu">
          <MobileMenuContent>
            <MobileLinks>
              <NavLink to="/" onClick={closeMobileMenu} role="menuitem">Home</NavLink>
              <NavLink to="/contact" onClick={closeMobileMenu} role="menuitem">Contact</NavLink>
            </MobileLinks>
          </MobileMenuContent>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
