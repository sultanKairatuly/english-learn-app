<template>
  <button class="primary">
    <slot></slot>
  </button>
</template>

<style scoped>
.primary {
  padding: 20px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  background-color: #1544c0;
  font-size: 21px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border: none;
}
</style>
