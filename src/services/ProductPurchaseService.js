import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createProductPurchase = (formData) => {
  return authenticatedHttp.post('/purchase', formData)
    .then(response => response.data);
};

export const updateProductPurchase = (id, formData) => {
  return authenticatedHttp.put(`/purchase/${id}`, formData)
    .then(response => response.data);
};

export const getProductPurchaseById = async (id) => {
  const response = await authenticatedHttp.get(`/purchase/${id}`);
  return response.data;
};

export const getAllProductPurchases = async () => {
  const response = await authenticatedHttp.get('/purchase');
  return response.data;
};
