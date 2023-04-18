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

export const likeProduct = async (id, type) => {
  const response = await authenticatedHttp.post(`/${id}/like?likeType=${type}`);
  return response;
};

export const unLikeProduct = async (id, type) => {
  const response = await authenticatedHttp.delete(`/${id}/unlike?likeType=${type}`);
  return response;
};

export const fetchUserLikes = async () => {
  const response = await authenticatedHttp.get('/liked');
  return response;
};


