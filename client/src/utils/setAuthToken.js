import axios from 'axios';

//  when token is fetched from the database, we wanna then send the token with every request
// if no token we want to delete it from the headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['authorization'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
