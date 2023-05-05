import React from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import router from "../router";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { UserInfo, userState } from "../state/user";

const NavWrapper = styled.nav<{ bgColor: string }>`
  display: flex;
  gap: 1rem;
  background-color: ${(props: any) => props?.bgColor};
`;

const matched = {
  fontWeight: "bold",
};

function Header() {
  const { pathname: currentPath } = useLocation();
  const [user, setUser] = useRecoilState<UserInfo>(userState);
  const isMatch = (path: string) => {
    if (currentPath === path) {
      return matched;
    }
  };
  const onClickLogout = () => {
    alert("Logout");
    setUser({} as UserInfo);
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
      {user?.id ? (
        <p>Hello {user.name?.firstname}!</p>
      ) : (
        <Link to="/login" style={isMatch("/login")}>
          Login
        </Link>
      )}
      {user?.id && <p onClick={onClickLogout}>Logout</p>}
    </NavWrapper>
  );
}

export default Header;
