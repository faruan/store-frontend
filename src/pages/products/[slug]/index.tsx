import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import http from '../../../http';
import * as I from '../../../types/pagesTypes/IProductDetailPage';
import * as Ipl from '../../../types/pagesTypes/IProductsListPage';

const ProductDetailPage: NextPage<I.IProductDetailPageProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Head>
        <title>{product.name} - Detalhes do produto</title>
      </Head>
      <Card>
        <CardHeader title={product.name.toUpperCase()} subheader={`R$ ${product.price}`} />
        <CardActions>
          <Link href='/products/[slug]/order' as={`/products/${product.slug}/order`} passHref>
            <Button size='small' color='primary' component='a'>
              Comprar
            </Button>
          </Link>
        </CardActions>
        <CardMedia style={{ paddingTop: '56%' }} image={product.image_url} />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps<I.IProductDetailPageProps, { slug: string }> = async (context) => {
  const { slug } = context.params!;
  try {
    const { data: product } = await http.get(`products/${slug}`);
    return {
      props: {
        product,
      },
      revalidate: 1 * 60 * 2,
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }
    throw e;
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data: products } = await http.get(`products`);
  const paths = products.map((p: Ipl.IProduct) => ({
    params: { slug: p.slug },
  }));
  return { paths, fallback: 'blocking' };
};
