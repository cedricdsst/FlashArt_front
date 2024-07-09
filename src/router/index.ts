import { createRouter, createWebHistory } from 'vue-router';
import Tattoist from '@/views/dashboards/Tattoist.vue';
import Home from '@/views/Home.vue';

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home,
    // },
    {
        path: '/dashboard/tattoist',
        name: 'TattoistPage',
        component: Tattoist,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
