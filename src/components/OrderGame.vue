<template>
  <audio ref="fireworksAudio">
    <source
      src="../assets/fireworkssound/Multiple-FireWorks-with-Whistling-www.fesliyanstudios.com.mp3"
    />
  </audio>
  <audio ref="pickAudio">
    <source src="../assets/picksound/mixkit-arcade-game-jump-coin-216.wav" />
  </audio>
  <audio ref="failAudio">
    <source
      src="../assets/failsound/error-when-entering-the-game-menu-132111.mp3"
    />
  </audio>
  <audio ref="successAudio">
    <source src="../assets/successsound/interface-124464.mp3" />
  </audio>
  <div
    class="modal flex-center"
    :class="{
      showed: isCheckModal,
    }"
  >
    <div class="pyro" v-if="isPyro">
      <div class="before"></div>
      <div class="after"></div>
    </div>
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
        :class="{
          invisible: faded,
        }"
      >
        <h4 class="subtitle">Что это?</h4>
        <div class="circle">
          <img class="image" :src="require(`../${item.url}`)" />
        </div>
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

const isPyro = ref(false);
const fireworksAudio = ref(null);
const pickAudio = ref(null);
const failAudio = ref(null);
const successAudio = ref(null);
const isCheckModal = ref(false);
const rightAnswers = ref(0);
const level = ref(10);
const faded = ref(false);
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
    url: "assets/order-images/nurse.png",
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
  pickAudio.value.pause();
  pickAudio.value.currentTime = 0;
  pickAudio.value.play();
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === "") {
      cells[i] = letterItem.letter;
      break;
    }
  }
  if (correctWord.value === cells.join("").toLowerCase()) {
    nextLevel();
  } else if (cells.join("").toLowerCase().length === correctWord.value.length) {
    failAudio.value.pause();
    failAudio.value.currentTime = 0;
    failAudio.value.play();
  }
}

function nextLevel() {
  faded.value = true;
  setTimeout(() => {
    faded.value = false;
  }, 100);
  rightAnswers.value++;
  successAudio.value.pause();
  successAudio.value.currentTime = 0;
  successAudio.value.play();
  if (level.value !== 10) {
    level.value++;

    chosenLetters = [];
    for (let i = 0; i < letterByLevel.value.length; i++) {
      cells[i] = "";
    }
    cells.length = letterByLevel.value.length;
  } else {
    isCheckModal.value = true;
    isPyro.value = true;
    setTimeout(() => {
      fireworksAudio.value.pause();
      fireworksAudio.value.currentTime = 0;
      fireworksAudio.value.play();
    }, 500);
    setTimeout(() => {
      isPyro.value = false;
    }, fireworksAudio.value.duration * 1000);
  }
}

