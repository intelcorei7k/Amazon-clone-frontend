import React from 'react';
import { useStateValue } from '../StateProvider';
import { COMMANDS } from '../reducer';
import { basketAdd } from '../library';
import './styles/Product.css';

function Product({ id, title, image, price, rating }) {
  const [{ accessToken }, dispatch] = useStateValue();

  const addToBasket = () => {
    accessToken
      ? basketAdd(id)
          .then((res) => {
            res.status === 200 &&
              dispatch({
                type: COMMANDS.BASKETADD,
                item: {
                  id: id,
                  title: title,
                  imageUrl: image,
                  price: price,
                  rating: rating,
                },
                quantity: 1,
              });
          })
          .catch((error) => {})
      : dispatch({
          type: COMMANDS.BASKETADD,
          item: {
            id: id,
            title: title,
            imageUrl: image,
            price: price,
            rating: rating,
          },
          quantity: 1,
        });
  };

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>€</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>

      <img className="product-image" src={image} alt="product" />

      <button className="product-button" onClick={addToBasket}>
        Aggiungi al carrello
      </button>
    </div>
  );
}

export default Product;
