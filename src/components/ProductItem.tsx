import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../types/product";

const ProductItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 1rem;
  height: 400px;

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
  /*height: 300px;*/
  height: 80%;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface ProductProps {
  product: Product;
}

const ProductSummaryWrapper = styled.div``;

function ProductItem({ product }: ProductProps) {
  return (
    <ProductItemWrapper to={`/product/${product.id}`}>
      <ProductImageWrapper>
        <ProductImage src={product.image} />
      </ProductImageWrapper>
      <ProductSummaryWrapper>
        <p>{product.title}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>${product.price}</p>
          <p>
            ★{product.rating.rate}&nbsp;({product.rating.count})
          </p>
        </div>
      </ProductSummaryWrapper>
    </ProductItemWrapper>
  );
}

export default ProductItem;
