import type { NextApiRequest, NextApiResponse } from 'next';
import { products } from '../../../model';
import * as I from '../../../types/pagesTypes/IProductsListPage';

export default function handler(req: NextApiRequest, res: NextApiResponse<I.IProduct[]>) {
  res.status(200).json(products);
}
