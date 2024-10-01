import axios from "axios";
// import Cookies from "js-cookie";
import CryptoJS from 'crypto-js';
import i18next from "i18next";

// const baseURL = "https://api.houseofgeniuses.tech/api/v1"
const baseURL = "https://api.houseofgeniuses.tech/api/v2"
// const baseURL = "http://127.0.0.1:8000/api/v1"

const client = axios.create({ baseURL });
export const request = async ({ ...options }) => {
  // const {token} = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('token_admin_house_of_geniuses'), "26_@Jawad0909@_19").toString(CryptoJS.enc.Utf8));
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token_admin_house_of_geniuses')}`;
  options.url = options.url + `?ln=${i18next.language}`
  return client(options).then((res) => res);
};
