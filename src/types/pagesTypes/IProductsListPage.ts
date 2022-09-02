export interface IProduct {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
}

export interface IProductsListPageProps {
  products: IProduct[];
}
