<template>
  <div class="main-section">
    <div class="content">
      <div class="section-one">
        <div class="section_title">And there's <b>more</b></div>
        <div class="questions">
          <div class="left">
            <div class="question" v-for="question in leftQuestions">
              <div class="question-image">
                <i class="question_icon" :class="question.icon"></i>
              </div>
              <div class="question_text">
                <div class="question_text-title">{{ question.title }}</div>
                <div class="question_text-description">
                  {{ question.description }}
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="question" v-for="question in rightQuestions">
              <div class="question-image">
                <i class="question_icon" :class="question.icon"></i>
              </div>
              <div class="question_text">
                <div class="question_text-title">{{ question.title }}</div>
                <div class="question_text-description">
                  {{ question.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section-two">
        <div class="section_title">and more...</div>
        <div class="accordion">
          <div
            class="accordion_item"
            v-for="accordion in accordionItems"
            @click="accordion.isOpen = !accordion.isOpen"
            :class="{
              [`opened-${accordion.counter}`]: accordion.isOpen,
            }"
          >
            <div class="header">
              <i class="accordion_icon" :class="accordion.icon"></i>
              <div class="accordion_title">{{ accordion.title }}</div>
            </div>
            <div
              class="accordion_content"
              :class="{
                opened: !accordion.opened,
              }"
            >
              {{ accordion.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const accordionItems = reactive([
  {
    title: "Our aim",
    content: `
        Our main aim is to help promote friendship and understanding amongst native speakers and learners of English as a foreign / second language.
        Our motto is, "We do what we can, when we can."`,
    isOpen: false,
    icon: "fa-solid fa-bullseye",
    counter: "one",
  },
  {
    title: "Our mission",
    content: `
        Our mission is to enable EFL / ESL learners to take control of their own English learning process, and to promote the use of technology for learning and for teaching.
        Our slogan is, "Created for you. Inspired by you."`,
    isOpen: false,
    icon: "fa-solid fa-rocket",
    counter: "two",
  },
  {
    title: "Our vision",
    content: `
        Our vision is to become the premier free EFL / ESL resource on the web.
        Let's see what we can do together.
    `,
    isOpen: false,
    icon: "fa-solid fa-binoculars",
    counter: "three",
  },
  {
    title: "About us",
    content: `
        The Learn English Network is a not-for-profit organisation registered in the UK.
        We are a voluntary organisation, and we do what we do for the love of English.
        We run a network of web sites and online services, with the help of our volunteers,
        all aimed at helping people to learn English and gain confidence. The Learn English
        Network offers English grammar and extensive English vocabulary sections, along with
        free lessons for beginners, a free English magazine, diary, games, lessons and tests
        , and an insight into British culture, traditions and customs. We run several blogs, a Facebook
        page and a Google plus page and community (with badges), all aimed at helping you to build your
        vocabulary, grammar, and all things ESL, but most importantly encouraging active members 
        to help each other and to become E-pals.
    `,
    isOpen: false,
    icon: "fa-solid fa-users",
    counter: "four",
  },
  {
    title: "Disclaimer",
    content: `
        The Learn English Network has been created for education purposes only. Whilst we make every effort to ensure that the information contained
        on our web sites is accurate, and secure, we accept no reponsiblity or liability for its use. In addition when providing links to other sites,
        we take no responsibility as to their suitability, or content as this does not come under our control. Please contact us to let us know if we need to change anything.
    `,
    isOpen: false,
    icon: "fa-solid fa-balance-scale",
    counter: "five",
  },
]);

const leftQuestions = reactive([
  {
    title: "Кто?",
    description: "Мы преподаватели английского языка и изучающие языки.",
    icon: "fa-solid fa-mask",
  },
  {
    title: "Что?",
    description: "Чтение, аудирование, разговор, письмо.",
    icon: "fa-solid fa-microscope",
  },
  {
    title: "Где?",
    description: "Все, что мы делаем, мы делаем онлайн.",
    icon: "fa-solid fa-compass",
  },
  {
    title: "Когда?",
    description: "Все наши сеансы расписаны в календаре",
    icon: "icon-calendar",
  },
]);

const rightQuestions = reactive([
  {
    title: "Как?",
    description: "С помощью волонтеров и спонсоров.",
    icon: "fa-solid fa-gear",
  },
  {
    title: "Почему?",
    description: "Почему бы и нет",
    icon: "fa-solid fa-child",
  },
  {
    title: "Сколько?",
    description:
      "Нисколько. Во всем, что мы делаем, можно свободно присоединиться или принять участие.",
    icon: "fa-solid fa-money-bill",
  },
  {
    title: "Зачем?",
    description: "Из-за любви к английскому языку",
    icon: "fa-solid fa-hand-holding-heart",
  },
]);
</script>

<style scoped>
.main-section {
  margin: 40px auto;
  padding: 15px;
  width: 100%;
}

.content {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.section-one,
.section-two {
  padding: 0 15px;
}

.section_title {
  margin-bottom: 32px;
  font-size: 35px;
  font-weight: 400;
  font-family: "Open Sans", Arial, sans-serif;
}

.questions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left,
.right {
  width: 50%;
}

.left {
  padding-right: 15px;
}

.right {
  padding-left: 15px;
}

.question {
  display: flex;
  width: 350px;
}
.question_icon {
  font-size: 35px;
  padding: 13px;
  color: #1544c0;
}
.question_text {
  padding-left: 15px;
}
.question_text-title {
  font-size: 23px;
  font-weight: 700;
  padding-top: 12px;
}
.question_text-description {
  margin-top: 10px;
  color: #777;
  font-size: 19px;
  margin-bottom: 24px;
}

.accordion_item {
  margin-top: 10px;
  padding: 5px;
  width: 450px;
  border-radius: 8px;
  background-color: #f7f7f7;
  overflow: hidden;
  height: 67px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
.header {
  display: flex;
  align-items: center;
  padding: 16px 26px;
}
.accordion_icon {
  font-size: 23px;
  margin-right: 10px;
  color: #1544c0;
}
.accordion_title {
  font-size: 23px;
  color: #212529;
  font-weight: 700;
}
.accordion_content {
  background-color: #fff;
  color: #777;
  line-height: 33px;
  padding: 35px;
  transition: 0.4s ease-in-out;
  font-size: 17px;
}

.opened-one {
  height: 305px;
}

.opened-two {
  height: 340px;
}

.opened-three {
  height: 240px;
}

.opened-four {
  height: 833px;
}
.opened-five {
  height: 503px;
}

@media (max-width: 1550px) {
  .section_title {
    font-size: 30px;
  }

  .question_icon {
    font-size: 29px;
  }

  .question_text-title {
    font-size: 19px;
  }
  .question_text-description {
    font-size: 16px;
  }
  .header {
    padding: 14px 24px;
  }

  .accordion_item {
    height: 58px;
    width: 400px;
  }
  .accordion_title {
    font-size: 19px;
  }
  .accordion_content {
    font-size: 16px;
  }
}

@media (max-width: 1270px) {
  .accordion_item {
    width: 340px;
  }

  .question_icon {
    padding: 10px;
    font-size: 28px;
  }
  .question_text-title {
    font-size: 17px;
  }

  .question_text-description {
    font-size: 15px;
  }

  .question {
    width: 300px;
  }
}

@media (max-width: 990px) {
  .content {
    flex-direction: column;
    align-items: center;
  }

  .question {
    width: 350px;
  }

  .accordion_item {
    width: 100%;
  }

  .question_icon {
    padding: 10px;
    font-size: 26px;
  }
  .question_text-title {
    font-size: 15px;
  }

  .question_text-description {
    font-size: 13px;
  }

  .accordion_title {
    font-size: 16px;
  }
  .accordion_content {
    font-size: 14px;
  }
}

@media (max-width: 770px) {
  .content {
    flex-direction: column;
    align-items: center;
  }

  .question {
    width: 330px;
  }

  .accordion_item {
    width: 100%;
  }

  .question_icon {
    padding: 10px;
    font-size: 26px;
  }
  .question_text-title {
    font-size: 15px;
  }

  .question_text-description {
    font-size: 13px;
  }

  .accordion_title {
    font-size: 16px;
  }
  .accordion_content {
    font-size: 14px;
  }
}

@media (max-width: 450px) {
  .section-one {
    padding-left: 15px;
  }
  .questions {
    flex-direction: column;
  }

  .right {
    padding: 0;
  }

  .section_title {
    font-size: 28px;
  }

  .question_text {
    padding-left: 5px;
    padding-right: 5px;
  }

  .question_text-title {
    padding: 0;
  }

  .question_text-description {
    margin: 5px 0px 24px 0px;
  }

  .accordion_title {
    font-size: 16px;
  }
  .accordion_content {
    font-size: 14px;
  }

  .header {
    padding: 10px 20px;
  }

  .accordion_item {
    height: 45px;
  }

  .accordion_icon {
    font-size: 20px;
  }

  .accordion_title {
    font-size: 14px;
  }

  .section-two {
    width: 95%;
  }
}

@media (max-width: 320px) {
  .section_title {
    font-size: 25px;
  }

  .question_text {
    padding: 0;
  }

  .section-one {
    width: 100%;
    padding: 0;
  }

  .question_text-description {
    padding-right: 20px;
  }
}
</style>
