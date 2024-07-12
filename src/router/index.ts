import { createRouter, createWebHistory } from 'vue-router';
import Tattoist from '@/views/dashboards/Tattoist.vue';
import User from '@/views/dashboards/User.vue';
import Login from '@/views/Login.vue';
import HomeView from '../views/HomeView.vue';
import SingleTattoo from '@/views/SingleTattoo.vue';
import SingleTattooist from '@/views/SingleTattooist.vue';
import UserEditProfile from '@/views/user/UserEditProfile.vue';
import UserReservation from '@/views/user/UserReservation.vue';
import SearchView from '../views/SearchView.vue'
import { useAuthStore } from '@/stores/authStore';

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: route => ({ tags: route.query.tags }),
      
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login,
  },
  {
    path: '/dashboard/user',
    name: 'UserPage',
    component: User,
    meta: { requiresAuth: true, role: 'client' },
  },
  {
    path: '/dashboard/tattoist',
    name: 'TattoistPage',
    component: Tattoist,
    meta: { requiresAuth: true, role: 'artist' },
  },
  {
    path: '/tattoo',
    name: 'SingleTattooPage',
    component: SingleTattoo,
  },
  {
    path: '/tattooist',
    name: 'SingleTattooistPage',
    component: SingleTattooist,
  },
  {
    path: '/user/edit',
    name: 'UserEditInformationPage',
    component: UserEditProfile,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
},
  {
    path: '/user/booked',
    name: 'UserBookedPage',
    component: UserReservation,
  },
    
  
    
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  document.title = to.meta.title || 'FlashArt';
  if (!authStore.userId) {
    await authStore.verifyToken();
  }

  const requiresAuth = to.meta.requiresAuth;
  const userRole = authStore.role;
  const isAuthenticated = authStore.userId ? true : false;

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'LoginPage' });
  } else if (requiresAuth && to.meta.role && to.meta.role !== userRole) {
    next({ name: 'home' }); 
  } else {
    next(); 
  }
});


export default router;
