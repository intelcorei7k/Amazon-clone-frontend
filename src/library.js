import axios from 'axios';

export const getBasketQuantity = (basket) =>
  basket?.reduce((amount, item) => item.quantity + amount, 0);

export const getBasketTotal = (basket) =>
  (
    Math.round(
      basket?.reduce((amount, item) => item.price * item.quantity + amount, 0) *
        100
    ) / 100
  ).toFixed(2);

export const basketRemove = (productId, quantity = 1) =>
  axios.post('https://amazonapi.zonia.it/basket/remove', {
    productid: productId,
    quantity: quantity >= 1 ? quantity : 1,
  });

export const basketAdd = (productId, quantity = 1) =>
  axios.post('https://amazonapi.zonia.it/basket/add', {
    productid: productId,
    quantity: quantity >= 1 ? quantity : 1,
  });

export const getProducts = (quantity = 6) =>
  axios.get('https://amazonapi.zonia.it/products', { quantity: quantity });

export const getBasket = () => axios.get('https://amazonapi.zonia.it/basket');
