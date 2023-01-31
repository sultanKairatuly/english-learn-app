<template>
  <div class="container">
    <component :is="currentComponent"></component>
    <div class="test">
      <h3 class="test_title">Чтобы закрепить знания, пройдите тест</h3>
      <div class="to-test" @click="goToTest">Пройти тест</div>
    </div>
  </div>
</template>

<script setup>
import { shallowReactive, computed, reactive } from "vue";
import PresentSimple from "./statics/PresentSimple.vue";
import PresentPerfect from "./statics/PresentPerfect.vue";
import PresentContinious from "./statics/PresentContinious.vue";
import PastSimple from "./statics/PastSimple.vue";
import PastPerfect from "./statics/PastPerfect.vue";
import PastContinious from "./statics/PastContinious.vue";
import InfinitveGerund from "./statics/InfinitveGerund.vue";

import { useStore } from "vuex";

const store = useStore();
const grammarTopicName = computed(() => store.state.grammarTopic.title);
const grammarData = shallowReactive([
  {
    component: PresentSimple,
    name: "Present Simple",
  },
  {
    component: PresentPerfect,
    name: "Present Perfect",
  },
  {
    component: PresentContinious,
    name: "Present Continious",
  },
  {
    component: PastSimple,
    name: "Past Simple",
  },
  {
    component: PastPerfect,
    name: "Past Perfect",
  },
  {
    component: PastContinious,
    name: "Past Continious",
  },
  {
    component: InfinitveGerund,
    name: "Infinitive & Gerund",
  },
]);
const currentComponent = computed(
  () =>
    grammarData.filter((item) => item.name === grammarTopicName.value)[0]
      .component
);

function goToTest() {
}
</script>

<style scoped>
.test {
  margin: 0 auto;
  max-width: 1200px;
}

.test_title {
  color: #fff;
  font-weight: 500;
  font-size: 35px;
  text-align: center;
  margin: 40px;
}

.to-test {
  background-color: #7b68ee;
  color: #fff;
  font-weight: 500;
  text-align: center;
  padding: 30px;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 20px;
  width: fit-content;
  margin: 0px auto;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.to-test:hover {
  background-color: #5749a5;
}
</style>
