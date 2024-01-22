<template>
  <div class="fluid">
    <div class="content">
      <div
        class="fluid_item"
        v-for="fluid in fluids"
        :style="{
          background: store.state.theme.isDark
            ? fluid.backColor.dark
            : fluid.backColor.light,
        }"
      >
        <i class="fluid_item-icon" :class="fluid.icon"></i>
        <div class="fluid-item_title">{{ fluid.title }}</div>
       
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const fluids = reactive([
  {
    title: "What's On?",
    list: ["English Calendar", "English Diary"],
    icon: "fa-solid fa-calendar",
    backColor: {
      dark: "#6053a1",
      light: "#000066",
    },
  },
  {
    title: "Have Some Fun",
    list: ["Interesting Facts", "Fun With English", "English Jokes"],
    icon: "fa-solid fa-smile",
    backColor: {
      dark: "#6857bd",
      light: "#000080",
    },
  },
  {
    title: "The Network",
    list: ["English Blog", "English Lessons", "The Sessions", "The Network"],
    icon: "fa-solid fa-compass",
    backColor: {
      dark: "#8774e1",
      light: "#0000cc",
    },
  },
  {
    title: "Books",
    list: [
      "Recommended Books",
      "Vocabulary Books",
      "Pronunciation Books",
      "Grammar Books",
    ],
    icon: "fa-solid fa-book",
    backColor: {
      dark: "#947ffc",
      light: "#3366ff",
    },
  },
]);
</script>

<style scoped>
.fluid {
  width: 100%;
}
.content {
  display: flex;
  align-items: center;
  height: 510px;
}
.fluid_item {
  color: #fff;
  padding: 55px;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fluid_item-icon {
  font-size: 70px;
  margin-bottom: 20px;
}
.fluid-item_title {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}
.fluid_item-subtitle {
  text-align: center;
  opacity: 0.7;
  font-size: 19px;
  padding-top: 15px;
  cursor: pointer;
}

.fluid_item-subtitle:hover {
  text-decoration: underline;
}

@media (max-width: 1550px) {
  .fluid_item-icon {
    font-size: 57px;
  }
  .fluid-item_title {
    font-size: 22px;
  }
  .fluid_item-subtitle {
    font-size: 15px;
  }
}

@media (max-width: 990px) {
  .content {
    flex-direction: column;
    height: auto;
  }

  .fluid_item {
    width: 100%;
  }
}

@media (max-width: 425px) {
  .fluid_item {
    padding: 45px;
  }
  .fluid_item-icon {
    font-size: 40px;
  }
  .fluid-item_title {
    font-size: 20px;
  }
  .fluid_item-subtitle {
    font-size: 13px;
  }
}
</style>
