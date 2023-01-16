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
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.homepage {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 90px;
  color: #1544c0;
  font-weight: 500;
  margin-bottom: 10px;
}

.subtitle {
  color: #1544c0;
  font-weight: 500;
  font-size: 40px;
  margin-bottom: 25px;
}

.description {
  color: #212121;
  font-size: 20px;
  font-weight: 500;
  width: 800px;
  text-align: center;
}
</style>
