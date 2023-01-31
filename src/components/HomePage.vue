<template>
  <div class="container">
    <div class="homepage">
      <h1 class="title">Sultan Learn</h1>
      <h3 class="subtitle">Помогаем людям учить английский</h3>
      <div class="description">
        Это приложение создано в целях самообучения людей путем веселых игр.
        Здесь вы можете улучшить свои навыки английского языка и заодно
        повеселиться. Чтобы узнать о нас больше кликните здесь
      </div>
      <div class="secondary-section">
        <div class="animation-text">
          <div
            class="word-rotator"
            :style="{
              width: MainWidth,
            }"
          >
            <div
              class="word-rotator_item is-hidden"
              :class="{
                'is-visible': activeWord === 'Невероятно',
              }"
              style="width: 200px"
            >
              Невероятно
            </div>
            <div
              class="word-rotator_item is-hidden"
              :class="{
                'is-visible': activeWord === 'Удивительно',
              }"
              style="width: 225px"
            >
              Удивительно
            </div>
            <div
              class="word-rotator_item is-hidden"
              :class="{
                'is-visible': activeWord === 'Верь или нет',
              }"
              style="width: 280px"
            >
              Верь или нет
            </div>
            <div
              class="word-rotator_item is-hidden"
              :class="{
                'is-visible': activeWord === 'Ошеломляюще',
              }"
              style="width: 260px"
            >
              Ошеломляюще
            </div>
          </div>
          <div class="second-text">ты можешь учить английский бесплатно</div>
        </div>
        <div class="extra-info">
          Мы помогаем людям учить английский с 2006 года
        </div>
        <div class="topics">
          <div
            class="topic"
            @mouseenter="hoveredTopic = topic.title"
            @mouseleave="hoveredTopic = ''"
            @click="checkTopic(topic)"
            v-for="topic in topics"
            :style="{
              'border-bottom': store.state.theme.isDark
                ? `7px solid ${topic.backColor.dark}`
                : `7px solid ${topic.backColor.light}`,
            }"
          >
            <div class="icon_container">
              <i
                class="fa-solid topic-icon"
                :class="topic.icon"
                :style="{
                  background: store.state.theme.isDark
                    ? topic.backColor.dark
                    : topic.backColor.light,
                }"
              ></i>
              <div
                class="hover-border"
                :style="{
                  border: store.state.theme.isDark
                    ? `6px solid ${topic.backColor.dark}`
                    : `6px solid ${topic.backColor.light}`,
                }"
                :class="{
                  'active-hover-border': hoveredTopic === topic.title,
                }"
              ></div>
            </div>

            <div
              class="topic_title"
              :style="{
                color: store.state.theme.isDark
                    ? topic.backColor.dark
                    : topic.backColor.light,
              }"
            >
              {{ topic.title }}
            </div>
            <div class="topic_description">
              {{ topic.subtitle }}
            </div>
          </div>
        </div>
      </div>

      <FluidSection />
      <div class="sessions">
        <div class="session_title">Наши сессии</div>
        <SessionList />
      </div>
      <div class="information" ref="information">
        <div class="information_item" v-for="info in infos">
          <div class="information-item_title">{{ info.title }}</div>
          <div class="information-item_subtitle">{{ info.subtitle }}</div>
        </div>
      </div>
      <FAQuestions class="faq" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from "vue";
import SessionList from "../components/SessionList.vue";
import FAQuestions from "./FAQuestions.vue";
import FluidSection from "./FluidSection.vue";
import { useManualPageLoader } from "../composables/manualPageLoader";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const { load } = useManualPageLoader();
const MainWidth = ref("200px");
let words = ["Невероятно", "Удивительно", "Верь или нет", "Ошеломляюще"];
const activeWord = ref(words[0]);
const i = ref(0);
watch(i, (nw) => {
  if (nw === 1) {
    MainWidth.value = "200px";
  } else if (nw === 2) {
    MainWidth.value = "225px";
  } else if (nw === 3) {
    MainWidth.value = "280px";
  } else if (nw === 4) {
    MainWidth.value = "260px";
  }
});

setInterval(() => {
  if (i.value === words.length) {
    i.value = 0;
    activeWord.value = words[i.value];
    i.value++;
  } else {
    activeWord.value = words[i.value];
    i.value++;
  }
}, 2000);

const hoveredTopic = ref("");
const topics = reactive([
  {
    title: "Fun and Games",
    subtitle: "All work, no play makes Jack / Jill a dull boy / girl.",
    backColor: { dark: "#6053a1", light: "#0000cc" },
    icon: "fa-puzzle-piece",
    route: "/games",
  },
  {
    title: "English Grammar",
    subtitle: "Your guide to English grammar.",
    backColor: { dark: "#6857bd", light: "#000066" },
    icon: "fa-book",
    route: "/choose-topic/grammar-topic",
  },
  {
    title: "Vocabulary",
    subtitle: "Go back to basics. For anyone who needs a bit of revision.",
    backColor: { dark: "#8774e1", light: "#3366ff" },
    icon: "fa-user",
    route: "/choose-topic/vocabulary-topic",
  },
  {
    title: "English Test",
    subtitle: "Have you really learnt what you think you have learnt?",
    backColor: { dark: "#947ffc", light: "#3399ff" },
    icon: "fa-star",
    route: "/choose-topic/test-topic",
  },
]);

