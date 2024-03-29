import { useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

const useAxios = () => {
  const [axiosError, setAxiosError] = useState();

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      const refreshUrl = '/auth/refresh_token';

      // we previously called the refresh token api
      if (originalConfig.url === refreshUrl) {
        return null;
      }
      // we made an api call that failed due to an expired access token. This was also the first time making the api call
      if (error.response.status === 401 && !originalConfig.done) {
        originalConfig.done = true;
        await axiosInstance.post(refreshUrl);
        return axiosInstance(originalConfig);
      }

      setAxiosError({
        code: error.response.status,
        statusText: error.response.data.error,
      });

      return Promise.reject(error);
    }
  );

  return { axiosInstance, axiosError, setAxiosError };
};

export default useAxios;
