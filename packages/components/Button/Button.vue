<script setup lang="ts">
import { ref } from 'vue'

import type { ButtonProps } from './types'

defineOptions({
  name: 'AButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button'
})

const slot = defineSlots()

const _ref = ref<HTMLButtonElement>()
</script>
<template>
  <button style="color: red; background-color: blue">this is a button</button>
  {{ props }}
  {{ _ref }}
  {{ slot }}
</template>
<style scoped lang="css"></style>
