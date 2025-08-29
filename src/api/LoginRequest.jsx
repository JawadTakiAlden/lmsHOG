import { request } from "./request";

const LoginRequest = (data) => {
  return request({
    url: "/auth/admin/login",
    method: "post",
    data,
  });
};

export default LoginRequest;
