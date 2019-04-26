import {orderStatus} from "./constants";

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}
/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
};
/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 *   全局 util  handler
 */
const data = {
  orderStatus
};
// 通用状态获取   value-label
const statusRender = (value, key, h) => {
  let text = '';
  const list = data[key];
  const index = list.findIndex(item => item.value == value);
  if (index > -1) {
    text = list[index].label;
  }
  return !!h ? h('span', text) : text;
};

// 表格 img render
function imgRender(h, src) {
  return h('img', {
    domProps: {
      src: src,
      title: '点击查看大图'
    },
    class: {
      w100: true,
      'mt-5': true,
      cursor: true
    },
    on: {
      click: () => {
        this.imgName = src;
        this.$refs['img'].toggleShow();
      }
    }
  })
}

// 用户ManagerView
function mgr (key, params, isBatch, unFresh, name) {
  this.$refs[name || 'manager'].emitManagerHandler(key, {
    params,
    isBatch,
    unFresh,
  })
}
// 用于 ModalUtil
function toggle(key, flag) {
  this.$refs[key].toggleShow(flag);
}

// 用于 modal util  隐藏后需 清空 entity
const reset = (o) => {
  Object.keys(o).forEach(key => {
    if (Array.isArray(o[key])) {
      o[key] = [];
    } else if (typeof o[key] == 'object' && o[key] !== null) {
      reset(o[key]);
    } else {
      o[key] = null;
    }
  })
};

export default {
  mgr,
  toggle,
  reset,
  statusRender,
  imgRender
}
