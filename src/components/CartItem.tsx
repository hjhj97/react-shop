import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { cartState } from "../state/atoms";
import { Product } from "../types/product";

const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`;

const CartItemSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CartImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
`;

const CartImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;

const DeleteButton = styled.button`
  border: none;
  width: 30px;
  height: 30px;
  /*padding: 0.5rem;*/
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Item = styled.span`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

function CartItem({ product, onChangeAmount }: any) {
  const [cart, setCart] = useRecoilState<Product[]>(cartState);

  const onClickDelete = () => {
    setCart(cart.filter((item: Product) => item.id !== product.id));
  };

  return (
    <CartItemWrapper>
      <CartItemSection>
        <CartImageWrapper>
          <div style={{ display: "flex" }}>
            <CartImage src={product.image} />
            <Item>{product.title}</Item>
          </div>
          <DeleteButton onClick={onClickDelete}>X</DeleteButton>
        </CartImageWrapper>
      </CartItemSection>
      <CartItemSection>${product.price}</CartItemSection>
    </CartItemWrapper>
  );
}

export default CartItem;
