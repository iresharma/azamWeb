import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/homePage.vue'
import Notes from '../views/notes.vue'
import NotFound from '../views/notFound.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Videos from '../views/videos.vue'
import ViewNote from '../views/viewNote'
import ViewVideo from '../views/viewVideo'
import conCall from '../views/concall.vue'
import teacher from '../views/teacherPanel.vue'
import quiz from '../views/quiz.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos
  },
  {
    path: '/class',
    name: 'concall',
    component: conCall
  },
  {
    path:'/notes/:id',
    name:'Note Viewer',
    component: ViewNote
  },
  {
    path:'/videos/:id',
    name:'Video Viewer',
    component: ViewVideo
  },
  {
    path: '/panel',
    name: 'Teacher Panel',
    component: teacher
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: quiz
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
