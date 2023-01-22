<template>
  <AppHeader />
  <div class="app">
    <router-view></router-view>
  </div>
  <AppFooter />
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=Shadows+Into+Light&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

img {
  max-width: 100%;
}

.container {
  padding-top: 102px;
  min-height: 100vh;
}
</style>
