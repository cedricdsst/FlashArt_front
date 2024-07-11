import { createRouter, createWebHistory } from 'vue-router';
import Tattoist from '@/views/dashboards/Tattoist.vue';
import Login from '@/views/Login.vue';
import HomeView from '../views/HomeView.vue';
import SingleTattoo from '@/views/SingleTattoo.vue';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
  {
    path: '/tattoo',
    name: 'SingleTattooPage',
    component: SingleTattoo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
