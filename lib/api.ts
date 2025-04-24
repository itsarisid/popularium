import axios from "axios";
const instance = axios.create();

instance.defaults.baseURL = process.env.BASE_URL;

//instance.defaults.timeout = 2500;

instance.defaults.headers.common = {
  "Content-Type": "application/json",
  accept: "json",
};

//instance.defaults.withCredentials=true;

instance.interceptors.request.use(
  (config: any) => {
    //TODO: Request Interceptors
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    //TODO: Response Interceptors
    console.log(">>>>", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const http = instance;

export default http;
