import axios from 'axios';

export const onAuthStateChanged = () =>
  axios.post('https://auth.zonia.it/refresh');

export const logout = () => axios.post('https://auth.zonia.it/logout');

export const login = (username, email, password) =>
  axios.post('https://auth.zonia.it/login', {
    username: username,
    email: email,
    password: password,
  });

export const register = (username, email, password) =>
  axios.post('https://auth.zonia.it/register', {
    username: username,
    email: email,
    password: password,
  });
