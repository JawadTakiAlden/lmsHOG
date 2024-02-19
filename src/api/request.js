import axios from "axios";
// import Cookies from "js-cookie";
import CryptoJS from 'crypto-js';

const client = axios.create({ baseURL: "https://api.houseofgeniuses.tech/api/v1"});
export const request = async ({ ...options }) => {
  const {token} = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('token_admin_house_of_geniuses'), "26_@Jawad0909@_19").toString(CryptoJS.enc.Utf8));
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  return client(options).then((res) => res);
};
