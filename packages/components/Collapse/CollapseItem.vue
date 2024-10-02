<script setup lang="ts">
import { inject, computed } from 'vue'

import { COLLAPSE_CTX_KEY } from './constants'
import transitionEvents from './transitionEvents'

import AIcon from '../Icon/Icon.vue'

import type { CollapseItemProps } from './types'

defineOptions({
  name: 'ACollapseItem'
})

const props = defineProps<CollapseItemProps>()

const ctx = inject(COLLAPSE_CTX_KEY)

const isActive = computed(() => {
  return ctx?.activeNames?.value?.includes(props.name)
})

function handleClick() {
  if (props.disabled) {
    return
  }
  ctx?.handleItemClick(props.name)
}
</script>
<template>
  <div
    class="a-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div
      class="a-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive
      }"
      @click="handleClick"
    >
      <span class="a-collapse-item__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <a-icon icon="angle-right" class="header-angle" />
    </div>
    <transition name="slide" v-on="transitionEvents">
      <div class="a-collapse-item__wrapper" v-show="isActive">
        <div class="a-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="css">
@import url('./style.css');
</style>
