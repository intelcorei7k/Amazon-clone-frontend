import React from 'react';
import { useStateValue } from '../StateProvider';
import { getBasketTotal, getBasketQuantity } from '../library';
import './styles/Subtotal.css';

function Subtotal() {
  const [{ basket }] = useStateValue();

  return (
    <div className="subtotal">
      <p>
        Totale Provvisorio ({String(getBasketQuantity(basket))} articoli):{' '}
        <strong>{String(getBasketTotal(basket))} €</strong>
      </p>
      <small className="subtotal-gift">
        <input type="checkbox" /> Quest'ordine contiene un regalo
      </small>

      <button>Procedi all'ordine</button>
    </div>
  );
}

export default Subtotal;
