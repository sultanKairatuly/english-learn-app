<template>
  <div class="session">
    <div class="session-icon" :class="props.icon"></div>
    <div class="session_text">
      <div class="session-text_title">
        <slot name="title"></slot>
      </div>
      <div class="session-text_subtitle">
        <slot name="subtitle"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<style scoped>
.session {
  display: flex;
  align-items: flex-start;
}
.session-icon {
  font-size: 35px;
  color: #010167;
  font-weight: 500;
  padding: 13px;
}

.session_text {
  padding-left: 15px;
}

.session-text_title {
  font-family: "Open Sans", Arial, sans-serif;
  font-weight: 700;
  font-size: 25px;
  color: #212529;
  margin-bottom: 8px;
}
.session-text_subtitle {
  color: #777;
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 19px;
  font-weight: 400;
  margin-bottom: 20px;
}

.dark .session-icon{
  color: #8774e1;
}

.dark .session-text_subtitle {
  color: rgb(185, 185, 185);
}

.dark .session-text_title{
  color: #fff;
}

@media (max-width: 1550px) {
  .session-icon {
    font-size: 32px;
  }

  .session-text_title {
    font-size: 21px;
  }
  .session-text_subtitle {
    font-size: 17px;
  }
}

@media (max-width: 1550px) {
  .session-icon {
    font-size: 29px;
  }

  .session_text {
  }

  .session-text_title {
    font-size: 19px;
  }
  .session-text_subtitle {
    font-size: 15px;
  }
}

@media (max-width: 425px) {
  .session-icon {
    font-size: 24px;
  }

  .session_text {
    padding: 0;
  }

  .session-text_title {
    font-size: 17px;
  }
  .session-text_subtitle {
    font-size: 13px;
  }
}

@media (max-width: 375px) {

}
</style>
