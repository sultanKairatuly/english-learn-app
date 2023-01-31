<template>
  <audio ref="failAudio">
    <source
      src="../assets/failsound/error-when-entering-the-game-menu-132111.mp3"
    />
  </audio>
  <audio ref="successAudio">
    <source src="../assets/successsound/interface-124464.mp3" />
  </audio>
  <div class="container">
    <h1 class="title">Quiz game</h1>
    <div class="content">
      <div
        class="questions"
        v-if="counter < A1EnglishWords.length && lives > 0"
      >
        <div class="answers">{{ counter }}/{{ A1EnglishWords.length }}</div>
        <div class="lives">
          <i
            class="fa-sharp fa-solid fa-heart like"
            v-for="live in 3"
            :key="live"
            :class="{
              active: live <= lives,
              shaking: live > lives,
            }"
          ></i>
        </div>
        <div class="task">
          <div
            class="word-to-guess"
            :class="{
              faded: faded,
            }"
          >
            {{ wordToGuess }}
          </div>
          <div
            class="word-list"
            :class="{
              faded: faded,
            }"
          >
            <div
              class="word-list_item"
              @click="chooseWord(word.value, wordToGuess)"
              v-for="word in wordList"
              :key="word.id"
              :class="{
                correct: correctWord === word,
              }"
            >
              {{ word.value }}
            </div>
          </div>
        </div>
      </div>
      <FinishBlock
        v-else-if="counter <= A1EnglishWords.length && lives > 0"
        @restart="restart"
      >
        <template #result
          ><div class="congrats">
            Поздравляю, вы успешно прошли этот уровень :)
          </div>
        </template>
      </FinishBlock>
      <FinishBlock v-else @restart="restart">
        <template #result>
          <div class="congrats">
            К сожалению, вы потратили все свои попытки :(
          </div>
        </template>
      </FinishBlock>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import FinishBlock from "../components/FinishBlock.vue";
import { useManualPageLoader } from "../composables/manualPageLoader";

const { load } = useManualPageLoader();
const failAudio = ref(null);
const successAudio = ref(null);
const store = useStore();
const lives = ref(3);
const correctWord = ref(null);
const counter = ref(1);
const faded = ref(false);
const translations = reactive([
  {
    level: "A1",
    words: [
      {
        en: "dog",
        ru: "собака",
      },
      {
        en: "to see",
        ru: "видеть",
      },
      {
        en: "to feel",
        ru: "чуствовать",
      },
      {
        en: "to hear",
        ru: "слышать",
      },
      {
        en: "to love",
        ru: "любить",
      },
      {
        en: "to hate",
        ru: "ненавидеть",
      },
      {
        en: "to cry",
        ru: "плакать",
      },
      {
        en: "water",
        ru: "вода",
      },
      {
        en: "fire",
        ru: "огонь",
      },
      {
        en: "family",
        ru: "семья",
      },
    ],
  },
  {
    level: "A2",
    words: [
      {
        en: "door",
        ru: "дверь",
      },
      {
        en: "to shoot",
        ru: "стрелять",
      },
      {
        en: "forest",
        ru: "лес",
      },
      {
        en: "beast",
        ru: "чудище",
      },
      {
        en: "tie",
        ru: "галстук",
      },
      {
        en: "to feed",
        ru: "кормить",
      },
      {
        en: "to confuse",
        ru: "путаться",
      },
      {
        en: "umbrella",
        ru: "зонт",
      },
      {
        en: "fear",
        ru: "страх",
      },
      {
        en: "enormous",
        ru: "гигантский",
      },
      {
        en: "customer",
        ru: "покупатель",
      },
      {
        en: "accept",
        ru: "принимать",
      },
    ],
  },
  {
    level: "B1",
    words: [
      {
        en: "to apologize",
        ru: "извиняться",
      },
      {
        en: "roast",
        ru: "жаренный",
      },
      {
        en: "boiling",
        ru: "варенный",
      },
      {
        en: "dissapointed",
        ru: "расстроенный",
      },
      {
        en: "devastating",
        ru: "ухудшающийся",
      },
      {
        en: "villager",
        ru: "житель",
      },
      {
        en: "taste",
        ru: "вкус",
      },
      {
        en: "favour",
        ru: "одолжение",
      },
      {
        en: "inject",
        ru: "внедрять",
      },
      {
        en: "jail",
        ru: "тюрьма",
      },
      {
        en: "laugher",
        ru: "смех",
      },
      {
        en: "bizare",
        ru: "причудливый",
      },
      {
        en: "majestic",
        ru: "замечательно",
      },
      {
        en: "coach",
        ru: "тренер",
      },
      {
        en: "sick",
        ru: "больной",
      },
    ],
  },
  {
    level: "B2",
    words: [
      {
        en: "giggle",
        ru: "хихикать",
      },
      {
        en: "abyss",
        ru: "бездна",
      },
      {
        en: "regret",
        ru: "сожалеть",
      },
      {
        en: "event",
        ru: "событие",
      },
      {
        en: "prevent",
        ru: "предотвратить",
      },
      {
        en: "push up",
        ru: "отжиматься",
      },
      {
        en: "pull up",
        ru: "подтягиваться",
      },
      {
        en: "elbow",
        ru: "локоть",
      },
      {
        en: "knee",
        ru: "колено",
      },
      {
        en: "separate",
        ru: "разделить",
      },
      {
        en: "swallow",
        ru: "глотать",
      },
      {
        en: "glocery",
        ru: "перчатки",
      },
      {
        en: "shining",
        ru: "блестящий",
      },
      {
        en: "abandon",
        ru: "забросить",
      },
      {
        en: "absorb",
        ru: "впитывать",
      },
      {
        en: "accidental",
        ru: "случайно",
      },
    ],
  },
  {
    level: "C1",
    words: [
      {
        en: "to incise",
        ru: "надрезать",
      },
      {
        en: "to assuage",
        ru: "усмирять",
      },
      {
        en: "to abscond",
        ru: "скрыться",
      },
      {
        en: "to jeopardize",
        ru: "ставить под угрозу",
      },
      {
        en: "to recant",
        ru: "отказаться от показаний",
      },
      {
        en: "to refute",
        ru: "опровергать",
      },
      {
        en: "to prevaricate",
        ru: "преувеличивать",
      },
      {
        en: "to ignoble",
        ru: "обольстить",
      },
      {
        en: "to disavow",
        ru: "отречься",
      },
      {
        en: "to unearth",
        ru: "раскопать",
      },
      {
        en: "to explode",
        ru: "взорвать",
      },
      {
        en: "to originate",
        ru: "зарождаться",
      },
      {
        en: "to depict",
        ru: "отобразить",
      },
      {
        en: "to pluck",
        ru: "вырывать",
      },
      {
        en: "to shrink",
        ru: "сокращаться",
      },
    ],
  },
  {
    level: "C2",
    words: [
      {
        en: "to entice",
        ru: "завлекать",
      },
      {
        en: "to pervade",
        ru: "понизывать",
      },
      {
        en: "to mold",
        ru: "лепить",
      },
      {
        en: "to unpick",
        ru: "распарывать",
      },
      {
        en: "to amass",
        ru: "накапливать",
      },
      {
        en: "to wrack",
        ru: "потревожить",
      },
      {
        en: "to lease",
        ru: "сдать в аренду",
      },
      {
        en: "to mesh",
        ru: "зацеплять",
      },
      {
        en: "to reminisce",
        ru: "вспоминать",
      },
      {
        en: "to venerate",
        ru: "почитать",
      },
      {
        en: "to rarefy",
        ru: "редеть",
      },
      {
        en: "to decree",
        ru: "постановить",
      },
      {
        en: "to hatch",
        ru: "вылупляться",
      },
      {
        en: "to inherit",
        ru: "унаследовать",
      },
      {
        en: "to stab",
        ru: "закалывать",
      },
    ],
  },
]);

const A1EnglishWords = computed(() => {
  const A1Translation = translations.find(
    (item) => item.level === store.state.level
  ).words;
  const A1Words = A1Translation.map((item) => item.en);
  return A1Words;
});

const A1RussianWords = computed(() => {
  const A1Translation = translations.find(
    (item) => item.level === store.state.level
  ).words;
  const A1Words = A1Translation.map((item) => item.ru);
  return A1Words;
});

function randomRussianWord() {
  const shuffled = _.shuffle(A1RussianWords.value);
  return shuffled[0];
}

const wordToGuess = ref(randomRussianWord());
let wordList = reactive(randomEnglishWords(wordToGuess.value));

function randomEnglishWords(ruWord) {
  const enWord = translations
    .find((item) => item.level === store.state.level)
    .words.filter((item) => item.ru === ruWord)[0].en;

  const shuffledWithCorrect = _.shuffle(
    _.shuffle(A1EnglishWords.value).slice(0, 2).concat([enWord])
  );
  return addWordsToObject(shuffledWithCorrect, enWord);
}

function addWordsToObject(wordsArray, rightWord) {
  let objectWithWords = {};

  for (let word of wordsArray) {
    if (word in objectWithWords) {
      const wordsArray = _.shuffle(
        _.shuffle(A1EnglishWords.value).slice(0, 2).concat([rightWord])
      );
      return addWordsToObject(wordsArray, rightWord);
    } else {
      objectWithWords[word] = {
        value: word,
        id: uuidv4(),
      };
    }
  }

  return objectWithWords;
}

function chooseWord(chosenWord, russianWord) {
  const enWord = translations
    .find((item) => item.level === store.state.level)
    .words.filter((item) => item.ru === russianWord)[0].en;

  if (chosenWord === enWord) {
    successAudio.value.pause();
    successAudio.value.currentTime = 0;
    successAudio.value.play();
    faded.value = true;
    setTimeout(() => {
      faded.value = false;
      wordToGuess.value = randomRussianWord();
      wordList = randomEnglishWords(wordToGuess.value);
      counter.value++;
    }, 300);
  } else {
    lives.value--;
    failAudio.value.currentTime = 0;
    failAudio.value.play();
    failAudio.value.play();
  }
}

function restart() {
  load();
  counter.value = 1;
  lives.value = 3;
}
</script>
<style scoped>
.task {
  display: flex;
  flex-direction: column;
  height: 40vh;
  justify-content: space-between;
}
.title {
  margin: 50px;
  font-size: 50px;
  color: red;
}
.content {
  width: 70vw;
  height: 50vh;
  background-color: #fff;
  border-radius: 3px;
  margin: 100px auto;
  padding: 50px;
  position: relative;
  box-shadow: 0px 0px 12px 3px rgba(34, 60, 80, 0.2);
}
.word-to-guess {
  font-size: 40px;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  transition: 0.2s ease-in-out;
}
.word-list {
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  justify-content: center;
  transition: 0.2s ease-in-out;
}

.questions {
  transition: 0.5s ease-in-out;
}

.visible {
  opacity: 0;
  visibility: visible;
}

.word-list_item {
  padding: 20px;
  background-color: #1544c0;
  color: #fff;
  text-transform: uppercase;
  font-size: 23px;
  width: 200px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.word-list_item:hover {
  background-color: #1650ee;
}

.lives {
  position: absolute;
  display: flex;
  column-gap: 10px;
  right: 20px;
  top: 20px;
}

.correct {
  background-color: green;
}

.like {
  font-size: 40px;
  color: rgb(131, 131, 131);
  transition: 0.1s ease-in;
}

.active {
  color: red;
}

.answers {
  position: absolute;
  left: 20px;
  top: 20px;
  font-weight: 500px;
  color: #000;
  font-size: 30px;
}

.faded {
  opacity: 0;
  visibility: hidden;
}

.shaking {
  animation: shake 0.5s;
}

.dark .content {
  background-color: #1e2833;
}

.dark .word-to-guess {
  color: #fff;
}

.dark .answers {
  color: #fff;
}

.dark .word-list_item {
  background-color: #8774ec;
}

.dark .congrats {
  color: #fff;
}



@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

@media (max-width: 1440px) {
  .congrats {
    font-size: 40px;
  }
  .title {
    margin: 30px;
    font-size: 40px;
    color: red;
  }

  .word-to-guess {
    font-size: 35px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    transition: 0.2s ease-in-out;
  }
  .word-list {
    row-gap: 20px;
  }

  .word-list_item {
    padding: 15px;
    background-color: #1544c0;
    color: #fff;
    text-transform: uppercase;
    font-size: 20px;
    width: 200px;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .lives {
    position: absolute;
    display: flex;
    column-gap: 10px;
    right: 20px;
    top: 20px;
  }

  .like {
    font-size: 35px;
    color: rgb(131, 131, 131);
    transition: 0.1s ease-in;
  }

  .active {
    color: red;
  }

  .answers {
    position: absolute;
    left: 20px;
    top: 20px;
    font-weight: 500px;
    color: #000;
    font-size: 30px;
  }
}

@media (max-width: 1024px) {
  .congrats {
    font-size: 30px;
  }
}

@media (max-width: 800px) {
  .title {
    margin: 30px;
    font-size: 35px;
    color: red;
  }

  .congrats {
    font-size: 30px;
  }

  .word-to-guess {
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    transition: 0.2s ease-in-out;
  }
  .word-list {
    row-gap: 20px;
  }

  .word-list_item {
    padding: 15px;
    background-color: #1544c0;
    color: #fff;
    text-transform: uppercase;
    font-size: 18px;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    text-align: center;
    transition: 0.3s ease-in-out;
  }

  .lives {
    position: absolute;
    display: flex;
    column-gap: 10px;
    right: 20px;
    top: 20px;
  }

  .like {
    font-size: 30px;
    color: rgb(131, 131, 131);
    transition: 0.1s ease-in;
  }

  .active {
    color: red;
  }

  .answers {
    position: absolute;
    left: 20px;
    top: 20px;
    font-weight: 500px;
    color: #000;
    font-size: 25px;
  }
}

@media (max-width: 640px) {
  .answers {
    left: 50%;
    transform: translateX(-50%);
  }

  .lives {
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    top: 70px;
  }

  .word-to-guess {
    margin-top: 70px;
    font-size: 28px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    transition: 0.2s ease-in-out;
  }
}

@media (max-width: 420px) {
  .word-to-guess {
    font-size: 25px;
    margin-top: 90px;
  }

  .content {
    padding: 40px;
  }
}

@media (max-width: 375px) {
  .word-to-guess {
    font-size: 23px;
  }

  .content {
    padding: 30px;
  }
}

@media (max-width: 320px) {
  .word-to-guess {
    font-size: 21px;
    margin-top: 110px;
  }

  .content {
    width: 95vw;
  }

  .title {
    font-size: 35px;
  }

  .content {
    padding: 15px;
  }

  .word-list_item {
    font-size: 17px;
  }
}

@media (max-width: 425px) {
  .congrats {
    font-size: 25px;
  }

  .title {
    text-align: center;
    font-size: 40px;
  }
}

@media (max-width: 800px) {
  .congrats {
    font-size: 20px;
  }
}
</style>
