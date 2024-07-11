import { createRouter, createWebHistory } from 'vue-router';
import Tattoist from '@/views/dashboards/Tattoist.vue';
import User from '@/views/dashboards/User.vue';
import Login from '@/views/Login.vue';
import HomeView from '../views/HomeView.vue';
import SingleTattoo from '@/views/SingleTattoo.vue';
import SingleTattooist from '@/views/SingleTattooist.vue';
import UserEditProfile from '@/views/user/UserEditProfile.vue';
import UserReservation from '@/views/user/UserReservation.vue';
import SearchView from '../views/SearchView.vue';
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
    meta: { requiresAuth: true, role: 'artist' }
  },
  {
    path: '/tattoo/:flashId',
    name: 'SingleTattooPage',
    component: SingleTattoo,
    props: true
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
    meta: { requiresAuth: true }
  },
  {
    path: '/user/booked',
    name: 'UserBookedPage',
    component: UserReservation,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.userId === null) {
    await authStore.verifyToken();
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!authStore.userId) {
      next({ name: 'LoginPage' });
    } else if (to.meta.role && authStore.role !== to.meta.role) {
      // Check if the user has the required role
      next({ name: 'LoginPage' }); // Redirect to login if the role does not match
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
