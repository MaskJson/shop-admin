import { postRequest, getRequest, postJson } from "../libs/axios";

/**
 * 商家接口
 */
export const sellerSave = (params) => {
  return postJson('/seller/seller/insert', params);
};

export const sellerList = (params) => {
  return getRequest('/seller/seller/search', params);
};
