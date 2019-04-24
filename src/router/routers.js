import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/sys',
    name: 'sys',
    meta: {
      title: '系统管理',
      noCache: true,
      icon: 'ios-settings'
    },
    component: Main,
    children: [
      {
        path: 'sys-user',
        name: 'sys-user',
        meta: {
          title: '系统用户管理',
          noCache: true,
          icon: 'ios-settings'
        },
        component: () => import('@/view/sys/sys-user/SysUser.vue')
      },
      {
        path: 'sys-menu',
        name: 'sys-menu',
        meta: {
          title: '系统菜单管理',
          noCache: true,
          icon: 'ios-settings'
        },
        component: () => import('@/view/sys/sys-menu/SysMenu.vue')
      },
      {
        path: 'sys-role',
        name: 'sys-role',
        meta: {
          title: '系统角色管理',
          noCache: true,
          icon: 'ios-settings'
        },
        component: () => import('@/view/sys/sys-role/SysRole.vue')
      }
    ]
  },
  {
    path: '/seller',
    name: 'seller',
    component: Main,
    meta: {
      title: '商家管理',
      notCache: true,
      icon: 'ios-settings'
    },
    children: [
      {
        path: 'seller-manager',
        name: 'seller-manager',
        component: () => import('@/view/seller/seller-manager/SellerManager.vue'),
        meta: {
          title: '商家管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      {
        path: 'seller-edit',
        name: 'seller-edit',
        component: () => import('@/view/seller/seller-edit/SellerEdit.vue'),
        meta: {
          title: '商家编辑',
          notCache: true,
          icon: 'ios-settings'
        }
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Main,
    meta: {
      title: '订单管理',
      notCache: true,
      icon: 'ios-settings'
    },
    children: [
      {
        path: 'order-manager',
        name: 'order-manager',
        component: () => import('@/view/order/order-manager/OrderManager.vue'),
        meta: {
          title: '订单管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      {
        path: 'order-express',
        name: 'order-express',
        component: () => import('@/view/order/order-express/OrderExpress.vue'),
        meta: {
          title: '订单物流',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      // {
      //   path: 'order-coupon',
      //   name: 'order-coupon',
      //   component: () => import('@/view/order/order-coupon/OrderCoupon.vue'),
      //   meta: {
      //     title: '优惠券',
      //     notCache: true,
      //     icon: 'ios-settings'
      //   }
      // },
    ]
  },
  {
    path: '/product',
    name: 'product',
    component: Main,
    meta: {
      title: '商品管理',
      notCache: true,
      icon: 'ios-settings'
    },
    children: [
      {
        path: 'category-manager',
        name: 'category-manager',
        component: () => import('@/view/product/category-manager/CategoryManager.vue'),
        meta: {
          title: '类目管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      {
        path: 'product-manager',
        name: 'product-manager',
        component: () => import('@/view/product/product-manager/ProductManager.vue'),
        meta: {
          title: '商品管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      {
        path: 'product-edit',
        name: 'product-edit',
        component: () => import('@/view/product/product-edit/ProductEdit.vue'),
        meta: {
          title: '商品编辑',
          notCache: true,
          icon: 'ios-settings'
        }
      },
    ]
  },
  {
    path: '/business',
    name: 'business',
    component: Main,
    meta: {
      title: '厂商管理',
      notCache: true,
      icon: 'ios-settings'
    },
    children: [
      {
        path: 'brand-manager',
        name: 'brand-manager',
        component: () => import('@/view/business/brand-manager/BrandManager.vue'),
        meta: {
          title: '品牌管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      {
        path: 'brand-edit',
        name: 'brand-edit',
        component: () => import('@/view/business/brand-edit/BrandEdit.vue'),
        meta: {
          title: '品牌编辑',
          notCache: true,
          icon: 'ios-settings'
        }
      },
      {
        path: 'express-manager',
        name: 'express-manager',
        component: () => import('@/view/business/express-manager/ExpressManager.vue'),
        meta: {
          title: '物流管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
    ]
  },
  {
    path: '/customer',
    name: 'customer',
    component: Main,
    meta: {
      title: '会员管理',
      notCache: true,
      icon: 'ios-settings'
    },
    children: [
      {
        path: 'customer-manager',
        name: 'customer-manager',
        component: () => import('@/view/customer/customer-manager/CustomerManager.vue'),
        meta: {
          title: '会员管理',
          notCache: true,
          icon: 'ios-settings'
        }
      },
    ]
  },
]
