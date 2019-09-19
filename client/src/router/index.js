import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import Chatroom from '@/components/Chatroom'
import Forgotpassword from '@/components/Forgotpassword'
import Resetpassword from '@/components/Resetpassword'
import FlashMessage from '@smartweb/vue-flash-message'
Vue.use(FlashMessage)

Vue.use(Router)

function guard (to, from, next) {
  if (localStorage.auth !== 'loggedin') {
    next()
  } else {
    next('/profile')
  }
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      beforeEnter: guard,
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      beforeEnter: guard,
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      component: Chatroom
    },
    {
      path: '/forgot_password',
      name: 'Forgotpassword',
      component: Forgotpassword
    },
    {
      path: '/resetpassword',
      name: 'Resetpassword',
      component: Resetpassword
    }
  ]
})
