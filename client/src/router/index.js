import Vue from 'vue';
import VueRouter from 'vue-router';
//import HomeView from '../views/HomeView.vue'
import AdminView from '../views/admin';
import UserList from '../components/Admin/userList/index.vue';
import AdminBlog from '../components/Admin/Blogpost';
import AdminBlogCreate from '../components/Admin/Blogpost/createBlog';
import AdminBlogUpdate from '../components/Admin/Blogpost/updateBlog';
import Country from '../components/Admin/Country/index.vue';
import AdminJobs from '../components/Admin/Jobs';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/IndexView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutUs.vue'),
  },
  ,
  {
    path: '/jobServices',
    name: 'JobServices',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/JobServices.vue'),
  },
  {
    path: '/studyAbroad',
    name: 'StudyAbroad',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/StudyAbroad.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Contact.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Blog.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
  {
    path: '/admin/userList',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/admin/country',
    name: 'Country',
    component: Country,
  },
  {
    path: '/admin/blogpost',
    name: 'blogpost',
    component: AdminBlog,
  },
  {
    path: '/admin/blogpost/create',
    name: 'blogpostCreate',
    component: AdminBlogCreate,
  },
  {
    path: '/admin/blogpost/update/:id',
    name: 'blogpostUpdate',
    component: AdminBlogUpdate,
  },
  {
    path: '/admin/jobs',
    name: 'jobs',
    component: AdminJobs,
  },
];
//{ path: '/:NotFound(.*)*', component: NotFound},

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const protectedRoutes = [
  '/admin/blogpost',
  '/admin/userList',
  '/admin/country',
  '/admin/blogpost/create',
  '/admin/blogpost/update',
  '/admin/jobs',
];

router.beforeEach((to, from, next) => {
  const adminId = localStorage.getItem('adminId');
  const adminRole = localStorage.getItem('adminRole');

  if (!adminId && protectedRoutes.includes(to.path)) {
    next('/admin');
  }
  if (adminId && adminRole !== 'SUPERADMIN' && to.path == '/admin/userList') {
    next('/admin');
  } else {
    next();
  }
});

export default router;
