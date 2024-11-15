<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <wd-action-sheet v-model="show" :actions="countActions" @close="close" @select="select" />
  <wd-message-box />
  <wd-button :style="btnStyle" size="large" :disabled="countActions.length === 0" @click="handleOpen">Live
    Chat</wd-button>
</template>

<script lang="ts" setup>
import { useMessage } from 'wot-design-uni'
const message = useMessage()

interface Props {
  email?: string
  whatsapp?: string
  phone?: string
  btnStyle?: object
}

const props = withDefaults(defineProps<Props>(), {
  email: '',
  whatsapp: '',
  phone: '',
})

const show = ref<boolean>(false)

const handleOpen = () => {
  show.value = true
}

interface Options {
  name: string
  value: string
  handle: Function
  // [key: string]: any
}

const countActions = computed(() => {
  const result: Array<Options> = []

  if (props.whatsapp) {
    result.push({
      name: "WhatsApp",
      value: props.whatsapp,
      handle: () => {
        message.confirm({
          title: 'whatsapp',
          confirmButtonText: 'OK',
          cancelButtonText: "CANCEL",
          msg: props.whatsapp
        }).then(res => {
          const link = `https://wa.me/${props.whatsapp}`
          // const whatsappUrl = "whatsapp://send?phone=" + props.whatsapp;
          window.open(link)
        })
      }
    })
  }

  if (props.phone) {
    result.push({
      name: "PHONE",
      value: props.phone,
      handle: () => {
        message.confirm({
          title: 'PHONE',
          confirmButtonText: 'OK',
          cancelButtonText: "CANCEL",
          msg: props.phone
        }).then(res => {
          window.open(`tel:${props.phone}`)
        })
      }
    })
  }

  if (props.email) {
    result.push({
      name: "EMAIL",
      value: props.email,
      handle: () => {
        // uni.showToast({
        //   title: props.email,
        // })
        // window.open(`mailto:${props.email}`)
        message.confirm({
          title: 'EMAIL',
          msg: props.email,
          confirmButtonText: 'OK',
          cancelButtonText: "CANCEL",
        }).then(res => {
          window.open(`mailto:${props.email}`)
        })
      }
    })
  }

  return result
})

const select = (e: { index: number, item: Options }) => {
  // console.log("选中", e.item.value);
  e.item.handle()
}

const close = () => { }
</script>

<style lang="scss" scoped>
//</style>
