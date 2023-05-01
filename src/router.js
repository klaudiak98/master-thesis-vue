import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import Settings from './components/Settings.vue'
import Admin from './components/Admin.vue'
import BookPage from './components/BookPage.vue'

const ROLES = {
  "User": 100,
  "Admin":777
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authRequired: 'true',
      allowedRoles: [ROLES.User]
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      authRequired: 'true',
      allowedRoles: [ROLES.User]
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authRequired: 'true',
      allowedRoles: [ROLES.User]
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      authRequired: 'true',
      allowedRoles: [ROLES.Admin]
    },
  },
  {
    path: '/book/:bookId',
    name: 'Book',
    component: BookPage,
    meta: {
      authRequired: 'true',
      allowedRoles: [ROLES.User]
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired === 'true') {

    const user = localStorage.getItem('user');
    if (!user) {
      next('/login')
    } 

    if (to.meta.allowedRoles) {
      const userRoles = JSON.parse(user).roles
      const allowedRoles = to.meta.allowedRoles

      if (userRoles.find(role => allowedRoles.includes(role))) {
        return next();
      } else {
        return next('/')
      }
    }
    return next()

  } else {
    return next()
  }
});

export default router