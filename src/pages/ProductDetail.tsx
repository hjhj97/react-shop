import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { cartState } from "../state/atoms";
import { Product } from "../types/product";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 2.5rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  /*width: 100%;*/
  width: 45%;
  /*height: 50%;*/
  max-width: 500px;
`;
const ProductImage = styled.img`
  width: 100%;
  object-fit: contain;
`;
const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 45%;
`;

const ProductTitle = styled.div`
  font-size: 3rem;
`;
const ProductPrice = styled.div`
  font-size: 2rem;
`;
const ProductDescription = styled.div`
  font-size: 1rem;
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /*padding: 2rem 0;*/

  /*border: 1px solid black;*/
  height: 30%;
`;
const AmountWrapper = styled.div`
  height: calc(100% / 2);
  width: 100%;
  /*margin: 0 auto;*/
  & div {
    display: flex;
    width: 50%;
    justify-content: space-between;
  }
`;
const PriceWrapper = styled.div`
  height: calc(100% / 2);
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  width: calc((100% - 1rem) / 2);
  border: none;
  background-color: skyblue;
  height: 4rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  color: white;
  &:hover {
    background-color: white;
    color: skyblue;
    border: 1px solid skyblue;
    cursor: pointer;
  }
`;

function ProductDetail() {
  const { product_id } = useParams<string>();
  const [cart, setCart] = useRecoilState<Product[]>(cartState);
  const { isLoading, data: productDetail } = useQuery<Product>(["detail", product_id], () =>
    getProductDetail(product_id)
  );
  const [amount, setAmount] = useState(1);

  const getTotalPrice = () => {
    return amount * (productDetail?.price || 1);
  };

  const onClickCart = () => {
    setCart((prev: any[]) => {
      return [...prev, productDetail] as any;
    });
    alert("Item added.");
  };
  const onClickBuy = () => {};
  const totalPrice = useMemo(getTotalPrice, [amount, productDetail?.price]);

  return (
    <div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <ProductContainer>
          <ProductDetailWrapper>
            <ImageWrapper>
              <ProductImage src={productDetail?.image} />
            </ImageWrapper>
            <ProductInfoWrapper>
              <ProductTitle>
                <h1>{productDetail?.title}</h1>
              </ProductTitle>
              <ProductPrice>
                <p>${productDetail?.price}</p>
              </ProductPrice>
              <ProductDescription>
                <p>{productDetail?.description}</p>
              </ProductDescription>
              <CartWrapper>
                <AmountWrapper>
                  <div>
                    <button onClick={() => setAmount((prev) => prev - 1)}>-</button>
                    {amount}
                    <button onClick={() => setAmount((prev) => prev + 1)}>+</button>
                  </div>
                </AmountWrapper>
                <PriceWrapper>총가격:${totalPrice}</PriceWrapper>
              </CartWrapper>
              <ButtonWrapper>
                <Button onClick={onClickCart}>장바구니</Button>
                <Button onClick={onClickBuy}>구매하기</Button>
              </ButtonWrapper>
            </ProductInfoWrapper>
          </ProductDetailWrapper>
          <p>ProductInfo</p>
        </ProductContainer>
      )}
    </div>
  );
}

export default ProductDetail;
