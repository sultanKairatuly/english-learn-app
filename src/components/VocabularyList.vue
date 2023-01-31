<template>
  <div class="container">
    <div class="banner">
      <i
        class="banner_icon fa-solid"
        :class="store.state.vocabularyTopic.icon"
      ></i>
      <div class="banner_title">{{ store.state.vocabularyTopic.title }}</div>
      <i
        class="banner_icon fa-solid"
        :class="store.state.vocabularyTopic.icon"
      ></i>
    </div>
    <div class="content">
      <div class="intro">
        <div class="intro_text">{{ vocabularyList.introText }}</div>
        <img
          :src="require(`../${vocabularyList.introImage}`)"
          alt=""
          class="intro_image"
        />
      </div>
      <div class="list">
        <div class="list-header">
          <div class="list-header_item">Слово</div>
          <div class="list-header_item">Перевод</div>
        </div>
        <div class="main_item">
          <div class="words" v-for="(word, index) in englishWords" :key="word">
            <div class="english word">{{ englishWords[index] }}</div>
            <div class="russian word">{{ russianWords[index] }}</div>
          </div>
        </div>
      </div>
      <div class="test">
        <h3 class="test_title">Чтобы закрепить знания, пройдите тест</h3>
        <div class="to-test" @click="goToTest">Пройти тест</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const vocabularyList = computed(() => {
  return store.state.vocabularyData.filter(
    (list) =>
      list.topic.toLowerCase() ===
      store.state.vocabularyTopic.title.toLowerCase()
  )[0];
});
const translationWords = computed(() => vocabularyList.value.words);
const russianWords = computed(() => {
  let words = [];

  translationWords.value.forEach((item) => {
    words.push(item.ru);
  });

  return words;
});
const englishWords = computed(() => {
  let words = [];

  translationWords.value.forEach((item) => {
    words.push(item.en);
  });

  return words;
});

function goToTest() {
  const testTopicTitle =
    `${store.state.vocabularyTopic.title} in English`.toLowerCase();
  const testTopic = store.state.testTopics.filter(
    (test) => test.title.toLowerCase() === testTopicTitle
  )[0];
  store.dispatch("callTestTopicUpdation", testTopic);
  router.push("/test-list");
}
</script>

<style scoped>
.container {
  background-color: #f0ffff;
}
.content {
  background-color: #fff;
  min-height: 100vh;
  height: 100%;
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
}
.banner {
  padding: 60px 0;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  width: 100%;
  align-items: center;
}

.banner_icon {
  color: #1544c0;
  font-size: 40px;
}

.banner_title {
  text-transform: uppercase;
  font-size: 40px;
  margin: 0 40px;
  font-weight: 500;
}

.intro {
  padding: 60px 0;
}

.intro_text {
  padding: 0 20px;
  font-size: 25px;
  font-weight: 500;
  font-family: "Open Sans", Arial, sans-serif;
}

.intro_image {
  display: block;
  margin: 60px auto;
  width: 100%;
}

.list {
  width: 100%;
  border: 1px solid black;
  border-bottom: none;
  border-left: none;
  margin-bottom: 40px;
}
.list-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.words {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
}

.list-header_item {
  padding-bottom: 30px;
  width: 50%;
  padding-top: 30px;
  text-align: center;
  font-size: 35px;
  font-weight: 400;
  text-transform: uppercase;
  border-bottom: 1px solid #000;
}

.russian {
  text-align: right;
}

.english {
  text-align: left;
}

.word {
  font-weight: 400;
  font-size: 30px;
  text-transform: uppercase;
  width: 50%;
  padding: 30px 20px;
  text-align: center;
}

.list-header_item:first-child {
  border-left: 1px solid #000;
  border-right: 1px solid black;
}

.russian,
.english {
  border-left: 1px solid black;
}

.test_title {
  font-size: 33px;
  text-align: center;
  margin: 40px 0;
  font-weight: normal;
  color: #1e90ff;
  font-weight: 500;
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
  margin: 20px auto;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.to-test:hover {
  background-color: #5749a5;
}

.dark .banner {
  background-color: #1f262e;
}

.dark .banner_title {
  color: #fff;
}

.dark .banner_icon {
  color: #8774e1;
}

.dark .content {
  background-color: #1e2833;
}

.dark .intro_text {
  color: #fff;
}

.dark .container {
  background-color: #253240;
}

.dark .list-header_item {
  color: #fff;
}

.dark .word {
  color: #fff;
}

.dark .list-header_item:first-child {
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}

.dark .russian,
.dark .english {
  border-left: 1px solid #fff;
}

.dark .list {
  border: 1px solid #fff;
}

.dark .words {
  border-bottom: 1px solid #fff;
}

.dark .list-header_item {
  border-bottom: 1px solid #fff;
}

@media (max-width: 800px) {
  .word {
    font-size: 28px;
  }

  .list-header_item {
    font-size: 32px;
  }

  .test_title {
    font-size: 27px;
  }
  .to-test {
    padding: 25px;
    font-size: 18px;
  }
}

@media (max-width: 500px) {
  .word {
    font-size: 22px;
  }

  .list-header_item {
    font-size: 25px;
  }

  .banner_icon {
    font-size: 30px;
  }

  .banner_title {
    font-size: 30px;
    margin: 0 30px;
  }

  .intro_text {
    font-size: 20px;
  }

  .content {
    padding: 0 5px;
  }

  .banner {
    padding: 50px;
  }

  .test_title {
    font-size: 25px;
  }
  .to-test {
    padding: 22px;
    font-size: 18px;
  }
}

@media (max-width: 375px) {
  .word {
    font-size: 18px;
  }

  .banner {
    padding: 40px;
  }

  .list-header_item {
    font-size: 20px;
  }

  .banner_icon {
    font-size: 25px;
  }

  .banner_title {
    font-size: 25px;
    margin: 0 25px;
  }

  .intro_text {
    font-size: 17px;
  }

  .content {
    padding: 0 5px;
  }

  .test_title {
    font-size: 20px;
  }
  .to-test {
    padding: 22px;
    font-size: 16px;
  }
}

@media (max-width: 320px) {
  .word {
    font-size: 16px;
  }

  .banner {
    padding: 30px;
  }

  .list-header_item {
    font-size: 18px;
  }

  .banner_icon {
    font-size: 20px;
  }

  .banner_title {
    font-size: 20px;
    margin: 0 20px;
  }

  .intro_text {
    font-size: 17px;
  }

  .test_title {
    font-size: 20px;
  }
  .to-test {
    padding: 15px;
    font-size: 16px;
  }
}
</style>
