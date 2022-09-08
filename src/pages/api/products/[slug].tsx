import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../../model';
import * as I from '../../../types/pagesTypes/IProductsListPage';

export default function handler(req: NextApiRequest, res: NextApiResponse<I.IProduct | { message: string }>) {
  const { slug } = req.query;
  const product = products.find((p) => p.slug === slug);
  product ? res.status(200).json(product!) : res.status(404).json({ message: 'Product not found' });
}
