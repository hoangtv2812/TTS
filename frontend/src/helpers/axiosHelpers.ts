import axios from 'axios';
// import store from '@redux/store'; // Uncomment and implement if using Redux
// import { fetchRefreshToken } from '@helpers/fetchRefreshToken'; // Uncomment and implement if using token refresh logic

interface AxiosOptions {
  method: 'get' | 'put' | 'post' | 'delete';
  url: string;
  params?: Record<string, unknown>;
  body?: any;
  headers?: Record<string, string>;
}

// Queue to store pending requests while refreshing token
let isRefreshing = false;
const requestQueue: Array<() => Promise<any>> = [];

// Default configuration for axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER, // Ensure VITE_BACKEND_SERVER is defined in your .env
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const processQueue = (error: any = null) => {
  requestQueue.forEach((prom) => {
    if (error) {
      prom().catch(() => {
        // Do nothing
      });
    } else {
      prom();
    }
  });
  requestQueue.length = 0;
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const originalRequest = error.config;

      if (error.response.status == 401) {
        if (error.response.data?.error_message_code != 'token_expired') {
          window.location.replace('/auth/login');
        } else {
          // If already refreshing token, add request to queue
          if (isRefreshing) {
            return new Promise((resolve) => {
              requestQueue.push(() => {
                return instance(originalRequest).then(resolve);
              });
            });
          }

          // Start refreshing token
          isRefreshing = true;

          // Implement fetchRefreshToken logic here if needed
          // For now, redirect to login on 401 token expired
          window.location.replace('/auth/login');
          return Promise.reject(error);
        }
      } else if (error.response.status == 403) {
        window.location.replace('/error-permission');
      } else if (error.response.status == 503) {
        window.location.replace('/maintain');
      }
    }
    return Promise.reject(error);
  },
);

const _axios = async (options: AxiosOptions) => {
  if (!['get', 'put', 'post', 'delete'].includes(options.method)) {
    throw new Error('invalid-method');
  }

  const headers = {
    ...(options.headers || {}),
  };
  // const currentPage = store.getState().pages.currentPage; // Uncomment and implement if using Redux store for page info

  const config = {
    method: options.method,
    url: options.url,
    headers,
    params: {
      ...options.params,
      // current_page_name: currentPage.name, // Uncomment and implement if using Redux store for page info
    },
    ...(options.body && { data: options.body }),
    withCredentials: true,
  };

  return instance(config);
};

export default _axios;
