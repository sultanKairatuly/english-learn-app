<template>
  <div class="modal flex-center" v-if="isCheckModal">
    <div class="modal_content">
      <h1 class="result_title">
        Ваш результат: {{ rightAnswers }}/{{ data.length }}
      </h1>
      <div class="success_block">
        <h1 class="finish_title">Вы успешно прошли этот уровень</h1>
        <div class="modal_btns">
          <div class="again" @click="tryAgain">
            <div class="again_title">Повторить</div>
            <i class="fa-solid fa-rotate-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <h1 class="title">Order game</h1>
    <div class="content">
      <div
        class="content_item"
        v-for="item in currentItemByLevel"
        :key="currentItemByLevel[0].id"
      >
        <img class="image" :src="require(`../${item.url}`)" />
        <div class="cells">
          <div
            class="cell"
            v-for="(cell, index) in letterByLevel.length"
            :key="cell + index"
            @click="removeLetterFromCell(cells[index], index)"
          >
            <i class="fa-solid fa-question" v-if="cells[index] === ''"></i>
            {{ cells[index] }}
          </div>
        </div>
        <div class="letters">
          <div
            class="letter"
            @click="addLetterToCell(item)"
            v-for="item in letterByLevel"
            :class="{
              invisible: chosenLetters.filter((el) => el.id === item.id).length,
            }"
            :key="item.id"
          >
            {{ item.letter }}
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <div class="to-menu" @click="$router.push('/games')">
        <div class="to-menu_title">другие игры</div>
        <i class="fa-solid fa-gamepad"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const isCheckModal = ref(false);
const rightAnswers = ref(0);
const level = ref(10);
const data = reactive([
  {
    level: 1,
    word: "Fire",
    letters: "fire".split(""),
    url: "assets/order-images/fire.png",
    id: uuidv4(),
  },
  {
    level: 2,
    word: "Jail",
    letters: "Jail".split(""),
    url: "assets/order-images/jail.jpg",
    id: uuidv4(),
  },
  {
    level: 3,
    word: "Nurse",
    letters: "Nurse".split(""),
    url: "assets/order-images/nurse.jpg",
    id: uuidv4(),
  },
  {
    level: 4,
    word: "Reaper",
    letters: "Reaper".split(""),
    url: "assets/order-images/reaper.jpeg",
    id: uuidv4(),
  },
  {
    level: 5,
    word: "Fearless",
    letters: "Fearless".split(""),
    url: "assets/order-images/fearless.png",
    id: uuidv4(),
  },
  {
    level: 6,
    word: "Abyss",
    letters: "Abyss".split(""),
    url: "assets/order-images/abyss.jpg",
    id: uuidv4(),
  },
  {
    level: 7,
    word: "Soldier",
    letters: "Soldier".split(""),
    url: "assets/order-images/soldier.png",
    id: uuidv4(),
  },
  {
    level: 8,
    word: "Smart",
    letters: "Smart".split(""),
    url: "assets/order-images/smart.jpg",
    id: uuidv4(),
  },
  {
    level: 9,
    word: "Athletic",
    letters: "Athletic".split(""),
    url: "assets/order-images/athletic.png",
    id: uuidv4(),
  },
  {
    level: 10,
    word: "Space",
    letters: "Space".split(""),
    url: "assets/order-images/space.jpg",
    id: uuidv4(),
  },
]);
const currentItemByLevel = computed(() => {
  return [data.find((item) => item.level === level.value)];
});

const correctWord = computed(() => {
  return currentItemByLevel.value[0].word.toLowerCase();
});

const letterByLevel = computed(() => {
  let array = currentItemByLevel.value[0].letters.map((item) => ({
    letter: item,
    id: uuidv4(),
  }));

  let shuffled = _.shuffle(array);
  return shuffled;
});

let cells = reactive([]);
let chosenLetters = reactive([]);

for (let i = 0; i < letterByLevel.value.length; i++) {
  cells.push("");
}

function addLetterToCell(letterItem) {
  chosenLetters.push(letterItem);
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      cells[i] = letterItem.letter;
      break;
    }
  }
  if (correctWord.value === cells.join("").toLowerCase()) {
    nextLevel();
  }
}

function nextLevel() {
  rightAnswers.value++;
  if (level.value !== 10) {
    level.value++;
    chosenLetters = [];
    for (let i = 0; i < letterByLevel.value.length; i++) {
      cells[i] = "";
    }
    cells.length = letterByLevel.value.length;
  } else {
    isCheckModal.value = true;
  }
}

function removeLetterFromCell(letter, index) {
  // chosenLetters = chosenLetters.filter((item) => item.letter !== letter);
  for (let i = 0; i < chosenLetters.length; i++) {
    let item = chosenLetters[i];
    if (item.letter === letter) {
      chosenLetters.splice(i, 1);
      break;
    }
  }
  cells[index] = "";
}

function tryAgain() {
  for (let i = 0; i < letterByLevel.value.length; i++) {
    cells[i] = "";
  }
  console.log(letterByLevel.value.length);
  level.value = 1;
  isCheckModal.value = false;
  chosenLetters = [];
}
</script>

<style scoped>
.title {
  font-size: 60px;
  font-weight: 700;
  margin: 50px;
  color: gold;
}

.content {
  margin: 100px auto;
  width: 60%;
  padding: 40px;
}

.to-menu {
  padding: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: flex;
  align-items: center;
  column-gap: 20px;
  background-color: #1544c0;
  width: fit-content;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 auto;
}

.fa-gamepad {
  font-size: 25px;
}

.fa-question {
  font-size: 40px;
}
.image {
  width: 450px;
  height: 450px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 30px;
}

.cells {
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
.cell {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 7px;
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
}

.letters {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  column-gap: 20px;
}

.letter {
  background-color: #236c9c;
  color: #fff;
  text-transform: uppercase;
  padding: 22px 30px;
  text-align: center;
  border-radius: 5px;
  font-size: 23px;
  font-weight: 700;
  cursor: pointer;
}

.invisible {
  opacity: 0;
  visibility: hidden;
}

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.719);
}

.modal_content {
  padding: 50px;
  width: 50vw;
  height: 500px;
  background-color: #fff;
  z-index: 110;
}

.again {
  background-color: #ff4500;
  padding: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin: 0 auto;
  font-size: 20px;
  width: fit-content;
}

.result_title {
  font-size: 50px;
  color: midnightblue;
}

.finish_title {
  font-size: 40px;
  text-transform: uppercase;
  margin: 50px 0;
  color: crimson;
  font-family: "Roboto", sans-serif;
}
</style>
