import { Avatar, Box, Button, Grid, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import http from '../../../http';
import * as I from '../../../types/pagesTypes/IProductDetailPage';
import * as Ipl from '../../../types/pagesTypes/IProductsListPage';

const OrderPageProps: NextPage<I.IOrderPageProps> = ({ product }) => {
  return (
    <div>
      <Head>
        <title>Pagamento</title>
      </Head>
      <Typography component='h1' variant='h3' color='textPrimary' gutterBottom>
        Checkout
      </Typography>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={product.image_url} />
        </ListItemAvatar>
        <ListItemText primary={product.name} secondary={`R$ ${product.price}`} />
      </ListItem>
      <Typography component='h2' variant='h6' gutterBottom>
        Pague com cartão de crédito
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required label='Nome' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type='number' label='Numero do cartão' required fullWidth inputProps={{ maxLength: 16 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required type='number' label='CVV' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  type='number'
                  label='Expiração mês'
                  fullWidth
                  // onChange={(e) => setValue('expiration_month', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  type='number'
                  label='Expiração ano'
                  fullWidth
                  // onChange={(e) => setValue('expiration_year', parseInt(e.target.value))}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box marginTop={1}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Pagar
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default OrderPageProps;

export const getServerSideProps: GetServerSideProps<I.IOrderPageProps, { slug: string }> = async (context) => {
  const { slug } = context.params!;
  try {
    const { data: product } = await http.get(`products/${slug}`);

    return {
      props: {
        product,
      },
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return { notFound: true };
    }
    throw e;
  }
};
