import {getRequest, postJson, postRequest} from "../libs/axios";

/**
 *  订单接口
 */

// order
export const orderList = (params) => {
  return getRequest('/order/order/search', params);
};
