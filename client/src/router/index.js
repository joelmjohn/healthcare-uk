import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import AdminView from '../views/admin'
import UserList from '../components/Admin/UserList'
import AdminBlog from '../components/Admin/Blogpost'
import AdminBlogCreate from '../components/Admin/Blogpost/createBlog'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/IndexView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutUs.vue')
  },
  ,
  {
    path: '/jobServices',
    name: 'JobServices',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/JobServices.vue')
  },
  {
    path: '/studyAbroad',
    name: 'StudyAbroad',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StudyAbroad.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  }, {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
    ,
    children: [
      {
        path: "userList",
        component: UserList
      }
    ]
  },
  {
    path: '/admin/blogpost',
    name: 'blogpost',
    component: AdminBlog
  },
  {
    path: '/admin/blogpost/create',
    name: 'blogpostCreate',
    component: AdminBlogCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
