<template>
  <header class="header">
    <nav class="header__nav">
      <router-link
        class="header_item"
        v-for="item in headerItems"
        :key="item.id"
        :to="item.route"
      >
        {{ item.title }}
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";

const headerItems = [
  {
    title: "Главная",
    route: "/",
    id: uuidv4(),
  },
  {
    title: "О нас",
    route: "/about",
    id: uuidv4(),
  },
  {
    title: "Контакты",
    route: "/contacts",
    id: uuidv4(),
  },
  {
    title: "Игры",
    route: "/games",
    subtitles: [
      {
        title: "Quiz",
        route: "/games/quiz",
        id: uuidv4(),
      },
    ],
    id: uuidv4(),
  },
];
</script>

<style scoped>
.header {
  padding: 40px;
  background-color: #1544c0;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid rgb(46, 45, 45);
}

.header__nav {
  display: flex;
  column-gap: 45px;
}
.header_item {
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
}
</style>
