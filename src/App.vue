<script setup></script>

<template>
  <div class="container">
    <dynamic-back
      v-colorList:darken
      v-speed
      v-practicalNumber
      v-size
      v-background
    ></dynamic-back>
  </div>
</template>

<style scoped>
.container {
  width: 500px;
  height: 500px;
}
</style>
