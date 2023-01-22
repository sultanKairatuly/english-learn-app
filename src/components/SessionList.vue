<template>
  <div class="list">
    <SessionItem class="list_item" :icon="'icon-support'">
      <template #title>Поддержка учащихся</template>
      <template #subtitle>
        Попросите сообщество <span class="alternative-text">помочь</span> вам с
        вашим английским.
      </template>
    </SessionItem>
    <SessionItem class="list_item" :icon="'icon-speech'">
      <template #title>Чтение Обсуждений Дебат</template>
      <template #subtitle
        >Читайте в Интернете, получайте отзывы, а затем обсуждайте или
        обсуждайте тему в
        <span class="alternative-text">модерируемых группах</span>.</template
      >
    </SessionItem>
    <SessionItem class="list_item" :icon="'icon-trophy'">
      <template #title>Игры и Вызовы</template>
      <template #subtitle
        >Получайте удовольствие от своего английского и
        <span class="alternative-text">принимайте</span> участие в наших играх и
        соревнованиях в поддерживающих и дружелюбных группах. Лучший способ
        учиться — забыть, что ты учишься.</template
      >
    </SessionItem>
    <SessionItem class="list_item" :icon="'icon-book-open'">
      <template #title>Английский Книжный Клуб</template>
      <template #subtitle
        >Присоединяйтесь к нашему
        <span class="alternative-text">онлайн-книжному клубу</span> и
        читайте/слушайте книги на английском языке. Мы прочитали всю книгу
        вместе.</template
      >
    </SessionItem>
    <SessionItem class="list_item" :icon="'icon-screen-desktop'">
      <template #title>Новички / Назад к Основам</template>
      <template #subtitle
        >Присоединяйтесь к нашим занятиям и вебинарам
        <span class="alternative-text"
          >«Назад к основам» и «Абсолютные новички» </span
        >(подходит для начинающих и людей, которым необходимо освежить свои
        знания английского языка).</template
      >
    </SessionItem>
    <SessionItem class="list_item" :icon="'icon-directions'">
      <template #title> Приключения в Виртуальном Мире</template>
      <template #subtitle
        >Пригласите нас исследовать
        <span class="alternative-text">виртуальные миры</span>, такие как Second
        Life, AltSpace VR и Open Sim</template
      >
    </SessionItem>
  </div>
</template>

<script setup>
import SessionItem from "../components/SessionItem.vue";
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 20px;
  margin: 70px 0 100px 0;
}

.list_item {
  width: 32%;
  padding: 15px;
}
.alternative-text {
  color: #000066;
  font-family: "Shadows Into Light", cursive;
  font-size: 25px;
  font-weight: 300;
  display: inline-block;
  transform: translateY(2px);
}

@media (max-width: 1550px) {
  .alternative-text {
    font-size: 20px;
  }
}
@media (max-width: 1250px) {
  .alternative-text {
    font-size: 18px;
  }
}

@media (max-width: 990px) {
  .list {
    flex-direction: column;
    row-gap: 5px;
    margin: 70px 0 100px 0;
  }

  .list_item {
    width: 100%;
    padding: 0;
  }
}
</style>
