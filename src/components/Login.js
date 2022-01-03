import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { COMMANDS } from '../reducer';
import { login, register } from '../auth';
import './styles/Login.css';

function Login() {
  const history = useHistory();
  const [, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signin = (e) => {
    e.preventDefault();

    login(username, email, password)
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
          history.push('/');
        }
      })
      .catch((error) => error.response && setError(error.response.data.error));
  };

  const signup = (e) => {
    e.preventDefault();

    register(username, email, password)
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
          history.push('/');
        }
      })
      .catch((error) => error.response && setError(error.response.data.error));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login-container">
        <h1>Accedi</h1>
        {error.length > 0 && <h3 className="error">{error}</h3>}
        <form action="">
          <h4>Username</h4>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h4>Email</h4>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h4>Password</h4>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-login-button" onClick={signin}>
            Accedi
          </button>
        </form>

        <p>Accedendo accetti i termini di uso/condizioni di XXXXX.</p>

        <div className="login-register-info">
          <small>
            --------------- Non hai un account? Registrati subito
            ---------------
          </small>
        </div>

        <button className="login-register-button" onClick={signup}>
          Crea il tuo account Amazon
        </button>
      </div>
    </div>
  );
}

export default Login;
