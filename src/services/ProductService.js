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

export const getProduct = async (id) => {
  const response = await unauthenticatedHttp.get(`/products/${id}`);
  return response;
};

export const getAuction = async (id) => {
    const response = await unauthenticatedHttp.get(`/auction/${id}`);
    return response;
  };

export const likeProduct = async (id) => {
  const response = await authenticatedHttp.post(`/${id}/like`);
  return response;
};

export const unLikeProduct = async (id) => {
    const response = await authenticatedHttp.post(`/${id}/unlike`);
    return response;
  };



