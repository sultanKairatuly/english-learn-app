<template>
  <div class="container">
    <div class="banner">
      <div class="banner_title">{{ currentTest.topic }}</div>
    </div>
    <div class="content">
      <div class="test_container">
        <div class="tests">
          <div
            class="test"
            :key="test"
            v-for="(test, index) in currentTest.questions"
          >
            <div class="test_question">
              {{ index + 1 }}. {{ currentTest.questions[index] }}
            </div>
            <div class="test_options">
              <div
                class="test_option"
                @click="userAnswers[index] = option"
                v-for="option in currentTest.options[index]"
                :class="{
                  chosen: userAnswers[index] === option,
                }"
                :key="option"
              >
                <input
                  class="option_input"
                  type="radio"
                  :name="currentTest.options[index]"
                  :value="option"
                  v-model="userAnswers[index]"
                />
                {{ formattedOption(option, index) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="check-btn" @click="checkTest">Проверить</button>
      <div
        class="results_container"
        :class="{
          showed: check,
        }"
      >
        <div class="user-results">
          <h3 class="result_title">
            Твой результат {{ correct }}/{{ userAnswers.length }}
          </h3>
          <div class="show-answers" @click="showAnswers = true">
            Показать ответы
          </div>
          <div
            class="answers"
            :class="{
              showed: showAnswers,
            }"
          >
            <div
              class="answer"
              :key="test"
              v-for="(test, index) in currentTest.questions"
            >
              <div class="answer_question">
                {{ index + 1 }}. {{ currentTest.questions[index] }}
              </div>
              <div class="test_options">
                <div
                  class="answer_option"
                  v-for="option in currentTest.options[index]"
                  :key="option"
                  :class="{
                    wrong: option === userAnswers[index],
                    correct:
                      answers[index].toLowerCase() === option.toLowerCase(),
                  }"
                >
                  <input
                    class="option_input"
                    type="radio"
                    :name="currentTest.options[index]"
                    :value="option"
                    :checked="
                      answers[index].toLowerCase() === option.toLowerCase()
                    "
                  />
                  {{ formattedOption(option, index) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useCapitalize } from "../composables/capitalize";

const check = ref(false);
const showAnswers = ref(false);
const store = useStore();
const correct = ref(0);
const { capitalize } = useCapitalize();
const currentTest = computed(() => {
  return store.state.testData.filter(
    (item) =>
      item.topic.toLowerCase() === store.state.testTopic.title.toLowerCase()
  )[0];
});
const userAnswers = reactive([]);
const answers = computed(() => currentTest.value.answers);

for (let i = 0; i < currentTest.value.questions.length; i++) {
  userAnswers.push("");
}

function formattedOption(option, index) {
  if (currentTest.value.questions[index].startsWith("_")) {
    return capitalize(option);
  } else {
    return option;
  }
}

function checkTest() {
  if (!check.value) {
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer.toLowerCase() === answers.value[index].toLowerCase()) {
        correct.value++;
      }
    });

    check.value = true;
  } else {
    return;
  }
}

const chosen = computed(() =>
  store.state.theme.isDark ? "#8774e1" : "#1554c0"
);
</script>

<style scoped>
.container {
  background-color: #ffbbbb;
}
.banner {
  padding: 70px;
  width: 100%;
  background-color: #f7f7f7;
}

.banner_title {
  font-size: 40px;
  font-weight: 500;
  text-align: center;
}

.content {
  background-color: #fff;
  min-height: 100vh;
  height: 100%;
  padding: 100px;
  max-width: 1000px;
  margin: 0 auto;
}

.test_container {
  margin: 0 auto;
}

.test {
  margin-bottom: 50px;
}
.test_question {
  font-size: 30px;
  margin-bottom: 30px;
}

.test_option {
  font-size: 26px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 5px solid #f7f7f7;
  border-radius: 15px;
  font-weight: 500;
  cursor: pointer;
}
.option_input {
  -webkit-appearance: none;
  appearance: none;
  background-color: #f7f7f7;
  margin: 0;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  margin-right: 10px;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  padding: 10px;
  transform: translateY(3px);
  border: none;
}

