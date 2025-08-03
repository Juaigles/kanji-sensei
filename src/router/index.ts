import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/views/HomeView.vue'
import KanjiDetailView from '../components/views/KanjiDetailsView.vue'
import KanjiListView from '../components/views/KanjiListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
    path: '/', // URL
    name: 'Home',
    component: HomeView // Componente que se muestra
  },
  {
    path: '/kanji/:id',
    name: 'KanjiDetail',
    component: KanjiDetailView
  },
  {
    path: '/kanji',
    name: 'KanjiList',
    component: KanjiListView
  }
  ],
})

export default router
