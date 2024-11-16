<template>
  <div class="row">
    <div style="display: flex;align-items: center;">
      <span class="title">{{ title }}：</span>
      <div class="option-list">
        <span class="option" :class="{
          active: item.value === value
        }" v-for="(item, index) in countOptions" @click="handleToggleCategoryThree(item)" :key="index">
          {{ item.label }}
        </span>
      </div>
    </div>
    <wd-popover mode="menu" :content="countMenuItems" @menuclick="handleMenuClick" placement="bottom-end">
      <wd-icon name="arrow-down" size="22px" color="#725972"></wd-icon>
    </wd-popover>
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
  value: string | number | undefined
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
      value: undefined
    },
    ...opList
  ]
})

const countMenuItems = computed(() => props.options.map(item => {
  return {
    ...item,
    content: item.label
  }
}))

const handleMenuClick = (e: any) => {
  console.log("e", e);
  handleToggleCategoryThree(e.item)
}

const handleToggleCategoryThree = (item: Options) => {
  emits('toggle', item)
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  gap: 24px;
  justify-content: space-between;

  .title {
    font-family: SourceHanSansSC-regular;
    font-size: 13px;
    color: rgba(89, 89, 89, 1);
  }

  .option-list {
    display: flex;
    gap: 20rpx;
    align-items: center;
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
