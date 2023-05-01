import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.nav<{ bgColor: string }>`
  display: flex;
  gap: 1rem;
  background-color: ${(props: any) => props?.bgColor};
`;
const activestyle = {
  fontWeight: "bold",
};

function Header() {
  return (
    <NavWrapper bgColor="skyblue">
      <NavLink
        to="/"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
          };
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
          };
        }}
      >
        About
      </NavLink>
      <Link to="/product_list">List</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/login">Login</Link>
    </NavWrapper>
  );
}

export default Header;
