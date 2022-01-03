import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { COMMANDS } from '../reducer';
import { getBasketQuantity } from '../library';
import { logout } from '../auth';
import './styles/Header.css';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = (e) => {
    if (user) {
      e.preventDefault();
      logout()
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: COMMANDS.SETUSER,
              item: null,
            });

            dispatch({
              type: COMMANDS.SETTOKEN,
              item: null,
            });
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header-search">
        <input type="text" className="header-search-input" />
        <SearchIcon className="header-search-icon" />
      </div>

      <div className="header-nav">
        <Link to="/login">
          <div onClick={handleAuthentication} className="header-option">
            <span className="header-option-line1">
              Ciao {user ? `${user?.username}` : 'Utente'}
            </span>
            <span className="header-option-line2">
              {user ? 'Esci' : 'Accedi'}
            </span>
          </div>
        </Link>

        <div className="header-option">
          <span className="header-option-line1">Resi</span>
          <span className="header-option-line2">e ordini</span>
        </div>

        <div className="header-option">
          <span className="header-option-line1">Il tuo</span>
          <span className="header-option-line2">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header-option-basket">
            <ShoppingBasketIcon />
            <span className="header-option-line2 header-basket-count">
              {getBasketQuantity(basket)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
