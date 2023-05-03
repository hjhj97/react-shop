import React, { useCallback, useState } from "react";
import { getProductList } from "../api/product";
import { useQuery } from "react-query";
import styled from "styled-components";
import ProductItem from "../components/ProductItem";
import { debounce } from "lodash";
import { Product, SortType } from "../types/product";

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
  const [sorted, setSorted] = useState<Product[]>([]);
  const [currentFilter, setCurrentFilter] = useState<SortType>(SortType.DEFAULT);
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
  let { data, isLoading } = useQuery<any>("products", getProductList, {
    onSuccess: (res: Product[]) => setSorted(res),
  });

  const getSearch = (word: string) => {
    return new Promise<Product[]>((resolve, reject) => {
      const filtered = sorted.filter((item: Product) => item.title.includes(word));
      resolve(filtered);
    });
  };

  const onClickFilter = (TYPE: SortType) => {
    setCurrentFilter(TYPE);
    const res = data.sort((a: Product, b: Product) => {
      switch (TYPE) {
        case SortType.DEFAULT: {
          return a.id - b.id;
        }
        case SortType.LOW_PRICE: {
          return a.price - b.price;
        }
        case SortType.HIGH_PRICE: {
          return b.price - a.price;
        }
        case SortType.HIGH_RATING: {
          return b.rating.rate - a.rating.rate;
        }
        case SortType.MANY_REIVEWS: {
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
          $on={currentFilter === SortType.DEFAULT}
          onClick={() => {
            onClickFilter(SortType.DEFAULT);
          }}
        >
          Default
        </FilterButton>
        <FilterButton
          $on={currentFilter === SortType.LOW_PRICE}
          onClick={() => {
            onClickFilter(SortType.LOW_PRICE);
          }}
        >
          LowPrice
        </FilterButton>
        <FilterButton
          $on={currentFilter === SortType.HIGH_PRICE}
          onClick={() => {
            onClickFilter(SortType.HIGH_PRICE);
          }}
        >
          HightPrice
        </FilterButton>
        <FilterButton
          $on={currentFilter === SortType.HIGH_RATING}
          onClick={() => {
            onClickFilter(SortType.HIGH_RATING);
          }}
        >
          HighRating
        </FilterButton>
        <FilterButton
          $on={currentFilter === SortType.MANY_REIVEWS}
          onClick={() => {
            onClickFilter(SortType.MANY_REIVEWS);
          }}
        >
          ManyReviews
        </FilterButton>
      </FileterWrapper>

      <ProductWrapper>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          sorted.map((product: Product) => <ProductItem key={product.id} product={product} />)
        )}
      </ProductWrapper>
    </Container>
  );
}

export default ProductList;
