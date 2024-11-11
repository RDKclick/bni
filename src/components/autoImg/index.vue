<template>
  <view class="container">
    <image class="img" mode="widthFix" :src="imageUrl" :style="{ height: imgHeight + 'px' }" @load="onImgLoad" />
  </view>
</template>

<script>
export default {
  props: ['imageUrl'],
  data() {
    return {
      // imageUrl: 'https://picsum.photos/400/300',
      imgHeight: 0,
    };
  },
  methods: {
    onImgLoad(e) {
      // 当图片加载完成后，获取图片的原始宽度和高度，并根据宽度计算出高度
      const { width, height } = e.detail;
      this.imgHeight = (height / width) * 100; // 高度 = 原始高度 / 原始宽度 * 100
    },
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.img {
  width: 100%;
}
</style>
