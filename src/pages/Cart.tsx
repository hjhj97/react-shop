import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, getTotalCartPrice } from "../state/atoms";
import CartItem from "../components/CartItem";
import styled from "styled-components";
import { useMemo, useState } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem 0;
  margin: 0 auto;
  background-color: ;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function Cart() {
  const [cart, setCart] = useRecoilState<any>(cartState);
  const totalPrice = useRecoilValue(getTotalCartPrice);

  return (
    <Container>
      <CartContainer>
        {cart.length > 0 ? cart.map((item: any) => <CartItem key={item.id} product={item} />) : <p>No Item</p>}
        <p>TotalPrice : ${totalPrice}</p>
      </CartContainer>
    </Container>
  );
}

export default Cart;
