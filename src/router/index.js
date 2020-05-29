import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from './../views/layout/index.vue'
import { getUser } from '../utils/storage'
import articles from './../views/articles/index'
import NOTFOUND from './../views/page404/index'
import EditArticle from '../views/articles/edit.vue'
import image from '../views/image/index.vue'
import AddArticle from '../views/articles/add.vue'
// import LayoutIndex from './../views/layout/index1.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/articles', component: articles },
      // 编辑文章
      { path: '/editArticle/:id', component: EditArticle },
      { path: '/image', component: image },
      // 发布文章
      { path: '/addArticle', component: AddArticle }

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
  if (to.path === '/') {
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
