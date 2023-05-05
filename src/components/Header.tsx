import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import router from "../router";
import styled from "styled-components";

const NavWrapper = styled.nav<{ bgColor: string }>`
  display: flex;
  gap: 1rem;
  background-color: ${(props: any) => props?.bgColor};
`;
const activestyle = {
  fontWeight: "bold",
};

const matched = {
  fontWeight: "bold",
};

function Header() {
  const { pathname: currentPath } = useLocation();
  const isMatch = (path: string) => {
    if (currentPath === path) {
      return matched;
    }
  };
  return (
    <NavWrapper bgColor="skyblue">
      <Link to="/" style={isMatch("/")}>
        Home
      </Link>
      <Link to="/about" style={isMatch("/about")}>
        About
      </Link>
      <Link to="/product_list" style={isMatch("/product_list")}>
        List
      </Link>
      <Link to="/cart" style={isMatch("/cart")}>
        Cart
      </Link>
      <Link to="/login" style={isMatch("/login")}>
        Login
      </Link>
    </NavWrapper>
  );
}

export default Header;
