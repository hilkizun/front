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

export const getAllProducts = async () => {
  const response = await unauthenticatedHttp.get('/products');
  return response;
};

export const getAllAuctions = async () => {
  const response = await unauthenticatedHttp.get('/auction');
  return response;
};

export const placeBid = async (auctionId, bidAmount) => {
  const response = await authenticatedHttp.post(`/${auctionId}/bid`, { bidAmount });
  return response;
};

export const getHighestBid = async (auctionId) => {
  const response = await unauthenticatedHttp.get(`/auction/${auctionId}/highest-bid`);
  return response;
};

export const getLikedItems = async () => {
  const response = await authenticatedHttp.get('/liked');
  return response;
};

export const getUserProducts = async () => {
  const response = await authenticatedHttp.get('/userproducts');
  return response;
};

export const getUserAuctions = async () => {
  const response = await authenticatedHttp.get('/userauctions');
  return response;
};

export const getWinningProducts = async () => {
  const response = await authenticatedHttp.get('/winnerproducts');
  return response;
};