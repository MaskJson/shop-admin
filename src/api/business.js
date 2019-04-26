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
