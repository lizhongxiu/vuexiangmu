import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
// import Layout from './../views/layout/index.vue'
import LayoutIndex from './../views/layout/index1.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  // { path: '/', component: Layout },
  { path: '/', component: LayoutIndex }

]
const router = new VueRouter({
  routes
})

export default router
