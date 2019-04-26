import {getRequest, postRequest, postJson} from "../libs/axios";
/**
 *  厂商接口
 */

// 物流
export const expressSave = (params) => {
  return postJson('/business/express/insert', params);
};

export const expressList = (params) => {
  return getRequest('/business/express/search', params);
};

export const expressUpdate = (params) => {
  return postJson('/business/express/update', params);
};

// 品牌
export const brandSave = (params) => {
  return postJson('/business/brand/insert', params);
};

export const brandSelect = (params) => {
  return getRequest('/business/brand/select', params);
};

export const brandList = (params) => {
  return getRequest('/business/brand/search', params);
};

export const brandUpdate = (params) => {
  return postJson('/business/brand/update', params);
};
