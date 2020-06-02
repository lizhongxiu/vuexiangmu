import Vue from 'vue'
import { getUser } from '../utils/storage'
import VueRouter from 'vue-router'
// import Login from '../views/login/index.vue'
const Login = () => import('../views/login/index.vue')
// import home from '../views/home/index.vue'
const home = () => import('../views/home/index.vue')

// import Layout from './../views/layout/index.vue'
const Layout = () => import('../views/layout/index.vue')

// import articles from './../views/articles/index'
const articles = () => import('../views/articles/index.vue')

// import NOTFOUND from './../views/page404/index'
const NOTFOUND = () => import('../views/page404/index.vue')

// import EditArticle from '../views/articles/edit.vue'
const EditArticle = () => import('../views/articles/edit.vue')

// import image from '../views/image/index.vue'
const image = () => import('../views/image/index.vue')

// import AddArticle from '../views/articles/add.vue'
const AddArticle = () => import('../views/articles/add.vue')

// import Comment from '../views/comment/index.vue'
const Comment = () => import('../views/comment/index.vue')

// import fans from '../views/fans/index.vue'
const fans = () => import('../views/fans/index.vue')

// import settings from '../views/settings/index.vue'
const settings = () => import('../views/settings/index.vue')

// import LayoutIndex from './../views/layout/index1.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: home },
      { path: '/articles', component: articles },
      // 编辑文章
      { path: '/editArticle/:id', component: EditArticle },
      { path: '/image', component: image },
      // 发布文章
      { path: '/addArticle', component: AddArticle },
      { path: '/comment', component: Comment },
      { path: '/fans', component: fans },
      { path: '/settings', component: settings }
    ]
  },
  { path: '*', component: NOTFOUND }
  // { path: '/', component: LayoutIndex }

]
const router = new VueRouter({
  routes
})
// 所有路由跳转之前会执行
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === './articles') {
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      next()
    } else {
      console.log('路由导航守卫:你没有登陆，请回去！')
      next('/login')
    }
  } else {
    next()
  }
})
export default router
