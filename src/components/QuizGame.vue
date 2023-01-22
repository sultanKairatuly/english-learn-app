<template>
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
            :class="{
              active: live <= lives,
            }"
          ></i>
        </div>
        <div class="word-to-guess">{{ wordToGuess }}</div>
        <div class="word-list">
          <div
            class="word-list_item"
            @click="chooseWord(word.value, wordToGuess)"
            v-for="word in wordList"
            :key="word.id"
          >
            {{ word.value }}
          </div>
        </div>
      </div>
      <FinishBlock
        v-else-if="counter <= A1EnglishWords.length && lives > 0"
        @restart="restart"
      >
        <template #result
          >Поздравляю, вы успешно прошли этот уровень :)</template
        >
      </FinishBlock>
      <FinishBlock v-else @restart="restart">
        <template #result
          >К сожалению, вы потратили все свои попытки :(</template
        >
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
import { assertFlowDeclaration } from "@babel/types";

const store = useStore();
const lives = ref(3);
const counter = ref(1);
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
  const object = {};

  const enWord = translations
    .find((item) => item.level === store.state.level)
    .words.filter((item) => item.ru === ruWord)[0].en;

  const shuffledWithCorrect = _.shuffle(
    A1EnglishWords.value.slice(0, 2).concat([enWord])
  );
  for (let word of shuffledWithCorrect) {
    object[word] = {
      value: word,
      id: uuidv4(),
    };
  }

  return object;
}

function chooseWord(chosenWord, russianWord) {
  const enWord = translations
    .find((item) => item.level === store.state.level)
    .words.filter((item) => item.ru === russianWord)[0].en;

  if (chosenWord === enWord) {
    wordToGuess.value = randomRussianWord();
    wordList = randomEnglishWords(wordToGuess.value);
    counter.value++;
  } else {
    lives.value--;
  }
}

function restart() {
  counter.value = 1;
  assertFlowDeclaration;
  lives.value = 3;
}
</script>
<style scoped>
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
  padding: 2vw;
  position: relative;
  box-shadow: 0px 0px 12px 3px rgba(34, 60, 80, 0.2);
}
.word-to-guess {
  font-size: 40px;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
}
.word-list {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
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

.like {
  font-size: 40px;
  color: rgb(131, 131, 131);
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
</style>
