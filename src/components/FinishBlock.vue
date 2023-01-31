<template>
  <div class="finish">
    <div class="finish_title"><slot name="result"></slot></div>
    <div class="finish_subtitle">
      если хотите сыграть в другую игру нажмите
      <div tag="span" @click="otherGames" class="back">сюда</div>
    </div>
    <button class="again" @click="playAgain">Играть снова</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useManualPageLoader } from "../composables/manualPageLoader";

const router = useRouter();
const emit = defineEmits(["restart"]);
const { load } = useManualPageLoader();

function playAgain() {
  emit("restart");
}

function otherGames() {
  load();
  router.push({ name: "Games" });
}
</script>

<style scoped>
.finish {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  transition: 0.3s ease-in-out;
}

.finish_title {
  font-size: 50px;
  color: #000;
  text-align: center;
}

.finish_subtitle {
  font-size: 30px;
  color: #000;
  text-align: center;
  margin-top: 30px;
}

.back {
  color: #1544c0;
  text-decoration: none;
  cursor: pointer;
  font-family: "Shadows Into Light", cursive;
}

.again {
  color: #fff;
  background-color: #1544c0;
  border-radius: 3px;
  padding: 20px;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  border: none;
  display: block;
  cursor: pointer;
  margin: 100px auto;
}

.dark .finish_subtitle {
  color: #fff;
}

.dark .back {
  color: #8774ec;
}

.dark .again {
  background-color: #8774ec;
}

.dark .finish_title{
  color: #fff;
}

@media (max-width: 1440px) {
  .finish_subtitle {
    font-size: 35px;
  }
  .again {
    margin: 60px auto;
  }
}

@media (max-width: 1100px) {
  .finish_subtitle {
    font-size: 30px;
  }
  .again {
    margin: 40px auto;
    font-size: 16px;
  }
}

@media (max-width: 800px) {
  .finish_subtitle {
    font-size: 20px;
  }

  .again {
    padding: 15px;
    font-size: 18px;
    margin: 50px auto;
  }
}

@media (max-width: 425px) {
  .finish_subtitle {
    font-size: 25px;
  }

  .again {
    padding: 15px;
    font-size: 16px;
    margin: 40px auto;
  }
}

@media (max-width: 320px) {
  .finish_subtitle {
    font-size: 20px;
  }

  .again {
    padding: 12px;
    font-size: 15px;
    margin: 30px auto;
  }
}
</style>
