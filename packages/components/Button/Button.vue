<script setup lang="ts">
import { ref } from 'vue'

import type { ButtonProps } from './types'

defineOptions({
  name: 'AButton'
})

withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button'
})

const slot = defineSlots()
console.log(slot)

const _ref = ref<HTMLButtonElement>()
</script>
<template>
  <component
    :is="tag"
    :ref="_ref"
    class="a-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`a-button--${type}`]: type,
      [`a-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
  >
    <slot></slot>
  </component>
</template>
<style scoped>
@import url('./style.css');
</style>
