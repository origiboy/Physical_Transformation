import { createRouter, createWebHistory } from 'vue-router';
import CharactersList from '../components/CharactersList.vue';
import SearchByLocation from '../components/SearchByLocation.vue';

const routes = [
  { path: '/', component: CharactersList },
  { path: '/search-location', component: SearchByLocation },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;