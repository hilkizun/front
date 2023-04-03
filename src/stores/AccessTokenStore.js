const JWT_TOKEN_KEY = 'accessToken';

let _accessToken = localStorage.getItem(JWT_TOKEN_KEY) || ''; // cojo el token del localStorage y envio siempre un string, o bien el valor de access_token o bien ""

export const setAccessToken = (token) => {
  localStorage.setItem(JWT_TOKEN_KEY, token) // seteamos un elemento en localStorage "key" -> value
  _accessToken = token
}

export const getAccessToken = () => {
  return _accessToken // nos devuelve el token del localStorage con la clave accessToken
}

export const logout = () => {
  localStorage.removeItem(JWT_TOKEN_KEY)

  window.location.assign('/login'); // lo "mismo" que el redirect, para redireccionar a /login
}