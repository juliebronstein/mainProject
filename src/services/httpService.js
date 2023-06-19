import axios from "axios";
import config from "./config.json";
import { Alert } from "../layouts/admin/utils/alert";
export const apiPath = config.onlineApi;
axios.interceptors.response.use(
  (res) => {
    if (res.status !== 200 && res.status !== 201){
      if (typeof(res.data) === 'object') {
        let message = "";
        for (const key in res.data) message = message + `${res.data[key]} `;

        res.data.message = message;
      }
    Alert("مشکل ....!", res.data.message, "error");
  }
    return res;
  },
  (error) => {
    Alert("مشکل ....!", "مشکل از طرف سرور رخ داده است", "error");
    return Promise.reject(error);
  }
);
const httpService = (url, method, data = null) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return axios({
    url: config.onlineApi + url,
    method,
    data,
    headers: {
      Authorization: loginToken ? `Bearer ${loginToken.token}` : null,
      "Content-Type": "application/json",
    },
    timeout: 5000,
    timeoutErrorMessage: "Oops... Time Out!",
  });
};
export default httpService;
