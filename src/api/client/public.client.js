import axios from "axios";
import queryString from "query-string";

const PORT = 9096;
const baseURL = `http://127.0.0.1:${PORT}/api/v1/`;

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request(async (config) => {
  return {
    ...config,
    Headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;