import axios from "axios";
// import Cookies from "js-cookie";
const client = axios.create({ baseURL: "https://api.houseofgeniuses.tech/api/v1"});
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token_admin_house_of_geniuses')}`;
  return client(options).then((res) => res);
};
