import React from "react";

export const Link = ({ children, to, ...props }) => {
  return React.createElement("a", { href: to, ...props }, children);
};

export const BrowserRouter = ({ children }) => {
  return React.createElement("div", {}, children);
};

export const Routes = ({ children }) => {
  return React.createElement("div", {}, children);
};

export const Route = ({ children, element, path }) => {
  return React.createElement("div", { "data-path": path }, element || children);
};

export const useNavigate = () => {
  return jest.fn();
};

export const useLocation = () => {
  return { pathname: "/" };
};

export const useParams = () => {
  return {};
};
