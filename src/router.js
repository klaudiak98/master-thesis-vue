import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import Settings from './components/Settings.vue'
import Admin from './components/Admin.vue'
import BookPage from './components/BookPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authRequired: 'false',
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
      authRequired: 'false',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: BookPage,
    meta: {
      authRequired: 'false',
    },
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //check page is protected or not
  if (to.meta.authRequired === 'true') {

    //get contact's id
    const contactId = to.params.id

    //access check
    if (
      //if user is admin or super admin
      user.role === 'admin' ||
      //if user is the contact itself
      user.id === contactId ||
      //if user is manager and has necessary permissions
      user.role === 'manager' &&
      user.role.permissions.some(p => p.key === 'create-contact') &&
      user.role.permissions.some(p => p.key === 'update-contact')
    ) {
      return next()
    } else {
      router.push({
        name: 'Unauthorized'
      })
    }
  } else {
    return next()
  }
});


export default router