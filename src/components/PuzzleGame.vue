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
    <h1 class="title">Puzzle game</h1>
    <div class="content">
      <div class="question" v-if="counter < 10 && lives > 0">
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
        <div class="answers">{{ counter }}/10</div>
        <div class="text">{{ missedSentence }}</div>
        <div class="letters">
          <div
            class="letter"
            @click="selectLetter(letter)"
            v-for="letter in randomLettersList"
            :key="letter"
          >
            {{ letter }}
          </div>
        </div>
        <div
          class="next"
          :disabled="!spaceIndex"
          @click="nextSentence(letter)"
          :class="{
            'active-next': spaceIndex,
          }"
        >
          Дальше
        </div>
      </div>
      <FinishBlock v-else-if="counter <= 10 && lives > 0" @restart="restart">
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
import { reactive, ref } from "vue";
import _ from "lodash";
import { useStore } from "vuex";
import FinishBlock from "./FinishBlock.vue";

const failAudio = ref(null);
const successAudio = ref(null);

const counter = ref(1);
const store = useStore();
const lives = ref(3);
const letters = reactive([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]);

const sentences = reactive([
  {
    level: "A1",
    sentences: [
      "Let it ring they can text",
      "I live in a house near the mountains",
      "I have two brothers and one sister",
      "My father teaches mathematics",
      "My brothers are very smart and work hard in school",
      "My sister is a nervous girl",
      "My grandmother also lives with us",
      "She came from Italy when I was two years old",
      "My family is very important to me",
      "We do lots of things together",
      "My brothers and I like to go on long walks in the mountains",
      "My sister likes to cook with my grandmother",
      " On the weekends we all play board games together",
    ],
  },
  {
    level: "A2",
    sentences: [
      "I just returned from the greatest summer vacation",
      "I spent eight days in Paris",
      "My best friends Henry and Steve went with me",
      "We had a beautiful hotel room in the Latin Quarter",
      "We had a balcony with a wonderful view",
      "We visited many famous tourist places",
      "I was always interested in art so that was a special treat for me",
      "The museum is so huge you could spend weeks there",
      "We took lots of breaks and sat in cafes along the river Seine",
      "The French food we ate was delicious",
      "The wines were tasty too",
      "Steve’s favorite part of the vacation was the hotel breakfast",
      "He said he would be happy if he could eat croissants like those forever",
      "We had so much fun that we’re already talking about our next vacation",
    ],
  },
  {
    level: "B1",
    sentences: [
      "Keith recently came back from a trip to Chicago",
      "This midwestern metropolis is found along the shore of Lake Michigan",
      "Keith loves baseball and he made sure to take a visit to Wrigley Field",
      "In the stadium Keith and the other fans cheered for the Cubs",
      "Keith was happy that the Cubs won with a score of 5-4",
      "Chicago has many historic places to visit",
      "Keith also took a walk through Jackson Park a great outdoor space that hosted the World’s Fair of 1892",
      "Despite the challenge of climbing the many flights of stairs",
      "Keith felt that reaching the top was worth the effort",
      "A Christian holiday signifying the birth of Jesus",
      "Christmas is widely celebrated and enjoyed across the United States and the world",
      "Santa Claus is said to fly around the Christmas sky in a sled powered by his magical reindeer",
      "Gifts are placed underneath a Christmas tree",
    ],
  },
  {
    level: "B2",
    sentences: [
      "It goes without saying that humans",
      "To be sure humans have overcome predators",
      "To fully understand and appreciate these accomplishments",
      "The head, or the spherical body part that contains the brain and rests",
      "Has quite a few individual organs and body parts on it",
      "The organs responsible for hearing",
      "Are located on either side of the head",
      "rom top to bottom the eyebrows",
      "Horizontal strips of hair that can be found above the eye",
      "The eyes are below them and are round",
      "The eyes make way for the nose",
      "The neck is the long body part that connects the head",
      "The legs are the long muscular body parts",
    ],
  },
  {
    level: "C1",
    sentences: [
      "The deadliest virus in modern history",
      "Perhaps of all time was the 1918 Spanish Flu",
      "It killed about 20 to 50 million people worldwide",
      "He total death toll is unknown because medical",
      "Records were not kept in many areas",
      "The pandemic hit during World War",
      "I and devastated military troops",
      "In the United States for instance more servicemen were killed from the flu",
      "The Spanish flu was fatal to a higher",
      "The pandemic started mildly",
      "But was followed by a much more severe wave",
      "The war likely contributed to the devastating",
      "Mortality numbers as large outbreaks occurred in military forces",
    ],
  },
  {
    level: "C2",
    sentences: [
      "Living in close quarters",
      "Poor nutrition and the unsanitary",
      "Conditions of war camps had an effect",
      "A third wave occurred in the winter and spring of 1919",
      "And a fourth, smaller wave occurred in a few areas in spring 1920",
      "Initial symptoms of the flu were typical: sore throat",
      "The flu often progressed rapidly",
      "Severe pneumonia and sometimes hemorrhage",
      "A characteristic feature of severe ",
      "Cases of the Spanish Flu was heliotrope cyanosis",
      "Where the patient’s face turned blue from lack of oxygen",
      "In the cells. Death usually followed",
      "Modern medicine such as vaccines antivirals",
    ],
  },
]);

let sentence = ref(randomSentence());
let missedLetter = ref(missedLetterGenerator(sentence.value));
let randomLettersList = reactive(randomLetters());
let missedSentence = ref(
  missed(sentence.value).replace(missedLetter.value, "_")
);

function randomSentence() {
  const LevelSentences = sentences.filter(
    (item) => item.level === store.state.level
  )[0].sentences;

  const shuffled =
    _.shuffle(LevelSentences)[
      Math.floor(getRandomArbitrary(0, LevelSentences.length - 12))
    ];

  return shuffled;
}