const information = ref(null);
const intersected = ref(false);

const informationCallback = (e) => {
  if (!intersected.value) {
    if (e[0].isIntersecting) {
      intersected.value = true;
      let interval1 = setInterval(() => {
        if (infos[0].title === 21000) {
          clearInterval(interval1);
          infos[0].title = infos[0].title + "+";
        } else {
          infos[0].title += 50;
        }
      }, 10);
      let interval2 = setInterval(() => {
        if (infos[1].title === 3500) {
          clearInterval(interval2);
          infos[1].title = infos[1].title + "+";
        } else {
          infos[1].title += 5;
        }
      }, 8);
      let interval3 = setInterval(() => {
        if (infos[2].title === 9) {
          clearInterval(interval3);
          infos[2].title = infos[2].title + "+";
        } else {
          infos[2].title += 1;
        }
      }, 250);
      let interval4 = setInterval(() => {
        if (infos[3].title === 1000) {
          clearInterval(interval4);
          infos[3].title = infos[3].title + "+";
        } else {
          infos[3].title += 20;
        }
      }, 90);
    }
  } else {
    return;
  }
};
const observer = new IntersectionObserver(informationCallback, {
  threshold: 0,
  root: null,
  rootMargin: "0px",
});
onMounted(() => {
  observer.observe(information.value);
});
const infos = reactive([
  {
    title: 10000,
    subtitle: "Members",
  },
  {
    title: 2000,
    subtitle: "Answered Questions",
  },
  {
    title: 1,
    subtitle: "Free Weekly Sessions",
  },
  {
    title: 500,
    subtitle: "Online Videos",
  },
]);

function checkTopic(topic) {
  load();
  router.push(topic.route);
}
</script>

<style scoped>
.faq {
  margin-bottom: 50px;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  width: 100%;
  transition: 0.3s ease-in-out;
}
.homepage {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: 0.3s ease-in-out;
  margin-top: 50px;
}
.title {
  font-size: 90px;
  color: #1554c0;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  color: #1544c0;
  font-weight: 500;
  font-size: 40px;
  text-align: center;
  margin-bottom: 25px;
}

.icon-speech {
  color: #1544c0;
  font-size: 100px;
}

.session_title {
  font-weight: 700;
  font-size: 40px;
  text-transform: capitalize;
  margin: 55px 0;
}

.information {
  background-color: #1544c0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px;
  padding: 70px 0;
  width: 100%;
}

.information_item {
  padding: 0 15px;
  transition: 1s ease-in-out;
  width: 15%;
  margin: 0 15px;
}

.information-item_title {
  font-size: 43px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  transition: 1s ease-in-out;
}
.information-item_subtitle {
  font-size: 20px;
  color: #fff;
  opacity: 0.6;
  margin-top: 4px;
  margin-bottom: 8px;
  text-transform: capitalize;
  text-align: center;
}
.description {
  color: #212121;
  font-size: 20px;
  font-weight: 500;
  width: 800px;
  text-align: center;
}

.animation-text {
  margin-top: 50px;
  font-size: 30px;
  color: #000;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 7px;
  margin-bottom: 16px;
}

.word-rotator {
  background-color: #1544c0;
  padding: 30px 10px;
  transition: 0.4s ease-in-out;
  position: relative;
  display: inline-block;
}

.word-rotator_item {
  color: #fff;
  font-size: 28px;
  width: fit-content;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-47%, -50%);
  transition: 0.4s ease-in-out;
}

.second-text {
  text-align: center;
  padding: 0 10px;
}

.is-hidden {
  transform: translate(-44%, -85%);
  opacity: 0;
  visibility: hidden;
}

.is-visible {
  transform: translate(-50%, -50%);
  opacity: 1;
  visibility: visible;
}

.extra-info {
  color: #8c8c8c;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: "Open Sans", Arial, sans-serif;
}

.secondary-section {
  margin-top: 50px;
  background-color: #f7f7f7;
  padding: 70px 0 150px 0;
  width: 100%;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  margin: 100px auto;
  align-items: center;
  row-gap: 30px;
  column-gap: 40px;
  justify-content: center;
}
.topic {
  padding: 29px;
  width: 310px;
  background: #fff;
  margin-top: 65px;
  border: 2px solid #ececec;
  border-bottom: 7px solid #0000cc;
  border-radius: 10px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.topic_title {
  color: #0000cc;
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-size: 30px;
  margin: 16px 0px 5px;
  cursor: pointer;
}

.topic_title:hover {
  text-decoration: underline;
}
.topic_description {
  margin: 8px 0;
  text-align: center;
  font-size: 16px;
  text-align: center;
}
.icon_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.topic-icon {
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200%);
  cursor: pointer;
  width: 115px;
  border-radius: 100%;
  background-color: #0000cc;
}

