<template>
  <!-- 1. 正在加载
      2. 加载失败/成功
  -->
  <image style="width:100%;height:100%" v-if="loading && !isError" lazy-load :src="loadImage"></image>
  <image style="width:100%;height:100%" v-if="isError" lazy-load :src="errorImage"></image>
  <image style="width:100%;height:100%" :style="{
    zIndex: loading ? -1 : 0,
    visibility: loading ? 'hidden' : 'visible',
  }" mode="aspectFill" v-else-if="previewUrls.length > 0" :src="src" @load="handleLoad" @error="handleError"
    @click.stop="handlePreview">
  </image>
  <image style="width:100%;height:100%" mode="aspectFill" v-else :src="src" @load="handleLoad" @error="handleError"
    @click="handlePreview">
  </image>
</template>

<script lang="ts" setup>

interface Props {
  src: string
  previewCurrent?: number
  previewUrls?: string[]
  loadImage?: string
  errorImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  previewCurrent: 0,
  previewUrls: () => [],
  loadImage: 'https://fakeimg.pl/250x250/?text=loading',
  errorImage: "https://fakeimg.pl/250x250/?text=404"
})

/**
 * 特性
 * 1. 根据外部容器自适应
 * 2. 支持预览
 * 3. 支持错误处理
*/

// 支持预览
const handlePreview = () => {
  if (props.previewUrls.length === 0) {
    return
  }

  uni.previewImage({
    current: props.previewCurrent,
    urls: props.previewUrls
  })
}

// 获取宽高
const imgConfig = reactive({
  height: 0,
  width: 0
})
const loading = ref(true)
const handleLoad = (e: any) => {
  // console.log("图片加载完成", e);
  const { height, width } = e.detail as { height: number, width: number }

  imgConfig.height = height
  imgConfig.width = width
  loading.value = false
  // console.log("设置", loading.value);

}

// 错误处理
const isError = ref<boolean>(false)
const handleError = (e: any) => {
  isError.value = true
}
</script>

<style lang="scss" scoped></style>