function removeLetterFromCell(letter, index) {
  pickAudio.value.pause();
  pickAudio.value.currentTime = 0;
  pickAudio.value.play();
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
  fireworksAudio.value.pause();
  fireworksAudio.value.currentTime = 0;
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

.pyro {
  z-index: 300;
}

.content_item {
  transition: 0.5s ease-in-out;
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

.btns {
  margin-bottom: 30px;
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
}

.cells {
  display: flex;
  justify-content: center;
  column-gap: 10px;
  flex-wrap: wrap;
  padding: 0 10px;
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
  flex-wrap: wrap;
  row-gap: 15px;
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
  transition: 0.4s ease-in-out;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.719);
  opacity: 0;
  visibility: hidden;
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
  text-transform: uppercase;
  font-weight: 500;
  width: fit-content;
}

.showed {
  opacity: 1;
  visibility: visible;
  z-index: 100;
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

.subtitle {
  font-size: 40px;
  text-align: center;
  margin: 30px;
  font-weight: 500;
}

.circle {
  border-radius: 20px;
  overflow: hidden;
  width: fit-content;
  margin: 30px auto;
}

@media (max-width: 1440px) {
  .title {
    font-size: 55px;
    margin: 45px;
  }

  .content {
    width: 70%;
  }

  .fa-question {
    font-size: 36px;
  }
  .image {
    width: 400px;
    height: 400px;
    object-fit: cover;
  }

  .cell {
    padding: 15px;
    font-size: 21px;
  }

  .letter {
    padding: 20px 30px;
    font-size: 21px;
  }

  .modal_content {
    padding: 50px;
    width: 60vw;
    height: 500px;
    background-color: #fff;
    z-index: 110;
  }

  .again {
    font-size: 18px;
  }

  .result_title {
    font-size: 45px;
  }

  .finish_title {
    font-size: 35px;
    margin: 50px 0;
  }

  .subtitle {
    font-size: 37px;
    text-align: center;
    margin: 30px;
    font-weight: 500;
  }
}

@media (max-width: 1024px) {
  .title {
    font-size: 50px;
    margin: 40px;
  }

  .content {
    width: 70%;
  }

  .fa-question {
    font-size: 34px;
  }
  .image {
    width: 370px;
    height: 370px;
    object-fit: cover;
  }

  .cell {
    padding: 12px;
    font-size: 20px;
    width: 85px;
    height: 85px;
  }

  .letter {
    padding: 20px 27px;
    font-size: 19px;
  }

  .modal_content {
    width: 65vw;
  }

  .again {
    font-size: 16px;
  }

  .result_title {
    font-size: 40px;
  }

  .finish_title {
    font-size: 30px;
    margin: 40px 0;
  }

  .subtitle {
    font-size: 33px;
    text-align: center;
    margin: 30px;
    font-weight: 500;
  }
}

@media (max-width: 780px) {
  .title {
    text-align: center;
  }

  .content {
    margin: 70px auto;
  }
}

@media (max-width: 450px) {
  .title {
    font-size: 37px;
  }

  .content {
    padding: 10px;
    margin: 40px auto;
  }

  .image {
    width: 280px;
    height: 280px;
  }

  .cell {
    height: 70px;
    padding: 0 20px;
  }

  .cells {
    width: 100%;
    column-gap: 5px;
  }

  .cell {
    padding: 0;
    width: 45px;
    height: 50px;
  }

  .letters {
    column-gap: 10px;
    width: 100%;
  }

  .letter {
    padding: 18px 20px;
    font-size: 14px;
  }

  .fa-question {
    font-size: 25px;
  }

  .to-menu {
    padding: 16px;
    font-size: 15px;
  }

  .modal_content {
    width: 95vw;
    padding: 30px;
  }

  .content {
    width: 95%;
  }

  .again {
    font-size: 14px;
  }

  .result_title {
    font-size: 25px;
  }

  .finish_title {
    font-size: 18px;
    margin: 25px 0;
  }

  .subtitle {
    font-size: 24px;
  }
}

@media (max-width: 375px) {
  .title {
    font-size: 30px;
  }

  .image {
    width: 230px;
    height: 230px;
  }
}

@media (max-width: 320px) {
  .letters {
    column-gap: 5px;
  }
}

@media (max-width: 250px) {
  .image {
    width: 180px;
    height: 180px;
  }
}

.pyro > .before,
.pyro > .after {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: -120px -218.66667px blue, 248px -16.66667px #00ff84,
    190px 16.33333px #002bff, -113px -308.66667px #ff009d,
    -109px -287.66667px #ffb300, -50px -313.66667px #ff006e,
    226px -31.66667px #ff4000, 180px -351.66667px #ff00d0,
    -12px -338.66667px #00f6ff, 220px -388.66667px #99ff00,
    -69px -27.66667px #ff0400, -111px -339.66667px #6200ff,
    155px -237.66667px #00ddff, -152px -380.66667px #00ffd0,
    -50px -37.66667px #00ffdd, -95px -175.66667px #a6ff00,
    -88px 10.33333px #0d00ff, 112px -309.66667px #005eff,
    69px -415.66667px #ff00a6, 168px -100.66667px #ff004c,
    -244px 24.33333px #ff6600, 97px -325.66667px #ff0066,
    -211px -182.66667px #00ffa2, 236px -126.66667px #b700ff,
    140px -196.66667px #9000ff, 125px -175.66667px #00bbff,
    118px -381.66667px #ff002f, 144px -111.66667px #ffae00,
    36px -78.66667px #f600ff, -63px -196.66667px #c800ff,
    -218px -227.66667px #d4ff00, -134px -377.66667px #ea00ff,
    -36px -412.66667px #ff00d4, 209px -106.66667px #00fff2,
    91px -278.66667px #000dff, -22px -191.66667px #9dff00,
    139px -392.66667px #a6ff00, 56px -2.66667px #0099ff,
    -156px -276.66667px #ea00ff, -163px -233.66667px #00fffb,
    -238px -346.66667px #00ff73, 62px -363.66667px #0088ff,
    244px -170.66667px #0062ff, 224px -142.66667px #b300ff,
    141px -208.66667px #9000ff, 211px -285.66667px #ff6600,
    181px -128.66667px #1e00ff, 90px -123.66667px #c800ff,
    189px 70.33333px #00ffc8, -18px -383.66667px #00ff33,
    100px -6.66667px #ff008c;
  -moz-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards,
    1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@-webkit-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white;
  }
}
@-moz-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white;
  }
}
@-o-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white;
  }
}
@-ms-keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white;
  }
}
@keyframes bang {
  from {
    box-shadow: 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white, 0 0 white,
      0 0 white, 0 0 white, 0 0 white;
  }
}
@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-webkit-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-moz-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-o-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-ms-keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@keyframes position {
  0%,
  19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }

  20%,
  39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }

  40%,
  59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }

  60%,
  79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }

  80%,
  99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
</style>
