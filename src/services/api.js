import axios from 'axios';

const api = axios.create({
  baseURL : 'https://betheherowiltonprocopio.herokuapp.com',
  //https://betheherowiltonprocopio.herokuapp.com
  //http://localhost:3333
})

export default api;