<template>
  <div class="container">
    <div class="title">Выберите уровень</div>
    <div class="levels">
      <div
        class="level"
        v-for="level in levels"
        :key="level"
        @click="selectLevel(level)"
      >
        {{ level }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

function selectLevel(level) {
  store.dispatch("callLevelUpdation", level);
  router.push(store.state.game.route);
}

const levels = reactive(["A1", "A2", "B1", "B2", "C1", "C2"]);
</script>

<style scoped>
.levels {
  padding: 50px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
}
.level {
  width: 300px;
  padding: 40px 0;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
  font-size: 23px;
  background-color: #1544c0;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.level:hover {
  background-color: #1c56f5;
}

.title {
  text-transform: uppercase;
  color: #000;
  font-size: 40px;
  text-align: center;
  margin: 50px 0;
}
</style>
