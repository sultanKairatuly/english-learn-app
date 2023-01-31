<template>
  <div class="container">
    <div class="title">Выберите тему теста, которая вас интересует</div>
    <div class="topics">
      <div
        class="topic"
        v-for="topic in topics"
        :key="topic.id"
        @click="setTopic(topic)"
      >
        <i class="topic_icon fa-solid" :class="topic.icon"></i>
        <div class="topic_title">{{ topic.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { useCapitalize } from "../composables/capitalize";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { capitalize } = useCapitalize();

let currentTopicTheme = computed(() => route.params.topic.match(/\w+/)[0]);
const topics = computed(() => store.state[currentTopicTheme.value + "Topics"]);

function setTopic(topic) {
  store.dispatch("callPageLoaderUpdation", true);
  setTimeout(() => {
    store.dispatch("callPageLoaderUpdation", false);
  }, 200);
  store.dispatch(
    `call${capitalize(currentTopicTheme.value)}TopicUpdation`,
    topic
  );
  router.push(topic.route);
}
</script>

<style scoped>
.title {
  text-align: center;
  margin: 50px;
  font-size: 50px;
  font-weight: 700;
  color: #9dfc9d;
}

.topics {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  padding: 50px;
}

.topic {
  padding: 40px 0;
  background-color: #f7f7f7;
  width: 700px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}

.topic_icon {
  color: #1544c0;
  font-size: 36px;
  margin-right: 30px;
}

.topic_title {
  font-size: 30px;
  text-align: center;
  text-transform: capitalize;
  color: #252927;
  font-weight: 700;
}

.topic:hover {
  background-color: #cfcfcf;
}

.dark .topic_title {
  color: #fff;
}

.dark .topic {
  background-color: #252927;
}

.dark .topic:hover {
  background-color: #343836;
}

.dark .topic_icon {
  color: #8774e1;
}

@media (max-width: 800px) {
  .title {
    font-size: 40px;
  }

  .topic_icon {
    font-size: 32px;
  }

  .topic_title {
    font-size: 26px;
  }

  .topic {
    width: 100%;
  }
}

@media (max-width: 450px) {
  .title {
    font-size: 30px;
    margin: 30px 0;
    text-align: center;
  }

  .topic {
    width: 100%;
    padding: 30px 0;
  }

  .topics {
    padding: 40px;
  }

  .topic_icon {
    font-size: 28px;
  }

  .topic_title {
    font-size: 22px;
  }
}

@media (max-width: 380px) {
  .title {
    font-size: 27px;
    margin: 20px 0;
  }

  .topics {
    padding: 30px;
  }

  .topic {
    width: 100%;
    padding: 25px 0;
  }
  .topic_icon {
    font-size: 25px;
  }

  .topic_title {
    font-size: 20px;
  }
}

@media (max-width: 320px) {
  .title {
    font-size: 22px;
    margin: 20px 0;
    text-align: center;
  }

  .topics {
    padding: 20px;
  }

  .topic {
    width: 100%;
    padding: 20px 0;
  }
  .topic_icon {
    font-size: 23px;
  }

  .topic_title {
    font-size: 22px;
  }
}
</style>
