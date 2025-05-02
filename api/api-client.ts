
import axios, { AxiosError, HttpStatusCode } from "axios";
const instance = axios.create();

instance.defaults.baseURL = process.env.BASE_URL;

instance.defaults.timeout = 2500;

instance.defaults.headers.common = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  "Content-Type": "application/json",
  accept: "json",
};

instance.interceptors.request.use(
  (config) => {
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

const Http = instance;
export type HttpError = typeof AxiosError;

export { Http, HttpStatusCode };