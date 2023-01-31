import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    alias: "/home",
    component: () => import("../components/HomePage.vue"),
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("../components/GamesPage.vue"),
  },
  {
    path: "/quiz",
    alias: "/games/quiz",
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
    path: "/order",
    name: "Order",
    component: () => import("../components/OrderGame.vue"),
  },
  {
    path: "/level",
    name: "Level",
    component: () => import("../components/SelectLevel.vue"),
  },
  {
    path: "/choose-topic/:topic",
    name: "Topics",
    component: () => import("../components/ChooseTopic.vue"),
  },
  {
    path: "/vocabulary-list",
    name: "Vocabulary List",
    component: () => import("../components/VocabularyList.vue"),
  },
  {
    path: "/test-list",
    name: "Test List",
    component: () => import("../components/TestList.vue"),
  },
  {
    path: "/grammar-list",
    name: "Grammar List",
    component: () => import("../components/GrammarList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});

export default router;
