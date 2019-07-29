import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import axios from 'axios'

Vue.use(Router)

const routerOptions = [
  { path: '/', component: 'Home' },
  { path: '/about', component: 'About' },
  { path: '/oauth-callback', component: 'Callback'},
  { path: '/oauth-test', component: 'Callbacktest'},
  { path: '/select', component: 'Select', props: true},
  { path: '/checklist/:customerId', component: 'Checklist', props: true,  name: 'Checklist'},
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

export default new Router({
  // routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
  // ]
  routes,
  mode: 'history'
})
