import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createProduct = (formData) => {
  return authenticatedHttp.post('/products', formData)
    .then(response => response.data);
};

export const createAuction = (formData) => {
  return authenticatedHttp.post('/auction', formData)
    .then(response => response.data);
};
