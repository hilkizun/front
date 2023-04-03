import axios from 'axios';
import { getAccessToken, logout } from '../stores/AccessTokenStore';

const INVALID_STATUS_CODES = [401];

export const createHttp = (useAccessToken = false) => { // Si le pongo true, manda el token si le pone false no hay cabecera Authorization
  const http = axios.create({
    baseURL: 'http://localhost:3000',
  })

  http.interceptors.request.use(
    (config) => {
      if (useAccessToken && getAccessToken()) { // Si alguien crea una instancia de createHttp pasando useAccesToken a true, quiere decir que esa peticion requiere esta autenticada. Por lo que intento coger el token de la store y meterselo en la cabecera Authorization
        config.headers.Authorization = `Bearer ${getAccessToken()}`
      }

      return config
    },
    err => Promise.reject(err)
  )

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // if (error && err.response && err.response.status) // Codigo equivalente
      if (error?.response?.status && INVALID_STATUS_CODES.includes(error.response.status)) { // Si tengo un error 401, probablemente movida de JWT. Borro el token y te llevo al login
        if (getAccessToken()) {
          logout()

          // if (window.location.pathname !== "/login") {
          //   window.location.assign("/login");
          // }
        }
      }

      return Promise.reject(error)
    }
  )

  return http;
}
