import React from "react";
import { getProductList } from "../api/product";
import { useQuery } from "react-query";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";

const Container = styled.div`
  width: 100%;
  padding: 2rem 0;
`;

const ProductWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
`;

function ProductList() {
  const { data: productList, isLoading, isError } = useQuery<any>("products", getProductList);
  console.log(productList);
  return (
    <Container>
      {
        <ProductWrapper>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            productList.map((product: any) => <ProductItem key={product.id} product={product} />)
          )}
        </ProductWrapper>
      }
    </Container>
  );
}

export default ProductList;
