import { createHttp } from './BaseService';

const http = createHttp(false);

export const login = ({ email, password }) => http.post('/login', { email, password })
export const signup = ({ email, password, firstName, lastName }) => http.post('/users', { email, password, firstName, lastName })