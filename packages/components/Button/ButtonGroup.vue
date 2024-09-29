<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'

import { BUTTON_GROUP_CTX_KEY } from './constants'

import type { ButtonGroupProps } from './types'

defineOptions({
  name: 'AButtonGroup'
})
const props = defineProps<ButtonGroupProps>()

provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled')
  })
)
</script>

<template>
  <div class="a-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import url('./style.css');
</style>
