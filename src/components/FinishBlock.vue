<template>
  <div class="finish">
    <div class="finish_title"><slot name="result"></slot></div>
    <div class="finish_subtitle">
      если хотите сыграть в другую игру нажмите
      <router-link tag="span" :to="{ name: 'Games' }" class="back"
        >сюда</router-link
      >
    </div>
    <button class="again" @click="playAgain">Играть снова</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["restart"]);

function playAgain() {
  emit("restart");
}
</script>

<style scoped>
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
</style>
