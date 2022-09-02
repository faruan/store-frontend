import * as I from './types/pagesTypes/IProductsListPage';

export const products: I.IProduct[] = [
  {
    id: 'uuid',
    name: 'produto teste',
    description: 'muito muito texto',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
    slug: 'produto-teste',
    created_at: '2021-06-06T00:00:00',
  },
  {
    id: 'uuid2',
    name: 'produto teste2222',
    description: 'muito muito texto2222',
    price: 50.52,
    image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
    slug: 'produto-teste2222',
    created_at: '2021-06-06T00:00:00',
  },
];
