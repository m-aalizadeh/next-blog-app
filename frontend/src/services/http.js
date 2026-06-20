const { default: axios } = require("axios");

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err),
);
app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          { withCredentials: true },
        );
        if (data) {
          return new app(originalConfig);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  },
);
const http = {
  get: app.get,
  patch: app.patch,
  post: app.post,
  delete: app.delete,
  put: app.put,
};
export default http;
