import { createRouter, createWebHistory } from 'vue-router';
import Tattoist from '@/views/dashboards/Tattoist.vue';
import User from '@/views/dashboards/User.vue';
import Login from '@/views/Login.vue';
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import { useAuthStore } from '@/stores/authStore';

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
        meta: { requiresAuth: true, role: 'artist' },
    },
    {
      path: '/dashboard/user',
      name: 'UserPage',
      component: User,
      meta: { requiresAuth: true, role: 'client' },
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


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // Vérifier si l'utilisateur est authentifié
      if (!authStore.userId) {
          next({ name: 'LoginPage' });
      } else if (to.meta.role && authStore.role !== to.meta.role) {
          // Vérifier si l'utilisateur a le rôle requis
          next({ name: 'home' }); // Ou une autre route pour gérer les accès refusés
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router;
