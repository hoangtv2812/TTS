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

// Default configuration for axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_SERVER, // Ensure VITE_BACKEND_SERVER is defined in your .env
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {

      if (error.response.status === 401) {
        // Redirect to login page for any 401 error
        window.location.replace('/auth/login');
        return Promise.reject(error);
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
