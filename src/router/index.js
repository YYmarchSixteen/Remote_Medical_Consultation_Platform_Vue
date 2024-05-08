import {
  createRouter,
  createWebHistory
} from 'vue-router'

//引入布局组件
import Layout from '../views/Layout/index.vue'

const routes = [{
  path: '/',
  name: 'docHome',
  hidden: true,
  meta: {
    name: '医生登录'
  },
  component: () => import('../views/Login/Login_doctor.vue'),
  children: []
},
  {
    path: '/user/login',
    name: 'userHome',
    hidden: true,
    meta: {
      name: '用户登录'
    },
    component: () => import('../views/Login/Login_user.vue'),
    children: []
  },
  {
    path: '/user/register',
    name: 'userRegister',
    hidden: true,
    meta: {
      name: '用户注册'
    },
    component: () => import('../views/Login/register_user.vue'),
    children: []
  },
  {
    path: '/user/myReserve',
    name: 'myReserve',
    hidden: true,
    meta: {
      name: '我的预约'
    },
    component: () => import('../views/User/myReserve.vue'),
    children: []
  },
  {
    path: '/user/emr',
    name: 'myEmr',
    hidden: true,
    meta: {
      name: '我的病历'
    },
    component: () => import('../views/User/emr.vue'),
    children: []
  },
  {
    path: '/user/prescription',
    name: 'myPrescription',
    hidden: true,
    meta: {
      name: '我的处方'
    },
    component: () => import('../views/User/prescription.vue'),
    children: []
  },
  {
    path: '/user/doctorInfo',
    name: 'doctorInfo',
    hidden: true,
    meta: {
      name: '医生详情'
    },
    component: () => import('../views/User/doctorInfo.vue'),
    children: []
  },
  {
    path: '/user/userIndex',
    name: 'userIndex',
    hidden: true,
    meta: {
      name: '用户首页'
    },
    component: () => import('../views/User/userIndex.vue'),
    children: []
  },
  {
    path: '/user/message',
    name: 'userMsg',
    hidden: true,
    meta: {
      name: '用户聊天'
    },
    component: () => import('../views/User/message.vue'),
    children: []
  },
  {
    path: '/user/medicine',
    name: 'userMedicine',
    hidden: true,
    meta: {
      name: '全部药品'
    },
    component: () => import('../views/User/medicine.vue'),
    children: []
  },
  {
    path: '/user/detail',
    name: 'medicineDetail',
    hidden: true,
    meta: {
      name: '详情'
    },
    component: () => import('../views/User/detail.vue'),
    children: []
  },
  {
    path: '/user/personal',
    name: 'userPersonal',
    hidden: true,
    meta: {
      name: '用户个人信息'
    },
    component: () => import('../views/User/personal.vue'),
    children: []
  },
  {
    path: '/user/doctor',
    name: 'doctorList',
    hidden: true,
    meta: {
      name: '全部医生'
    },
    component: () => import('../views/User/doctorList.vue'),
    children: []
  },
  {
    path: '/user/cart',
    name: 'doctorCart',
    hidden: true,
    meta: {
      name: '购物车'
    },
    component: () => import('../views/User/shoppingCart.vue'),
    children: []
  },
  {
    path: '/user/order',
    name: 'doctorOrder',
    hidden: true,
    meta: {
      name: '我的订单'
    },
    component: () => import('../views/User/order.vue'),
    children: []
  },
  {
    path: '/user/reserve',
    name: 'reserve',
    hidden: true,
    meta: {
      name: '预约医生'
    },
    component: () => import('../views/User/reserve.vue'),
    children: []
  },
  {
    path: '/user/comment',
    name: 'comment',
    hidden: true,
    meta: {
      name: '医生评价'
    },
    component: () => import('../views/User/comment.vue'),
    children: []
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    hidden: true,
    meta: {
      name: '管理员登录'
    },
    component: () => import('../views/Login/Login_admin.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    hidden: true,
    meta: {
      name: '注册'
    },
    //按需加载
    component: () => import('../views/Login/Reg.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    hidden: true,
    meta: {
      name: '404页面'
    },
    //按需加载
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/admin/Doctor',
    name: 'adminDoctor',
    meta: {
      name: '医生管理'
    },
    component: Layout, // 使用布局组件
    children: [
      {
        path: '',
        component: () => import('../views/Admin/doctor.vue')
      }
    ]
  },
  {
    path: '/admin/user',
    name: 'adminUser',
    meta: {
      name: '用户管理'
    },
    component: Layout, // 使用布局组件
    children: [
      {
        path: '',
        component: () => import('../views/Admin/user.vue')
      }
    ]
  },
  {
    path: '/admin/admin',
    name: 'adminAdmin',
    component: Layout, // 使用布局组件
    meta: {
      name: '管理员管理'
    },
    children: [
      {
        path: '',
        component: () => import('../views/Admin/admin.vue')
      }
    ]
  },
  {
    path: '/admin/personal',
    name: 'adminPersonal',
    meta: {
      name: '个人信息管理'
    },
    component: Layout, // 使用布局组件
    children: [
      {
        path: '',
        component: () => import('../views/Admin/personal.vue')
      }
    ]
  },
  {
    path: '/admin/notice',
    name: 'adminNotice',
    meta: {
      name: '公告管理'
    },
    component: Layout, // 使用布局组件
    children: [
      {
        path: '',
        component: () => import('../views/Admin/notice.vue')
      }
    ]
  },
  {
    path: '/admin/store',
    name: 'adminStore',
    meta: {
      name: '商城管理'
    },
    component: Layout, // 使用布局组件
    children: [
      {
        path: '',
        component: () => import('../views/Admin/store.vue')
      }
    ]
  },
  {
    path: '/Doctor/patient',
    name: 'doctorPatient',
    hidden: true,
    meta: {
      name: '医生病人管理'
    },
    component: () => import('@/views/Doctor/patient.vue')
  },
  {
    path: '/Doctor/reserve',
    name: 'doctorReserve',
    hidden: true,
    meta: {
      name: '医生预约管理'
    },
    component: () => import('@/views/Doctor/reserve.vue')
  },
  {
    path: '/Doctor/register',
    name: 'DoctorRegister',
    hidden: true,
    meta: {
      name: '医生注册'
    },
    component: () => import('../views/Login/register_doctor.vue'),
    children: []
  },
  {
    path: '/Doctor/personal',
    name: 'doctorPersonal',
    hidden: true,
    meta: {
      name: '医生个人信息管理'
    },
    component: () => import('@/views/Doctor/personal.vue')
  },
  {
    path: '/Doctor/message',
    name: 'doctorMessage',
    hidden: true,
    meta: {
      name: '医生聊天'
    },
    component: () => import('@/views/Doctor/messageList.vue')
  },
  {
    path: '/Doctor/emr',
    name: 'doctorEmr',
    hidden: true,
    meta: {
      name: '医生写病历'
    },
    component: () => import('@/views/Doctor/emr.vue')
  },
  {
    path: '/Doctor/prescription',
    name: 'doctorPrescription',
    hidden: true,
    meta: {
      name: '医生写处方'
    },
    component: () => import('@/views/Doctor/prescription.vue')
  },
  {
    path: '/Doctor/article',
    name: 'doctorArticle',
    hidden: true,
    meta: {
      name: '医生写文章'
    },
    component: () => import('@/views/Doctor/article.vue')
  },
  {
    path: '/Doctor/comment',
    name: 'doctorComment',
    hidden: true,
    meta: {
      name: '医生查看评价'
    },
    component: () => import('@/views/Doctor/comment.vue')
  },

  {
    path: '/news1',
    name: 'news1',
    hidden: true,
    meta: {
      name: 'news1',
      require: true
    },
    component: () => import('../views/User/News/news1.vue')
  },
  {
    path: '/news2',
    name: 'news2',
    hidden: true,
    meta: {
      name: 'news2',
      require: true
    },
    component: () => import('../views/User/News/news2.vue')
  },
  {
    path: '/news3',
    name: 'news3',
    hidden: true,
    meta: {
      name: 'news3',
      require: true
    },
    component: () => import('../views/User/News/news3.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')
  if (to.meta.require && !username) {
    // 如果当前用户未登录且要跳转的页面需要登录，则跳转到登录页面
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})
export default router