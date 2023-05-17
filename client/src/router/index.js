import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminView from '../views/admin';
import UserList from '../components/Admin/UserList/index.vue';
import Country from '../components/Admin/CountryList/index.vue';

Vue.use (VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import ('../views/IndexView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import (/* webpackChunkName: "about" */ '../views/AboutUs.vue'),
  },
  ,
  {
    path: '/jobServices',
    name: 'JobServices',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import (/* webpackChunkName: "about" */ '../views/JobServices.vue'),
  },
  {
    path: '/studyAbroad',
    name: 'StudyAbroad',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import (/* webpackChunkName: "about" */ '../views/StudyAbroad.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import (/* webpackChunkName: "about" */ '../views/Contact.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import (/* webpackChunkName: "about" */ '../views/Blog.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
  {
    path: '/admin/country',
    name: 'Country',
    component: Country,
  },
  {
    path: '/admin/userList',
    name: 'UserList',
    component: UserList,
  }
];

const router = new VueRouter ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
