import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../../model';
import * as I from '../../../types/pagesTypes/IProductsListPage';

export default function handler(req: NextApiRequest, res: NextApiResponse<I.IProduct>) {
  const { slug } = req.query;
  const product = products.find((p) => p.slug === slug);
  res.status(200).json(product!);
}
