<script setup lang="ts">
import { debugWarn } from '@acorn-ui/utils'
import { ref, provide, watch } from 'vue'

import { COLLAPSE_CTX_KEY } from './constants'

import type { CollapseItemName, CollapseProps, CollapseEmits } from './types'

const COMPONENT_NAME = 'ACollapse' as const
defineOptions({
  name: COMPONENT_NAME
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<CollapseItemName[]>(props.modelValue)

if (props.accordion && activeNames.value.length > 1) {
  debugWarn(COMPONENT_NAME, 'accordion mode should only have one active item')
}

function updateActiveNames(newName: CollapseItemName[]) {
  activeNames.value = newName
  emits('update:modelValue', newName)
  emits('change', newName)
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]
  // 手风琴模式
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    updateActiveNames(_activeNames)
    return
  }

  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    _activeNames.push(item)
  }
  updateActiveNames(_activeNames)
}

watch(
  () => props.modelValue,
  (newName) => {
    updateActiveNames(newName)
  }
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
})
</script>
<template>
  <div class="a-collapse">
    <slot></slot>
  </div>
</template>
<style scoped lang="css">
@import url('./style.css');
</style>
