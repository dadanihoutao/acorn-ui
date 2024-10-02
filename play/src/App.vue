<script setup lang="ts">
import { ref } from 'vue'
const activeNames = ref(['a'])
</script>

<template>
  <a-button type="primary" plain>测试button</a-button>
  <a-collapse accordion v-model="activeNames">
    <a-collapse-item title="测试1" name="a">
      <div>content a</div>
    </a-collapse-item>
    <a-collapse-item title="测试2" name="b">
      <div>content b</div>
    </a-collapse-item>
    <a-collapse-item title="测试3" name="c">
      <div>content c</div>
    </a-collapse-item>
  </a-collapse>
</template>

<style scoped></style>
