<template>
  <view class="image-container">
    <!-- 单张图片 -->
    <view v-if="imageList.length === 1" class="single-image">
      {{ imageList[0] }}
      <image :src="imageList[0]" mode="aspectFill" />
    </view>

    <!-- 多张图片 -->
    <view v-if="imageList.length > 1" class="multiple-images">
      <!-- 一行三张图片 -->
      <view v-for="(image, index) in imageList" :key="index" class="image-item">
        <image :src="image" mode="aspectFill" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const imageList = ref([
  'http://en.bni1688.co/storage/upload/images/company/5400/album/2024/01/03/1704276184997916.jpg',
  'http://en.bni1688.co/storage/upload/images/company/5400/album/2024/01/03/1704276146602689.jpg',
  'http://en.bni1688.co/storage/upload/images/company/5400/album/2024/01/03/1704276124622157.jpg',
  // ...更多图片
])
</script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.single-image image {
  width: 100%;
  height: auto;
}

.multiple-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 5px;
}

.image-item {
  width: calc(33.333% - 10px);
  height: 100px;
  margin-bottom: 10px;
}

.image-item image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
