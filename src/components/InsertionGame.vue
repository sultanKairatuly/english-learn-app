<template>
  <div class="modal flex-center" v-if="isCheckModal">
    <div class="modal_content">
      <h1 class="result_title">
        Ваш результат: {{ correct }}/{{ dragElements.length }}
      </h1>
      <div class="success_block">
        <h1 class="finish_title">Вы успешно прошли этот уровень</h1>
        <h1 class="finish_title" v-if="level !== 10">Вы прошли все уровни</h1>
        <div class="modal_btns">
          <div class="again" @click="tryAgain">
            <div class="again_title">Повторить</div>
            <i class="fa-solid fa-rotate-right"></i>
          </div>

          <div class="to-menu" @click="$router.push('/games')">
            <div class="to-menu_title">другие игры</div>
            <i class="fa-solid fa-gamepad"></i>
          </div>
          <div
            class="next-level"
            @click="nextLevel"
            :class="{
              passive: correct < dragElements.length,
            }"
            v-if="level !== 10"
          >
            <div class="next-level_title">Следующий уровень</div>
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="level">Уровень {{ level }}</div>
    <div
      class="check-message"
      :class="{
        'check-message_active': checkMessage,
      }"
    >
      <div class="content">
        <h3 class="check-message_title">
          Сначала подставьте все предметы в карточки
        </h3>
        <i class="fa-solid fa-xmark" @click="checkMessage = false"></i>
        <div
          class="progress-bar"
          :style="{
            width: progressBar,
          }"
        ></div>
      </div>
    </div>

    <PrimaryButton
      class="check"
      :class="{
        passive: droppedElements.length !== dragElements.length,
      }"
      @click="checkLevel"
    >
      Проверить
    </PrimaryButton>
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card.id">
        <div
          class="drop-area flex-center"
          :data-title="card.title"
          @dragover.prevent
          @drop.prevent="onDrop"
        ></div>
        <div class="item_title">{{ card.title }}</div>
      </div>
    </div>
    <div class="images">
      <div
        class="cell flex-center"
        v-for="dragElement in dragElements"
        :key="dragElement.id"
      >
        <img
          :src="require(`../${dragElement.url}`)"
          class="image"
          draggable="true"
          :data-title="dragElement.title"
          data-type="image"
          @drag="onDrag"
          @dragend="onDragend"
          @dragstart="onDragstart"
          v-if="!droppedElements.includes(dragElement.title)"
        />
      </div>
    </div>
    <button
      class="return"
      @click="returnImages"
      :class="{
        passive: droppedElements.length === 0,
      }"
    >
      Вернуть
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const data = reactive([
  {
    level: 1,
    elements: [
      {
        url: "assets/level1images/orange.jpg",
        id: uuidv4(),
        title: "orange",
      },
      {
        url: "assets/level1images/apple.jpg",
        id: uuidv4(),
        title: "apple",
      },
      {
        url: "assets/level1images/banana.jpg",
        id: uuidv4(),
        title: "banana",
      },
      {
        url: "assets/level1images/watermelon.jpg",
        id: uuidv4(),
        title: "watermelon",
      },
    ],
    cards: [
      {
        title: "apple",
        id: uuidv4(),
      },
      {
        title: "watermelon",
        id: uuidv4(),
      },
      {
        title: "orange",
        id: uuidv4(),
      },
      {
        title: "banana",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 2,
    elements: [
      {
        url: "assets/level2images/lion.jpg",
        id: uuidv4(),
        title: "lion",
      },
      {
        url: "assets/level2images/elephant.jpg",
        id: uuidv4(),
        title: "elephhant",
      },
      {
        url: "assets/level2images/monkey.jpg",
        id: uuidv4(),
        title: "monkey",
      },
      {
        url: "assets/level2images/giraffe.jpg",
        id: uuidv4(),
        title: "giraffe",
      },
    ],
    cards: [
      {
        title: "lion",
        id: uuidv4(),
      },
      {
        title: "giraffe",
        id: uuidv4(),
      },
      {
        title: "elephhant",
        id: uuidv4(),
      },
      {
        title: "monkey",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 3,
    elements: [
      {
        url: "assets/level3images/door.jpg",
        id: uuidv4(),
        title: "door",
      },
      {
        url: "assets/level3images/bed.webp",
        id: uuidv4(),
        title: "bed",
      },
      {
        url: "assets/level3images/table.webp",
        id: uuidv4(),
        title: "table",
      },
      {
        url: "assets/level3images/floor.jpg",
        id: uuidv4(),
        title: "floor",
      },
    ],
    cards: [
      {
        title: "floor",
        id: uuidv4(),
      },
      {
        title: "table",
        id: uuidv4(),
      },
      {
        title: "door",
        id: uuidv4(),
      },
      {
        title: "bed",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 4,
    elements: [
      {
        url: "assets/level4images/bus.png",
        id: uuidv4(),
        title: "Bus",
      },
      {
        url: "assets/level4images/double-decker.jpg",
        id: uuidv4(),
        title: "Double-decker",
      },
      {
        url: "assets/level4images/van.png",
        id: uuidv4(),
        title: "Van",
      },
      {
        url: "assets/level4images/subway.jpg",
        id: uuidv4(),
        title: "Subway",
      },
    ],
    cards: [
      {
        title: "Bus",
        id: uuidv4(),
      },
      {
        title: "Subway",
        id: uuidv4(),
      },
      {
        title: "Van",
        id: uuidv4(),
      },
      {
        title: "Double-decker",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 5,
    elements: [
      {
        url: "assets/level5images/exhausted.webp",
        id: uuidv4(),
        title: "exhausted",
      },
      {
        url: "assets/level5images/furious.jpg",
        id: uuidv4(),
        title: "furious",
      },
      {
        url: "assets/level5images/sad.jpg",
        id: uuidv4(),
        title: "sad",
      },
      {
        url: "assets/level5images/happy.png",
        id: uuidv4(),
        title: "happy",
      },
    ],
    cards: [
      {
        title: "exhausted",
        id: uuidv4(),
      },
      {
        title: "furious",
        id: uuidv4(),
      },
      {
        title: "sad",
        id: uuidv4(),
      },
      {
        title: "happy",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 6,
    elements: [
      {
        url: "assets/level6images/t-shirt.webp",
        id: uuidv4(),
        title: "t-shirt",
      },
      {
        url: "assets/level6images/shirt.jpg",
        id: uuidv4(),
        title: "shirt",
      },
      {
        url: "assets/level6images/trousers.jpg",
        id: uuidv4(),
        title: "trousers",
      },
      {
        url: "assets/level6images/shorts.jpg",
        id: uuidv4(),
        title: "shorts",
      },
    ],
    cards: [
      {
        title: "shirt",
        id: uuidv4(),
      },
      {
        title: "shorts",
        id: uuidv4(),
      },
      {
        title: "trousers",
        id: uuidv4(),
      },
      {
        title: "t-shirt",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 7,
    elements: [
      {
        url: "assets/level7images/rope.jpeg",
        id: uuidv4(),
        title: "rope",
      },
      {
        url: "assets/level7images/refugee.jpg",
        id: uuidv4(),
        title: "refugee",
      },
      {
        url: "assets/level7images/strong.jpg",
        id: uuidv4(),
        title: "strong",
      },
      {
        url: "assets/level7images/repair.jpg",
        id: uuidv4(),
        title: "repair",
      },
    ],
    cards: [
      {
        title: "rope",
        id: uuidv4(),
      },
      {
        title: "refugee",
        id: uuidv4(),
      },
      {
        title: "strong",
        id: uuidv4(),
      },
      {
        title: "repair",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 8,
    elements: [
      {
        url: "assets/level8images/town.jpeg",
        id: uuidv4(),
        title: "town",
      },
      {
        url: "assets/level8images/hat.jpg",
        id: uuidv4(),
        title: "hat",
      },
      {
        url: "assets/level8images/blood.jpg",
        id: uuidv4(),
        title: "blood",
      },
      {
        url: "assets/level8images/gun.jpg",
        id: uuidv4(),
        title: "gun",
      },
    ],
    cards: [
      {
        title: "hat",
        id: uuidv4(),
      },
      {
        title: "blood",
        id: uuidv4(),
      },
      {
        title: "gun",
        id: uuidv4(),
      },
      {
        title: "town",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 9,
    elements: [
      {
        url: "assets/level9images/race.jpeg",
        id: uuidv4(),
        title: "race",
      },
      {
        url: "assets/level9images/rat.webp",
        id: uuidv4(),
        title: "rat",
      },
      {
        url: "assets/level9images/bear.jpg",
        id: uuidv4(),
        title: "bear",
      },
      {
        url: "assets/level9images/old.webp",
        id: uuidv4(),
        title: "old",
      },
    ],
    cards: [
      {
        title: "race",
        id: uuidv4(),
      },
      {
        title: "rat",
        id: uuidv4(),
      },
      {
        title: "bear",
        id: uuidv4(),
      },
      {
        title: "old",
        id: uuidv4(),
      },
    ],
  },
  {
    level: 10,
    elements: [
      {
        url: "assets/level10images/tail.webp",
        id: uuidv4(),
        title: "tail",
      },
      {
        url: "assets/level10images/button.png",
        id: uuidv4(),
        title: "button",
      },
      {
        url: "assets/level10images/glasses.jpg",
        id: uuidv4(),
        title: "glasses",
      },
      {
        url: "assets/level10images/full.png",
        id: uuidv4(),
        title: "full",
      },
    ],
    cards: [
      {
        title: "glasses",
        id: uuidv4(),
      },
      {
        title: "full",
        id: uuidv4(),
      },
      {
        title: "tail",
        id: uuidv4(),
      },
      {
        title: "button",
        id: uuidv4(),
      },
    ],
  },
]);

const isCheckModal = ref(false);
const checkMessage = ref(false);
const level = ref(1);
const draggingElement = ref(null);
const progressBar = ref("0px");
const correct = ref(0);

const dragElements = computed(() => {
  return _.shuffle(
    data.filter((item) => item.level === level.value)[0].elements
  );
});
const cards = computed(() => {
  return _.shuffle(data.filter((item) => item.level === level.value)[0].cards);
});

let droppedElements = reactive([]);

function onDragstart(e) {
  draggingElement.value = e.target;
  e.target.classList.add("unshowed");
}

function onDragend(e) {
  e.target.classList.remove("unshowed");
}

function onDrop(e) {
  let imageClone = draggingElement.value.cloneNode();
  imageClone.setAttribute("data-type", "dropped");
  imageClone.classList.remove("unshowed");
  e.target.appendChild(imageClone);
  const cardTitle = draggingElement.value.dataset.title;
  droppedElements.push(cardTitle);
  if (cardTitle.toLowerCase() === e.target.dataset.title.toLowerCase()) {
    correct.value += 1;
  }
}

function returnImages() {
  correct.value = 0;
  const imageToDelete = document.querySelectorAll(`img[data-type="dropped"]`);
  console.log(imageToDelete);
  const imageParent = document.querySelectorAll(".drop-area");
  imageParent.forEach((parent) => {
    parent.classList.remove("correct");
    parent.classList.remove("wrong");
  });

  imageToDelete.forEach((item) => {
    item.remove();
  });
  droppedElements.splice(0, droppedElements.length);
}

function checkLevel() {
  if (checkMessage.value) {
    return;
  }

  if (droppedElements.length !== dragElements.value.length) {
    checkMessage.value = true;
    let counter = 0;
    let cancelRAF = window.requestAnimationFrame(animateBar);
    function animateBar() {
      counter += 0.75;
      if (counter >= 300) {
        cancelAnimationFrame(cancelRAF);
        progressBar.value = counter + "px";
      } else {
        progressBar.value = counter + "px";
        window.requestAnimationFrame(animateBar);
      }
    }

    setTimeout(() => {
      checkMessage.value = false;
    }, 3000);
  } else {
    isCheckModal.value = true;
  }
}

function tryAgain() {
  isCheckModal.value = false;
  returnImages();
}

function nextLevel() {
  if (level.value !== 10 && correct.value >= dragElements.value.length) {
    level.value++;
    isCheckModal.value = false;
    correct.value = 0;
    droppedElements.splice(0, droppedElements.length);
  } else {
    console.log("you have passed all levels");
  }
}
</script>

<style scoped>
.cards {
  margin: 100px 0;
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 50px;
  justify-content: center;
}

.level {
  font-size: 50px;
  text-align: center;
  margin: 30px;
}
.card {
  width: 400px;
  padding: 20px 10px;
  background-color: #7b68ee;
  border-radius: 10px;
}

.drop-area {
  height: 450px;
  background-color: #fff;
}

.item_title {
  color: #fff;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
}

.cell {
  position: relative;
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  width: 300px;
  height: 300px;
}

.images {
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: 50px;
  justify-content: center;
  background-color: #7b68ee;
  padding: 20px;
}

.image {
  width: 300px;
  height: 300px;
  background-color: #fff;
  object-fit: contain;
}

.hidden {
  display: none;
}

.unshowed {
  opacity: 0;
}

.correct {
  background-color: ForestGreen;
}

.wrong {
  background-color: red;
}

.back {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 23px;
  cursor: pointer;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.return {
  background-color: red;
  padding: 20px 30px;
  text-transform: uppercase;
  color: #fff;
  font-family: "Open Sans", sans-serif;
  text-align: center;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  border: none;
  display: block;
  font-size: 25px;
  margin: 30px auto;
}

.return:hover {
  background-color: rgb(156, 29, 29);
}

.check {
  position: fixed;
  right: 20px;
  top: 150px;
}

.check:hover {
  background-color: #1c53eb;
}

.modal_btns {
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  justify-content: center;
  align-items: center;
  row-gap: 30px;
}

.next-level,
.again,
.to-menu {
  padding: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.to-menu {
  background-color: #1544c0;
  width: 240px;
}

.next-level {
  background-color: #32cd32;
  width: 320px;
}

.next-level:hover {
  background-color: #269c26;
}
.again:hover {
  background-color: #a83b14;
}
.to-menu:hover {
  background-color: #12328b;
}

.next-level_title,
.again_title,
.to-menu_title {
  text-transform: uppercase;
  font-size: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
}

.again {
  background-color: #ff4500;
  width: 200px;
}

.fa-arrow-right,
.fa-rotate-right,
.fa-gamepad {
  font-size: 25px;
}

.passive {
  opacity: 0.5;
  cursor: default;
}

.check-message {
  border: 1px solid #e5e5e5;
  width: 350px;
  position: fixed;
  left: -400px;
  top: 130px;
  transition: 0.5s ease-in-out;
  padding: 40px 20px;
  background-color: #fff;
  z-index: 20;
}
.check-message_title {
  font-size: 18px;
  color: #1544c0;
}

.content {
  position: relative;
}

.fa-xmark {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 25px;
  color: red;
  cursor: pointer;
}

.check-message_active {
  left: 0;
}

.progress-bar {
  height: 4px;
  width: 0px;
  background-color: #269c26;
  position: absolute;
  bottom: -20px;
  border-end-end-radius: 15px;
}

.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
