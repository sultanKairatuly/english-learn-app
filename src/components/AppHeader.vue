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
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isBurgerMenu = ref(false);

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

async function handleRouting(route) {
  isBurgerMenu.value = false;
  store.dispatch("callPageLoaderUpdation", true);
  setTimeout(() => {
    store.dispatch("callPageLoaderUpdation", false);
  }, 500);
}

function openMenu() {
  isBurgerMenu.value = !isBurgerMenu.value;
}
</script>

<style scoped>
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
    font-size: 25px;
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
