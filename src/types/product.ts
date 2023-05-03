export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export enum SortType {
  DEFAULT = "DEFAULT",
  LOW_PRICE = "LOW_PRICE",
  HIGH_PRICE = "HIGH_PRICE",
  HIGH_RATING = "HIGH_RATING",
  MANY_REIVEWS = "MANY_REVIEWS",
}
