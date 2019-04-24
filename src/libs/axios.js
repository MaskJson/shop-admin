import axios from 'axios'
import config from '@/config'
import router from '../router/index'
import {Message} from 'iview'
import Cookies from 'js-cookie'

function getStore(key) {
  return localStorage.getItem(key);
}

function setStore(key, value) {
  localStorage.setItem(key, value);
}

// 统一请求路径前缀
let base = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev;
// 超时设定
axios.defaults.timeout = 15000;

axios.interceptors.request.use(config => {
  let accessToken = getStore('accessToken');
  Object.assign(config.headers, {
    'token': accessToken
  })
  return config;
}, err => {
  Message.error('请求超时');
  return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
  const data = response.data;
  // 根据返回的code值来做不同的处理(和后端约定)
  if (data) {
    switch (data.code) {
      case 400:
        Message.error(data.message || '请求处理异常');
        return Promise.reject(data.data);
        break;
      case 401:
      case 403:
        Message.error(data.message || '未登录或登录超时');
        // 未登录 清除已登录状态
        Cookies.set('userInfo', '');
        setStore('accessToken', '');
        router.push('/login');
        break;
      default:
        return Promise.resolve(data.data);
    }
  }
  return Promise.reject(data.data);
}, (err) => {
  // 返回状态码不为200时候的错误处理
  Message.error(err.toString());
  return Promise.reject(err);
});

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
  });
};

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
};

export const postJson = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
};

export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    params: params,
  });
};

export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params: params,
  });
};

