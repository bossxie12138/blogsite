import {
  UiHome,
  About,
  Archive,
  UiCollect,
  Detail,
  Register,
  Login,
  NotFound,
  UserInfo,
  UserMsg
} from '../pages'

export const outRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/404',
    component: NotFound
  }
]

export const mainRoutes = [
  {
    menu: true,
    icon: '#icon-Homeloan',
    title: '首页',
    path: '/ui/index',
    component: UiHome
  },
  {
    menu: true,
    icon: '#icon-xiangmuguidang',
    title: '归档',
    path: '/ui/archive',
    component: Archive
  },
  {
    menu: true,
    icon: '#icon-shoucang',
    title: '收藏',
    path: '/ui/collection',
    component: UiCollect
  },
  {
    menu: true,
    icon: '#icon-zuozhe',
    title: '关于作者',
    path: '/ui/about',
    component: About
  },
  {
    path: '/ui/detail/:id',
    component: Detail
  },
  {
    path: '/ui/userinfo',
    component: UserInfo
  },
  {
    path: '/ui/message',
    component: UserMsg
  }
]
