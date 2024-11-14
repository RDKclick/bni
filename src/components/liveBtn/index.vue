<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" />
  <wd-button style="width:100%" size="large">Live Chat</wd-button>
</template>

<script lang="ts" setup>
interface Props {
  email?: string
  whatsapp?: string
  phone?: string
}

const props = withDefaults(defineProps<Props>(), {
  email: '',
  whatsapp: '',
  phone: '',
})

const show = ref<boolean>(false)
const actions = ref([
  {
    name: '选项1'
  },
  {
    name: '选项2'
  },
  {
    name: '选项3',
  }
])

const select = () => { }

const close = () => { }
</script>

<style lang="scss" scoped>
//</style>
