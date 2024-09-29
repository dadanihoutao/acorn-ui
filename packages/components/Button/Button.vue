<script setup lang="ts">
import { throttle } from 'lodash-es'
import { ref, computed, inject } from 'vue'

import { BUTTON_GROUP_CTX_KEY } from './constants'

import AIcon from '../Icon/Icon.vue'

import type { ButtonProps, ButtonEmits } from './types'

defineOptions({
  name: 'AButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500
})

const emits = defineEmits<ButtonEmits>()

const slots = defineSlots()

const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0)

const _ref = ref<HTMLButtonElement>()
const size = computed(() => buttonGroupCtx?.size ?? props.size ?? '')
const type = computed(() => buttonGroupCtx?.type ?? props.type ?? '')
const disabled = computed(() => props.disabled || buttonGroupCtx?.disabled || false)
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px'
}))

const handleBtnClick = (e: MouseEvent) => {
  emits('click', e)
}
const handlBtneCLickThrottle = throttle(handleBtnClick, props.throttleDuration, { trailing: false })

defineExpose({
  ref: _ref,
  disabled,
  size,
  type
})
</script>
<template>
  <component
    :is="tag"
    :ref="_ref"
    class="a-button"
    :autofocus="autofocus"
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
    @click="(e: MouseEvent) => (useThrottle ? handlBtneCLickThrottle(e) : handleBtnClick(e))"
  >
    <template v-if="loading">
      <slot name="loading">
        <a-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <a-icon :icon="icon" size="1x" :style="iconStyle" v-if="icon && !loading" />
    <slot></slot>
  </component>
</template>
<style scoped>
@import url('./style.css');
</style>
