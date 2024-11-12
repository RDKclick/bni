<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <div>
    <view style="display: flex;gap:10px;padding:10px">
      <view v-for="(item, index) in list" :key="index" style="width: 100%;aspect-ratio: 118/160;">
        <AutoImg :src="item" />
      </view>
    </view>
    <!-- <AutoImg :src="img2" /> -->
    <!-- <div style="display: flex;flex-direction: column;">
      <span>
        wd-img
      </span>
      <wd-img width="100%" mode="widthFix" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg" />
    </div>

    <image style="width: 100%;" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"
      @click="handlePreview" />
    <div class="row">
      <div v-for="item in 3" :key="item" class="item" style="aspect-ratio:1/2;background:red;">
        <img style="width: 100%; background-color: #eeeeee"
          src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg"></img>
      </div>
    </div>
    <hr> -->
    <div class="neigh-container" style="text-align: center;">
      <p>9工图</p>
      <div class="gg">
        <!-- <AutoImg v-for="item in 10" :key="item" :src="img2" /> -->
        <!-- <img v-for="item in 10" :key="item" style="width: 100%; height: auto;aspect-ratio:1; background-color: #eeeeee"
          @click="handlePreview" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg"></img> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AutoImg from "@/components/autoImg/index.vue";

const img1 = 'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg'
const img2 = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg'

const list = ref([img1, img2, img1])

// 加载
const handleLoad = (e) => {
  console.log("加载图片", e.detail);
}

// 预览
const handlePreview = () => {
  uni.previewImage({
    urls: ['https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg', "https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg"]
  })
}
</script>

<style lang="scss" scoped>
.neigh-container {
  padding-top: 12px;
}

.gg {
  // display: flex;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 10px;
  /* 根据需要调整间距 */
  justify-content: space-between;
  padding: 15px;
}

.row {
  display: flex;
  gap: 10px;
  padding: 25px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 5px;
  }

  img {
    width: 100%;
  }
}
</style>
