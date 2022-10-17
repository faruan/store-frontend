import * as I from './IProductsListPage';

export interface IOrderPageProps {
  product: I.IProduct;
}

export interface ICreditCard {
  number: string;
  name: string;
  expiration_month: number;
  expiration_year: number;
  cvv: string;
}