.hover-border {
  position: absolute;
  top: 50%;
  border-radius: 100%;
  left: 50%;
  transform: translate(-50%, -178%);
  opacity: 0;
  visibility: hidden;
  padding: 65px;
  transition: 0.3s ease-in-out;
}

.active-hover-border {
  opacity: 1;
  visibility: visible;
}

.dark .homepage {
  background-color: #253240;
}

.dark .container {
  background-color: #253240;
}

.dark .title {
  color: #8774e1;
}

.dark .description {
  color: #fff;
}

.dark .secondary-section {
  background-color: #1e2833;
}

.dark .word-rotator_item {
  color: #fff;
}

.dark .word-rotator {
  background-color: #8774e1;
}
.dark .animation-text {
  color: #fff;
}

.dark .extra-info {
  color: #f7f7f7;
}

.dark .subtitle{
  color: #8774e1;
}

.dark .topic {
  background-color: #25313d;
  border: 2px solid #000;
}

.dark .topic_description {
  color: #fff;
}

.dark .session_title{
  color: #fff;
}

.dark .information{
  background-color: #8774e1;
}

@media (max-width: 1550px) {
  .title {
    font-size: 75px;
  }

  .subtitle {
    font-size: 35px;
  }

  .session_title {
    font-size: 30px;
  }

  .information {
    padding: 60px 0;
  }

  .information-item_title {
    font-size: 39px;
  }
  .information-item_subtitle {
    font-size: 18px;
  }
}

@media (max-width: 1250px) {
  .title {
    font-size: 67px;
  }

  .hover-border {
    transform: translate(-50%, -176.5%);
  }
  .subtitle {
    font-size: 30px;
  }

  .session_title {
    font-size: 28px;
  }

  .information {
    padding: 60px 0;
  }

  .information-item_title {
    font-size: 39px;
  }
  .information-item_subtitle {
    font-size: 18px;
  }

  .animation-text {
    font-size: 27px;
  }

  .word-rotator_item {
    font-size: 27px;
  }

  .extra-info {
    font-size: 20px;
  }

  .topic {
    padding: 25px;
  }
  .topic_title {
    font-size: 27px;
  }

  .topic_description {
    font-size: 14px;
  }

  .information {
    padding: 50px;
    justify-content: space-between;
  }

  .information-item_title {
    font-size: 37px;
  }
  .information-item_subtitle {
    font-size: 16px;
  }
}

@media (max-width: 990px) {
  .animation-text {
    font-size: 24px;
  }

  .word-rotator_item {
    font-size: 24px;
  }

  .extra-info {
    font-size: 18px;
  }

  .information {
    column-gap: 0;
    justify-content: center;
  }

  .information_item {
    width: 45%;
  }

  .information-item_title {
    font-size: 34px;
  }
  .information-item_subtitle {
    font-size: 15px;
  }

  .topics {
    margin: 60px auto;
  }

  .topic {
    padding: 20px;
    height: 290px;
    width: 295px;
  }
  .topic_title {
    font-size: 25px;
  }

  .topic-icon {
    padding: 35px;
    font-size: 40px;
  }
}

@media (max-width: 840px) {
  .animation-text {
    flex-direction: column;
    row-gap: 5px;
    justify-content: center;
  }

  .description {
    width: fit-content;
  }
}

@media (max-width: 770px) {
  .title {
    font-size: 63px;
  }

  .subtitle {
    font-size: 28px;
  }

  .description {
    font-size: 18px;
    padding: 0 30px;
  }

  .sessions {
    padding: 0px 20px;
  }

  .topic {
    padding: 15px;
    height: 270px;
    width: 265px;
  }
  .topic_title {
    font-size: 25px;
  }

  .topic-icon {
    padding: 35px;
    font-size: 35px;
    transform: translate(-50%, -170%);
  }

  .hover-border {
    transform: translate(-50%, -150%);
    padding: 57px 60px;
  }
}

@media (max-width: 425px) {
  .title {
    font-size: 40px;
    padding: 0 20px;
  }

  .session_title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 22px;
    padding: 0px 15px;
  }

  .description {
    font-size: 14px;
    padding: 0 60px;
  }

  .animation-text {
    padding: 20px 10px;
    font-size: 18px;
  }

  .word-rotator {
    padding: 20px 10px;
  }

  .word-rotator_item {
    font-size: 18px;
  }

  .sessions {
    padding: 0px 20px;
  }

  .information {
    padding: 40px;
  }

  .information_item {
    width: 50%;
  }

  .information-item_title {
    font-size: 32px;
  }

  .extra-info {
    margin: 0;
    font-size: 14px;
    padding: 0 60px;
  }

  .topic {
    padding: 10px;
    height: 220px;
    width: 220px;
  }
  .topic_title {
    font-size: 20px;
  }

  .topic_description {
    font-size: 11px;
    padding: 0 15px;
  }

  .topic-icon {
    padding: 25px;
    font-size: 30px;
    width: fit-content;
    transform: translate(-50%, -170%);
  }
}

@media (max-width: 375px) {
  .description {
    padding: 0 10px;
    font-size: 16px;
  }

  .title {
    font-size: 35px;
  }
}
</style>
