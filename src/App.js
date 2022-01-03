import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Home, Checkout, Login } from './components';
import { useStateValue } from './StateProvider';
import { onAuthStateChanged } from './auth';
import { getBasket } from './library';
import { COMMANDS } from './reducer';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [{ accessToken }, dispatch] = useStateValue();

  useEffect(() => {
    if (!accessToken)
      onAuthStateChanged()
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: COMMANDS.SETUSER,
              item: res.data.user,
            });

            dispatch({
              type: COMMANDS.SETTOKEN,
              item: res.data.accessToken,
            });
          }
        })
        .catch((error) => {});
    else {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      getBasket()
        .then((res) => {
          res.status === 200
            ? dispatch({
                type: COMMANDS.SETBASKET,
                item: res.data,
              })
            : res.status === 204 &&
              dispatch({
                type: COMMANDS.SETBASKET,
                item: [],
              });
        })
        .catch((error) => {});
    }
  }, [accessToken]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
