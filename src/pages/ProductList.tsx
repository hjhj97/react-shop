import React, { useCallback, useState } from "react";
import { getProductList } from "../api/product";
import { useQuery } from "react-query";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import { debounce } from "lodash";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div``;

const ProductWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
`;

const FileterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const FilterButton = styled.span<{ $on: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => (props.$on ? "white" : "skyblue")};
  background-color: ${(props) => (props.$on ? "skyblue" : "white")};
  padding: 0.4rem;
  border: 1px solid skyblue;
  border-radius: 20px;
  &:hover {
    background-color: skyblue;
    color: white;
    cursor: pointer;
  }
`;

function ProductList() {
  const [sorted, setSorted] = useState<any>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("DEFAULT");
  const [inputText, setInputText] = useState<string>("");
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    searchDebounce(inputText);
  };
  const searchDebounce = useCallback(
    debounce(async (inputText: string) => {
      const res = await getSearch(inputText);
      setSorted([...res]);
    }, 200),
    [inputText]
  );
  let { data, isLoading } = useQuery<any>("products", getProductList, { onSuccess: (res) => setSorted(res) });

  const getSearch = (word: string) => {
    return new Promise<any[]>((resolve, reject) => {
      const filtered = sorted.filter((item: any) => item.title.includes(word));
      resolve(filtered);
    });
  };

  const onClickFilter = (TYPE: string) => {
    setCurrentFilter(TYPE);
    const res = data.sort((a: any, b: any) => {
      switch (TYPE) {
        case "DEFAULT": {
          return a.id - b.id;
        }
        case "LOW_PRICE": {
          return a.price - b.price;
        }
        case "HIGH_PRICE": {
          return b.price - a.price;
        }
        case "HIGH_RATING": {
          return b.rating.rate - a.rating.rate;
        }
        case "MANY_REVIEWS": {
          return b.rating.count - a.rating.count;
        }
        default: {
          return a.id - b.id;
        }
      }
    });
    setSorted([...res]);
  };

  return (
    <Container>
      <SearchWrapper>
        <input type="text" value={inputText} onInput={onInput} />
      </SearchWrapper>
      <FileterWrapper>
        <FilterButton
          $on={currentFilter === "DEFAULT"}
          onClick={() => {
            onClickFilter("DEFAULT");
          }}
        >
          Default
        </FilterButton>
        <FilterButton
          $on={currentFilter === "LOW_PRICE"}
          onClick={() => {
            onClickFilter("LOW_PRICE");
          }}
        >
          LowPrice
        </FilterButton>
        <FilterButton
          $on={currentFilter === "HIGH_PRICE"}
          onClick={() => {
            onClickFilter("HIGH_PRICE");
          }}
        >
          HightPrice
        </FilterButton>
        <FilterButton
          $on={currentFilter === "HIGH_RATING"}
          onClick={() => {
            onClickFilter("HIGH_RATING");
          }}
        >
          HighRating
        </FilterButton>
        <FilterButton
          $on={currentFilter === "MANY_REVIEWS"}
          onClick={() => {
            onClickFilter("MANY_REVIEWS");
          }}
        >
          ManyReviews
        </FilterButton>
      </FileterWrapper>

      <ProductWrapper>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          sorted.map((product: any) => <ProductItem key={product.id} product={product} />)
        )}
      </ProductWrapper>
    </Container>
  );
}

export default ProductList;