.option_input:checked {
  background-color: rgb(26, 235, 172);
}

.option_input:checked::before {
  transform: scale(1);
}

.check-btn {
  background-color: rgb(20, 187, 20);
  color: #fff;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  padding: 20px 30px;
  width: fit-content;
  margin: 100px auto;
  cursor: pointer;
  font-size: 20px;
  display: block;
}

.wrong {
  border: 2px solid red;
}

.correct {
  border: 2px solid green;
}

.results_container {
  transition: 0.4s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.answers {
  opacity: 0;
  visibility: hidden;
  transition: 0.4s ease-in-out;
}

.result_title {
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  margin: 40px 0;
}
.show-answers {
  background-color: #1544c0;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  padding: 30px;
  cursor: pointer;
  width: fit-content;
  margin: 40px auto;
}

.answer_question {
  font-size: 25px;
  margin-bottom: 20px;
}
.test_options {
  font-size: 20px;
}
.answer_option {
  margin-top: 30px;
  padding: 30px;
  border-radius: 15px;
}

.answer {
  margin-bottom: 40px;
}

.showed {
  opacity: 1;
  visibility: visible;
}

.dark .content {
  background-color: #1e2833;
}

.dark .container {
  background-color: #253240;
}

.dark .banner_title {
  color: #fff;
}

.dark .banner {
  background-color: #1f262e;
}

.dark .test_option {
  background-color: #2d3742;
  border: 5px solid #5d6670;
  color: #fff;
}

.dark .test_question {
  color: #fff;
}

.dark .answer_question {
  color: #fff;
}

.dark .answer_option {
  background-color: #2d3742;
  color: #fff;
}

.chosen {
  border: 5px solid #1544c0;
}

.dark .chosen {
  border: 5px solid #8774e1;
}

.dark .result_title {
  color: #fff;
}

.dark .show-answers {
  background-color: #8774e1;
}

@media (max-width: 770px) {
  .banner {
    padding: 60px;
  }

  .banner_title {
    font-size: 38px;
  }

  .test_question {
    font-size: 28px;
  }

  .test_option {
    font-size: 24px;
  }
}

@media (max-width: 450px) {
  .content {
    padding: 50px 30px;
  }
  .banner {
    padding: 50px;
  }

  .banner_title {
    font-size: 34px;
  }

  .test_question {
    font-size: 25px;
  }

  .test_option {
    font-size: 22px;
    padding: 15px;
  }

  .check-btn {
    font-size: 18px;
    margin: 70px auto;
  }

  .result_title {
    font-size: 25px;
  }

  .show-answers {
    padding: 25px;
  }

  .answer_question {
    font-size: 21px;
  }

  .answer_option {
    margin-top: 25px;
    padding: 25px;
    font-size: 20px;
    border-radius: 15px;
  }
}

@media (max-width: 375px) {
  .content {
    padding: 50px 20px;
  }
  .banner {
    padding: 40px;
  }

  .banner_title {
    font-size: 30px;
  }

  .test_question {
    font-size: 22px;
  }

  .test_option {
    font-size: 20px;
    padding: 12px;
  }

  .check-btn {
    font-size: 16px;
    margin: 50px auto;
  }

  .result_title {
    font-size: 22px;
  }

  .show-answers {
    padding: 20px;
  }

  .answer_question {
    font-size: 18px;
  }

  .answer_option {
    margin-top: 25px;
    padding: 20px;
    font-size: 18px;
    border-radius: 15px;
  }
}

@media (max-width: 320px) {
  .content {
    padding: 40px 10px;
  }
  .banner {
    padding: 30px;
  }

  .banner_title {
    font-size: 27px;
  }

  .test_question {
    font-size: 20px;
  }

  .test_option {
    font-size: 18px;
    padding: 10px;
  }

  .check-btn {
    font-size: 14px;
    margin: 40px auto;
  }

  .result_title {
    font-size: 20px;
  }

  .show-answers {
    padding: 18px;
  }

  .answer_question {
    font-size: 16px;
  }

  .answer_option {
    margin-top: 20px;
    padding: 17px;
    font-size: 16px;
    border-radius: 15px;
  }
}
</style>
