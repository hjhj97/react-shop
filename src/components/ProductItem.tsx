import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductItemWrapper = styled.li`
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 1rem;
  height: 10rem;

  width: calc((100% - 4rem) / 2);
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    a {
    }
  }
`;

const ProductImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: calc(100% - 2rem);
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function ProductItem({ product }: any) {
  return (
    <ProductItemWrapper>
      <ProductImageWrapper>
        <ProductImage src={product.image} />
      </ProductImageWrapper>
      <Link to={`/product/${product.id}`}>{product.title}</Link>
    </ProductItemWrapper>
  );
}

export default ProductItem;
