import React, { useState } from 'react';
import { useStateValue } from '../StateProvider';
import { COMMANDS } from '../reducer';
import { basketAdd, basketRemove } from '../library';
import './styles/CheckoutProduct.css';

function CheckoutProduct({ id, image, title, price, rating, quantity }) {
  const [{ accessToken }, dispatch] = useStateValue();
  const [remove, setRemove] = useState(1);
  const [add, setAdd] = useState(1);

  const removeFromBasket = (e = null, isAll = false) => {
    e && e.preventDefault();

    accessToken
      ? basketRemove(id, isAll ? 999 : remove)
          .then((res) => {
            res.status === 200 &&
              dispatch({
                type: COMMANDS.BASKETREMOVE,
                id: id,
                quantity: isAll ? 999 : remove >= 1 ? remove : 1,
              });
          })
          .catch((error) => console.log(error))
      : dispatch({
          type: COMMANDS.BASKETREMOVE,
          id: id,
          quantity: isAll ? 999 : remove >= 1 ? remove : 1,
        });
  };

  const addToBasket = (e = null) => {
    e && e.preventDefault();

    accessToken
      ? basketAdd(id, add)
          .then((res) => {
            res.status === 200 &&
              dispatch({
                type: COMMANDS.BASKETADD,
                quantity: add >= 1 ? add : 1,
                item: {
                  id: id,
                  imageUrl: image,
                  title: title,
                  price: price,
                  rating: rating,
                },
              });
          })
          .catch((error) => {})
      : dispatch({
          type: COMMANDS.BASKETADD,
          id: id,
          quantity: add >= 1 ? add : 1,
          item: {
            id: id,
            imageUrl: image,
            title: title,
            price: price,
            rating: rating,
          },
        });
  };

  return (
    <div className="checkout-product">
      <img className="checkout-product-image" src={image} alt="" />

      <div className="checkout-product-info-container">
        <div className="checkout-product-info">
          <p className="checkout-product-title">{title}</p>

          <p className="checkout-product-price">
            <strong>{((price * 100) / 100).toFixed(2)}</strong>
            <small> €</small>
          </p>

          <div className="checkout-product-rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={id}>⭐</p>
              ))}
          </div>

          <p className="checkout-product-quantity">
            <small>Quantita: </small>
            <strong>{quantity}</strong>
          </p>

          <div className="checkout-product-change-quantity">
            <div className="checkout-product-remove-quantity">
              <a href="" className="remove-link" onClick={removeFromBasket}>
                Rimuovi
              </a>
              <input
                type="number"
                onChange={(e) =>
                  parseInt(e.target.value) > 0 &&
                  parseInt(e.target.value) < 1000 &&
                  setRemove(parseInt(e.target.value))
                }
                value={remove}
              />
            </div>

            <div className="checkout-product-add-quantity">
              <a href="" className="add-link" onClick={addToBasket}>
                Aggiungi
              </a>
              <input
                type="number"
                onChange={(e) =>
                  parseInt(e.target.value) > 0 &&
                  parseInt(e.target.value) < 1000 &&
                  setAdd(parseInt(e.target.value))
                }
                value={add}
              />
            </div>
          </div>
        </div>
        <button onClick={(e) => removeFromBasket(e, true)}>
          Rimuovi dal Carrello
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
