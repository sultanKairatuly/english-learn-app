import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    alias: "/home",
    component: () => import("../components/HomePage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/AboutPage.vue"),
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: () => import("../components/ContactsPage.vue"),
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("../components/GamesPage.vue"),
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: () => import("../components/QuizGame.vue"),
  },
  {
    path: "/puzzle",
    name: "Puzzle",
    component: () => import("../components/PuzzleGame.vue"),
  },
  {
    path: "/insertion",
    name: "Insertion",
    component: () => import("../components/InsertionGame.vue"),
  },
  {
    path: "/level",
    name: "Level",
    component: () => import("../components/SelectLevel.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
