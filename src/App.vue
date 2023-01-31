<template>
  <div
    class="loader_container"
    :class="{
      visible: store.state.loader,
      'scroll-visible': store.state.loader,
      'dark-loader': store.state.theme.isDark,
    }"
  >
    <span class="loader"></span>
  </div>

  <div
    class="app"
    v-if="!store.state.loader"
    :class="{
      visible: !store.state.loader,
      loading: store.state.pageLoader,
      dark: store.state.theme.isDark,
    }"
  >
    <AppHeader />
    <div
      class="page-loader_container"
      :class="{
        visible: store.state.pageLoader,
        'dark-loader': store.state.theme.isDark,
      }"
    >
      <span class="loader"></span>
    </div>
    <router-view v-if="!store.state.pageLoader"></router-view>
    <AppFooter v-if="!store.state.pageLoader" />
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
const store = useStore();
const scrollWide = computed(() => {
  return window.offsetWidth - window.clientWidth + "px";
});

watch(ref(store.state.loader), (nv) => {
  console.log(nv);
});
setTimeout(() => {
  store.dispatch("callLoaderUpdation", false);
}, 1000);
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=Shadows+Into+Light&display=swap");
* {
  margin: 0;
  padding: 0;
  transition: 0.3s ease-in-out;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.app {
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

.container {
  padding-top: 90px;
  min-height: 100vh;
}

.loading {
  height: 100vh;
  overflow: hidden;
}

.visible-content {
  z-index: 200;
}

.page-loader_container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 120;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.loader_container {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 101vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;
  padding-right: 0px;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #1544c0;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.dark-loader {
  background-color: #253240;
}

.dark-loader .loader {
  border-top: 4px solid #8774e1;
}

.dark .container {
  background-color: #253240;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.visible {
  opacity: 1;
  visibility: visible;
}

.scroll-visible {
  overflow-y: visible;
}

@media (max-width: 1024px) {
  .container {
    padding-top: 87px;
  }
}

@media (max-width: 425px) {
  .container {
    padding-top: 50px;
  }
}

.dark {
  background-color: grey;
}
</style>
