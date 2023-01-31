<template>
  <header class="header">
    <nav class="header__nav">
      <router-link
        class="header_item"
        v-for="item in headerItems"
        :key="item.id"
        :to="item.route"
        @click="handleRouting"
        :active-class="'active-link'"
      >
        {{ item.title }}
      </router-link>
    </nav>
    <div class="burger" @click="openMenu">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="theme">
      <i class="fa-solid fa-sun theme-icon"></i>
      <div class="switcher">
        <button
          class="switch-btn"
          @click="changeTheme"
          :style="switcherPosition"
        ></button>
      </div>
      <i class="fa-solid fa-moon theme-icon"></i>
    </div>
  </header>
  <div
    class="menu"
    :class="{
      opened: isBurgerMenu,
    }"
  >
    <div class="menu-content">
      <router-link
        class="menu_item"
        v-for="item in headerItems"
        @click="handleRouting(item)"
        :key="item.id"
        :to="item.route"
      >
        {{ item.title }}
      </router-link>
      <i class="fa-thin fa-x close" @click="isBurgerMenu = false"></i>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { ref, computed } from "vue";
import { useManualPageLoader } from "../composables/manualPageLoader";
import { useStore } from "vuex";

const store = useStore();
const { load } = useManualPageLoader();
const isBurgerMenu = ref(false);

const headerItems = [
  {
    title: "Главная",
    route: "/",
    id: uuidv4(),
  },
  {
    title: "Игры",
    route: "/games",
    id: uuidv4(),
  },
  {
    title: "Словарный запас",
    route: "/choose-topic/vocabulary-topic",
    id: uuidv4(),
  },
  {
    title: "Тесты",
    route: "/choose-topic/test-topic",
    id: uuidv4(),
  },
  {
    title: "Грамматика",
    route: "/choose-topic/grammar-topic",
    id: uuidv4(),
  },
];

const switcherPosition = computed(() =>
  store.state.theme.isDark ? { left: "40px" } : { left: 0 }
);

async function handleRouting(route) {
  isBurgerMenu.value = false;
  load();
}

function openMenu() {
  isBurgerMenu.value = !isBurgerMenu.value;
}

function changeTheme() {
  const oppositeTheme = !store.state.theme.isDark;
  store.dispatch("callThemeUpdation", oppositeTheme);
}
</script>

<style scoped>
.theme {
  display: flex;
  align-items: center;
  position: absolute;
  right: 40px;
}

.switcher {
  width: 70px;
  height: 20px;
  border-radius: 20px;
  background-color: #FFFFF0;
  display: flex;
  align-items: center;
  position: relative;
}

.switch-btn {
  background-color: #5F9EA0;
  height: 28px;
  border: 3px solid #FFFFF0;
  position: absolute;
  border-radius: 20px;
  width: 30px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.theme-icon {
  font-size: 30px;
  color: #fff;
  margin: 0 10px;
}
.header {
  padding: 40px;
  background-color: #1544c0;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 150;
  overflow: hidden;
  box-shadow: -1px 6px 6px 0px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.menu {
  display: flex;
  justify-content: center;
  z-index: 120;
  align-items: center;
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.719);
  margin-top: 100px;
}

.close {
  font-size: 40px;
  font-style: normal;
  position: absolute;
  right: 40px;
  top: 30px;
  cursor: pointer;
  padding: 10px;
}

.menu-content {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  transition: 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 35px;
  height: 95%;
  z-index: 130;
  width: 95%;
  position: relative;
}

.menu_item {
  padding-bottom: 10px;
  text-decoration: none;
  font-size: 35px;
  font-weight: 500px;
  text-transform: uppercase;
  text-align: center;
  color: #212529;
}

.header__nav {
  display: flex;
  column-gap: 45px;
}
.header_item {
  color: #fff;
  opacity: 0.6;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
}

.burger {
  background-color: #fff;
  width: 40px;
  height: 40px;
  display: flex;
  display: none;
  flex-direction: column;
  justify-content: center;
  row-gap: 4px;
  padding: 3px;
  align-items: center;
  border-radius: 10px;
}

.bar {
  height: 3px;
  width: 60%;
  border-radius: 5px;
  background-color: #1544c0;
}

.opened {
  opacity: 1;
  visibility: visible;
}

.active-link {
  opacity: 1;
  font-weight: 500;
}

.dark .header {
  background-color: #8774e1;
}

.dark .bar {
  background-color: #8774e1;
}

.dark .menu-content {
  background-color: #253240;
}

.dark .menu_item{
  color: #fff;
}

.dark .close {
  color: #fff;
}

@media (max-width: 1550px) {
  .header {
    padding: 35px;
  }
  .header_item {
    font-size: 14px;
  }
}

@media (max-width: 990px) {
  .header_item {
    font-size: 14px;
  }

  .header__nav {
    display: none;
  }

  .burger {
    display: flex;
  }
}

@media (max-width: 800px) {
  .menu_item {
    font-size: 30px;
  }

  .header {
    padding: 30px;
  }
}

@media (max-width: 425px) {
  .menu_item {
    font-size: 30px;
  }

  .burger {
    width: 35px;
    height: 35px;
  }

  .bar {
    height: 2px;
  }

  .header {
    padding: 15px 30px;
  }

  .close {
    font-size: 32px;
  }

  .menu {
    margin-top: 55px;
  }
}
@media (max-width: 375px) {
  .menu_item {
    font-size: 27px;
  }

  .close {
    font-size: 30px;
  }
}

@media (max-width: 320px) {
  .menu_item {
    font-size: 22px;
  }

  .burger {
    width: 32px;
    height: 32px;
  }

  .close {
    font-size: 28px;
  }
}
</style>
