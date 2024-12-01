import { createRouter, createWebHistory } from 'vue-router'; // Vue 3 Router import 방식
import HomeView from '../views/HomeView.vue';
import ShoppingCartView from '../views/ShoppingCartView.vue';
import PaymentCompleteView from '../views/PaymentCompleteView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/shoppingcart', component: ShoppingCartView },
  { path: '/paymentcomplete', component: PaymentCompleteView },

];

const router = createRouter({
  history: createWebHistory(), // Vue Router에서 history 모드 활성화
  routes,
});

export default router;
