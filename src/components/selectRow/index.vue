<template>
  <div class="row">
    <span class="title">{{ title }}：</span>
    <span class="option" :class="{
      active: item.value === value
    }" v-for="(item, index) in countOptions" @click="handleToggleCategoryThree(item)" :key="index">
      {{ item.label }}
    </span>
  </div>
</template>

<script lang="ts" setup>
interface Options {
  label: string
  value: string | number
  [key: string]: any
}

interface Props {
  title: string
  options: Options[]
  showCount?: number,
  value: string | number
}

const props = withDefaults(defineProps<Props>(), {
  showCount: 1
})

const emits = defineEmits<{ toggle: [value: Options] }>()

const countOptions = computed(() => {
  const opList = props.options.slice(0, props.showCount)

  return [
    {
      label: 'all',
      id: undefined
    },
    ...opList
  ]
})

const handleToggleCategoryThree = (item: Options) => {
  emits('toggle', item)
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  gap: 24px;

  .title {
    font-family: SourceHanSansSC-regular;
    font-size: 13px;
    color: rgba(89, 89, 89, 1);
  }

  .option {
    overflow: hidden;
    font-family: SourceHanSansSC-regular;
    font-size: 13px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.active {
      color: #4654A3;
    }
  }
}
</style>
