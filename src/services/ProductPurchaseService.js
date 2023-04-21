import { createHttp } from './BaseService';

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const createProductPurchase = async (formData) => {
  const response = await authenticatedHttp.post('/purchase', formData);
      return response;
};

export const updateProductPurchase = (id, formData) => {
  return authenticatedHttp.patch(`/purchase/${id}`, formData)
    .then(response => response.data);
};

export const getProductPurchaseById = async (id) => {
  const response = await authenticatedHttp.get(`/purchase/${id}`);
  return response;
};

export const getAllProductPurchases = async () => {
  const response = await authenticatedHttp.get('/purchase');
  return response;
};

export const deleteProductPurchase = async (id) => {
  const response = await authenticatedHttp.delete(`/purchase/${id}`);
  return response;
};
