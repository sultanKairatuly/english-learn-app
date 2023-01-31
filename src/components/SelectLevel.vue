<template>
  <div class="container">
    <div class="title">Выберите уровень</div>
    <div class="levels">
      <div
        class="level"
        :style="{
          backgroundColor: level.color,
        }"
        v-for="level in levels"
        :key="level"
        @click="selectLevel(level.level)"
      >
        {{ level.level }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useManualPageLoader } from "../composables/manualPageLoader";

const router = useRouter();
const store = useStore();
const { load } = useManualPageLoader();

function selectLevel(level) {
  load();
  store.dispatch("callLevelUpdation", level);
  router.push(store.state.game.route);
}

const levels = reactive([
  {
    level: "A1",
    color: "#00CED1",
  },
  {
    level: "A2",
    color: "#7CFC00",
  },
  {
    level: "B1",
    color: "#FFD700",
  },
  {
    level: "B2",
    color: "#FF8C00",
  },
  {
    level: "C1",
    color: "#FF4500",
  },
  {
    level: "C2",
    color: "#FF0000",
  },
]);
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

.title {
  text-transform: uppercase;
  color: #000;
  font-size: 40px;
  text-align: center;
  margin: 50px 0;
  padding: 0 10px;
}

.dark .title {
  color: #fff;
}

@media (max-width: 475px) {
  .title {
    font-size: 35px;
    margin: 40px 0;
  }
}

@media (max-width: 375px) {
  .title {
    font-size: 30px;
    margin: 30px 0;
  }

  .level {
    width: 250px;
  }
}

@media (max-width: 320px) {
  .title {
    font-size: 25px;
    margin: 25px 0;
  }

  .level {
    width: 200px;
  }
}
</style>
