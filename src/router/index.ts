import { createRouter, createWebHistory } from 'vue-router';
import Tattoist from '@/views/dashboards/Tattoist.vue';
import Login from '@/views/Login.vue';
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: route => ({ tags: route.query.tags })
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login,
  },
    {
        path: '/dashboard/tattoist',
        name: 'TattoistPage',
        component: Tattoist,
    },
    ,
    {
        path: '/search',
        name: 'Search',
        component: SearchView,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
