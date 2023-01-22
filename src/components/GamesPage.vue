<template>
  <div class="container">
    <h1 class="title">Games</h1>
    <div class="games">
      <div
        tag="div"
        class="game"
        v-for="game in games"
        :key="game.id"
        @mouseenter="changeHovered(game)"
        @mouseleave="hoveredGameId = null"
        :style="{
          background: game.background,
        }"
        @click="selectGame(game)"
      >
        <h3 class="game_title">{{ game.title }}</h3>
        <div
          class="game_description"
          :class="{
            'active-description': game.id === hoveredGameId,
          }"
        >
          {{ game.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const games = reactive([
  {
    title: "Викторина",
    description: `
      Вам дается одно слово на русском языке и вы должны выбрать вариант с правильным переводом.
    `,
    background: "Red",
    route: "/quiz",
    id: uuidv4(),
    level: true,
  },
  {
    title: "Пазл",
    description: `
      Вам дается небольшое предложение со словами где пропущенны буквы, ваша задача выбрать правльную букву для слова.
    `,
    background: "MediumVioletRed",
    route: "/puzzle",
    id: uuidv4(),
    level: true,
  },
  {
    title: "Подставка",
    description: `
      Вам даны карточки с текстом снизу, он описывает предмет, перетащите его туда, где он должен  быть.
    `,
    background: "DarkViolet",
    route: "/insertion",
    id: uuidv4(),
    level: false,
  },
  {
    title: "Порядок",
    description: `
      Вы должны поставить буквы по порядку, чтобы получилось полноценное слово.
    `,
    background: "#1E90FF",
    route: "/order",
    id: uuidv4(),
    level: false,
  },
]);

let hoveredGameId = ref(null);

function changeHovered(game) {
  hoveredGameId.value = game.id;
}

function selectGame(game) {
  store.dispatch("callGameUpdation", game);
  if (game.level) {
    router.push("/level");
  } else {
    router.push(game.route);
  }
}
</script>

<style scoped>
.title {
  font-size: 90px;
  text-transform: uppercase;
  color: #1544c0;
  text-align: center;
}

.games {
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;
  row-gap: 30px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.game {
  text-decoration: none;
  border-radius: 10px;
  height: 300px;
  width: 300px;
  padding: 30px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  justify-content: space-between;
  cursor: pointer;
}

.game_title {
  font-weight: normal;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
}

.game_description {
  width: 300px;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  transition: 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
}

.active-description {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
