import { Avatar, Box, Button, Grid, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import http from '../../../http';
import * as I from '../../../types/pagesTypes/IOrderPage';

const OrderPageProps: NextPage<I.IOrderPageProps> = ({ product }) => {
  const { register, handleSubmit, setValue } = useForm<I.ICreditCard>();

  const onSubmit = async (data: I.ICreditCard) => {
    const { data: order } = await http.post('orders', {
      credit_card: data,
      items: [{ product_id: product.id, quantity: 1 }],
    });
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField {...register('name')} required label='Nome' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField {...register('number')} label='Numero do cartão' required fullWidth inputProps={{ maxLength: 16 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type='number' {...register('cvv')} required label='CVV' fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  type='number'
                  {...register('expiration_month', { valueAsNumber: true })}
                  required
                  label='Expiração mês'
                  fullWidth
                  onChange={(e) => setValue('expiration_month', parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='number'
                  {...register('expiration_year', { valueAsNumber: true })}
                  required
                  label='Expiração ano'
                  fullWidth
                  onChange={(e) => setValue('expiration_year', parseInt(e.target.value))}
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
    throw e;
  }
};
