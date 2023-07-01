'use client'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import axios from '../api/axios'
import useRefreshToken from './useRefreshToken'

const useAxiosPrivate = () => {
const {auth} = useAuth()
const refresh = useRefreshToken()
useEffect(() => {
    if (auth?.accessToken) {
      const requestIntercept = axios.interceptors.request.use(
        (config) => {
              if (!config.headers["Authorization"]) {
                config.headers[
                  "Authorization"
                ] = `Bearer ${auth?.accessToken?.token}`;}
                return config;
        },
        (error) => Promise.reject(error)
      );

      const responseIntercept = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(prevRequest);
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axios.interceptors.request.eject(requestIntercept);
        axios.interceptors.response.eject(responseIntercept);
      };
    }
  }, [auth, refresh]);

  return axios;
}

export default useAxiosPrivate