import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { LayoutProps } from "../types";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
