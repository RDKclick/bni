<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'About',
    navigationStyle:'custom'
  },
}
</route>

<template>
  <view class="about-container">
    <div class="ab-item-list">
      <div class="ab-item" v-if="infos.aboutUs">
        <div class="title">
          About Us
        </div>
        <div class="hr"></div>
        <div class="content" v-html="infos.aboutUs">
        </div>
      </div>
      <!-- <div v-for="(item, index) in contentList" :key="index" class="ab-item">
        <div v-html="item.content"></div>
      </div> -->
      <div class="ab-item" v-if="infos.contactUs">
        <div class="title">
          Contact us
        </div>
        <div class="hr"></div>
        <div class="content" v-html="infos.contactUs">
        </div>
      </div>
      <div class="ab-item" v-if=infos.privacyPolicy>
        <div class="title">
          Privacy Policy
        </div>
        <div class="hr"></div>
        <div class="content" v-html="infos.privacyPolicy">
        </div>
      </div>
    </div>
  </view>
</template>

<script lang="ts" setup>
import { queryAboutUs } from "@/service/index/detail";
//

const contentList = ref<{ id: number, content: string }[]>([])

const infos = reactive({
  aboutUs: '',
  contactUs: '',
  privacyPolicy: ``
})

queryAboutUs().then(res => {
  if (res.code === 200) {
    contentList.value = res.data.aboutUs;
    infos.aboutUs = res.data.aboutUs[0].content
    infos.contactUs = res.data.aboutUs[1].content
    infos.privacyPolicy = res.data.aboutUs[2].content
  }
})
</script>

<style lang="scss" scoped>
.about-container {
  padding: 14px 10px;
  background-color: #F2F3F7;
}

.ab-item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ab-item {
  padding: 11px 16px;
  background-color: #FFFFFF;

  .title {
    font-family: SourceHanSansSC-bold;
    font-size: 18px;
    color: rgba(16, 16, 16, 1);
    text-align: left;
  }

  .hr {
    display: block;
    width: 36px;
    height: 2px;
    margin: 10px 0;
    background-color: rgba(16, 16, 16, 1);
    // border: 2px solid rgba(16, 16, 16, 1);
  }
}
</style>