function missedLetterGenerator(sentence) {
  const wordArray = sentence.split(" ");
  let randomFirstIndex = Math.round(
    getRandomArbitrary(0, wordArray.length - 1)
  );
  let randomSecondIndex = Math.round(
    getRandomArbitrary(0, wordArray[randomFirstIndex].length - 1)
  );
  return wordArray[randomFirstIndex][randomSecondIndex];
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function randomLetters() {
  let randLetters = _.shuffle(letters).slice(0, 5);
  randLetters.push(missedLetter.value);
  randLetters = randLetters.map((item) => item.toUpperCase());
  return randLetters;
}
function missed(string) {
  const a = string.split(" ");
  let str = a.join(" ");
  return str;
}

let spaceIndex = ref(null);

function selectLetter(selectedLetter) {
  if (spaceIndex.value) {
    let arr = missedSentence.value.split("");
    arr.splice(spaceIndex.value, 1, selectedLetter);
    missedSentence.value = arr.join("");
  } else {
    spaceIndex.value = missedSentence.value.split("").indexOf("_");
    missedSentence.value = missedSentence.value.replace("_", selectedLetter);
  }
}

function nextSentence(letter) {
  if (spaceIndex.value) {
    const replaced = missedSentence.value.replace("_", letter);
    if (replaced.toLowerCase() === sentence.value.toLowerCase()) {
      sentence.value = randomSentence();
      missedLetter.value = missedLetterGenerator(sentence.value);
      randomLettersList = randomLetters();
      missedSentence.value = missed(sentence.value).replace(
        missedLetter.value,
        "_"
      );
      spaceIndex.value = null;
      counter.value++;
      successAudio.value.pause();
      successAudio.value.currentTime = 0;
      successAudio.value.play();
    } else {
      lives.value--;
      failAudio.value.pause();
      failAudio.value.currentTime = 0;
      failAudio.value.play();
    }
  } else {
    console.log("Select a letter");
  }
}

function restart() {
  sentence.value = randomSentence();
  missedLetter.value = missedLetterGenerator(sentence.value);
  randomLettersList = randomLetters();
  missedSentence.value = missed(sentence.value).replace(
    missedLetter.value,
    "_"
  );
  lives.value = 3;
  counter.value = 1;
}
</script>

<style scoped>
.title {
  color: indigo;
  margin: 50px;
  font-size: 50px;
}

.content {
  width: 70vw;
  height: 70vh;
  background-color: #fff;
  border-radius: 3px;
  margin: 100px auto;
  padding: 2vw;
  height: 100%;
  position: relative;
  box-shadow: 0px 0px 12px 3px rgba(34, 60, 80, 0.2);
  min-height: 30vw;
}

.text {
  text-transform: uppercase;
  background-color: #1544c0;
  color: #fff;
  text-align: center;
  padding: 15px 0;
  font-size: 30px;
  width: 70%;
  margin: 0 auto;
}

.letters {
  display: flex;
  justify-content: center;
  row-gap: 20px;
  margin-top: 30px;
  column-gap: 30px;
  flex-wrap: wrap;
}

.letter {
  background-color: rgb(98, 143, 128);
  color: #fff;
  padding: 30px;
  font-weight: 700;
  width: 100px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  column-gap: 30px;
}

.next {
  background-color: rgb(36, 179, 36);
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  width: fit-content;
  display: block;
  margin: 50px auto;
  cursor: pointer;
  padding: 20px 30px;
  font-size: 20px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  border: none;
  opacity: 0.5;
}

.next:hover {
  background-color: rgb(30, 145, 30);
}

.letter:hover {
  background-color: rgb(122, 177, 159);
}

.active-next {
  opacity: 1;
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

.shaking {
  animation: shake 0.5s;
}

.dark .content{
  background-color: #1e2833;
}

.dark .text {
  background-color: #8774e1;
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
  .title {
    margin: 30px;
    font-size: 40px;
  }

  .text {
    padding: 10px 20px;
    font-size: 23px;
    width: 60%;
    margin: 0 auto;
  }

  .like {
    font-size: 35px;
    color: rgb(131, 131, 131);
  }

  .active {
    color: red;
  }

  .answers {
    font-size: 28px;
  }
}

@media (max-width: 1440px) {
  .title {
    margin: 30px;
    font-size: 40px;
  }

  .text {
    padding: 10px 20px;
    font-size: 20px;
    width: 95%;
    margin-top: 120px;
    margin-bottom: 50px;
  }

  .lives {
    left: 50%;
    justify-content: center;
    transform: translateX(-50%);
    top: 80px;
  }

  .answers {
    left: 50%;
    transform: translateX(-50%);
  }

  .active {
    color: red;
  }

  .answers {
    font-size: 28px;
  }
}

@media (max-width: 425px) {
  .title {
    text-align: center;
  }
  .text {
    font-size: 18px;
  }
  .letter {
    padding: 30px;
    font-size: 14px;
  }

  .next {
    font-size: 18px;
    padding: 15px 25px;
  }

  .content {
    width: 95vw;
  }
}

@media (max-width: 375px) {
  .text {
    font-size: 17px;
  }
  .letter {
    padding: 20px;
    font-size: 16px;
  }

  .like {
    font-size: 30px;
  }

  .answers {
    font-size: 25px;
  }

  .next {
    font-size: 17px;
    padding: 15px 25px;
  }

  .content {
    margin: 50px auto;
  }
}

@media (max-width: 320px) {
  .text {
    font-size: 16px;
  }

  .letter {
    padding: 20px;
    font-size: 15px;
  }

  .next {
    font-size: 16px;
    padding: 10px 20px;
  }
}
</style>
