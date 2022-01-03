import React from 'react';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../StateProvider';
import './styles/Checkout.css';

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout-left">
        <div className="checkout-fill-wallet">
          <button>Scopri di più</button>
          <p>
            <strong>
              Approfitta di questa offerta prova: buono sconto di 6€ con 60€ di
              ricarica.{' '}
            </strong>
            Un altro pratico metodo di pagamento su Amazon.it, utile per gestire
            il proprio budget.
          </p>
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/29/gc/2019/Evergreen_ASV/IT_ASV_Piggy_Logo_123x100._CB465702586_.png"
            alt=""
            className="checkout-ad"
          />
        </div>

        <div className="checkout-basket">
          <h2 className="checkout-title">Carrello</h2>

          {basket?.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              image={item.imageUrl}
              title={item.title}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>

      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
