<route lang="json5" type="page">
  {
    layout: 'demo',
    style: {
      navigationBarTitleText: '详情',
      navigationStyle:'custom',
    },
  }
  </route>

<template>
  <div class="detail-container">
    <div class="icon-row">
      <wd-icon name="arrow-left" size="20px" color="#4654A3" @click="handleBack"></wd-icon>
      <div>
        <!-- <wd-icon name="search" size="16px" color="#565454" style="margin-right: 15px;"></wd-icon> -->
        <wd-icon name="home1" size="20px" color="#565454" @click="handleBackHome"></wd-icon>
      </div>
    </div>
    <div class="content">
      <div class="info-box">
        <div>
          <wd-img :width="74" :height="74" round :src="companyInfo.about_us.bni_info.avatar" v-if="companyInfo" />
          <div>
            <div class="syb">BNI1688</div>
          </div>
        </div>
        <div class="right" v-if="companyInfo?.about_us?.bni_info?.name">
          <div>
            <span class="name">{{ companyInfo?.about_us?.bni_info?.name }}</span>
            <span class="position">{{ companyInfo?.about_us?.bni_info?.position }}</span>
          </div>
          <div>
            {{ company.name }}
          </div>
          <div>
            <span class="status">
              Veified
            </span>
            <span class="bss-type">
              Manufacturer
            </span>
          </div>
          <div class="tag-box">
            <div v-for="(tag, index) in mainProduct" :key="index">
              <wd-tag custom-class="space" type="primary">{{ tag }}</wd-tag>
            </div>
          </div>
          <div class="bni-info flex">
            <div>
              <div>
                <wd-icon name="time" size="15px"></wd-icon>
                <span>5 Year</span>
              </div>
              <div class="title">
                Join BNI
              </div>
            </div>
            <div v-if="companyInfo?.about_us?.bni_info?.electronicReport">
              <div @click="handleDownloadByFileid">
                <wd-icon name="download" size="15px"></wd-icon>
                <span>
                  <!-- 26.1M -->
                  Download
                </span>
              </div>
              <div class="title">
                Download Catalog
              </div>
            </div>
          </div>
        </div>
      </div>
      <wd-tabs v-model="tab">
        <wd-tab title="Product">
          <div class="card-content">
            <div class="card-swiper" v-if="swiperList.length">
              <wd-swiper autoplay v-model:current="current" :display-multiple-items="2"
                custom-indicator-class="custom-indicator-class" custom-image-class="custom-image"
                custom-next-image-class="custom-image-prev" custom-prev-image-class="custom-image-prev"
                :list="swiperList" previousMargin="24px" nextMargin="24px"></wd-swiper>
            </div>
            <div style="margin-top: 27px;">
              <div class="title-row">
                <wd-icon name="discount-filled" size="19px" style="margin-right:3px"></wd-icon>
                <span>Product Introduction</span>
              </div>
              <div v-html="aboutCs?.bni_info.brief_introduction?.value">
              </div>
              <!-- <CollapseText :text="aboutCs?.bni_info.brief_introduction?.value" /> -->
              <!-- <wd-collapse>
                <div v-if="aboutCs" v-html="aboutCs.brief_introduction.value"></div>
              </wd-collapse> -->
            </div>
          </div>
        </wd-tab>
        <wd-tab title="Factory photos" v-if="factoryList.length">
          <div class="card-content">
            <div class="card-swiper" v-if="factoryList.length">
              <wd-swiper autoplay v-model:current="current" :display-multiple-items="2"
                custom-indicator-class="custom-indicator-class" custom-image-class="custom-image"
                custom-next-image-class="custom-image-prev" custom-prev-image-class="custom-image-prev"
                :list="factoryList" previousMargin="24px" nextMargin="24px"></wd-swiper>
            </div>
          </div>
        </wd-tab>
      </wd-tabs>
      <div class="block-white" style="margin-top: 16px;" v-if="false">
        <div class="title-row">
          <wd-icon name="discount-filled" size="19px" style="margin-right:3px"></wd-icon>
          <span>Product Introduction</span>
        </div>
        <div class="images-list">
          <div v-for="item in 8" :key="item" class="item">
            <wd-img :width="100" :height="100" :src="image" />
          </div>
        </div>
      </div>
    </div>
    <div style="padding:15px 39px">
      <wd-button style="width:100%" size="large">Live Chat</wd-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { WhatsApp, Company, ProductItem, AboutUs, CompanyProfile } from "@/service/index/product";
import { queryCompanyDetail } from '@/service/index/detail'
import { downloadByFileid } from '@/utils/index'
import CollapseText from "@/components/collapseText/index.vue";

const image = `https://p3-passport.byteacctimg.com/img/user-avatar/88bd288485e7e401e21450414b8ec7eb~90x90.awebp`

const productNames = ref([
  "Shoes", "AD colder fans", "Wooden furniture", "Wooden furniture", "Tinbox", "AD colder fans"
])

const handleBack = () => {
  uni.navigateBack();
}

const handleBackHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  });
}

const tab = ref()

const current = ref<number>(0)

const swiperList = ref([
  // 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  // 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  // 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  // 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  // 'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg'
])

const factoryList = ref<string[]>([])

const handleDownloadByFileid = () => {
  // uni.sho
}

const isProductMore = ref(true)

const profile = ref<WhatsApp>()
const company = ref<Company>()
const productList = ref<ProductItem[]>()
const aboutCs = ref<AboutUs>()

const mainProduct = ref<string[]>()

const companyInfo = ref<CompanyProfile>()

onLoad((options) => {
  console.log("options", options.companyId);
  queryCompanyDetail(Number(options.companyId)).then(res => {
    companyInfo.value = res.data.company

    console.log("详情", res.data);
    profile.value = res.data.company.whatsapp
    company.value = res.data.company.company
    productList.value = res.data.company.product
    aboutCs.value = res.data.company.about_us

    swiperList.value = productList.value.map(item => item.images)
    factoryList.value = res.data.company.album.map(item => item.images)

    try {
      mainProduct.value = (JSON.parse(res.data.company.about_us.main_product) as string[])
    } catch (error) {

    }
  })

})
</script>

<style lang="scss" scoped>
.icon-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 3px;
}

.syb {
  font-weight: bold;
  color: red;
}

.name {
  margin-right: 12px;
  font-family: SourceHanSansSC-bold;
  font-size: 16px;
  color: rgba(16, 16, 16, 1);
  text-align: left;
}

.status {
  color: blue;
}

.block-white {
  padding: 21px 10px;
  background-color: white;
}

.info-box {
  display: flex;
  gap: 12px;
  padding: 14px 19px;
  padding-top: 0;

  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 6px;

    .name {
      font-weight: 600;
    }

    .position {
      color: #595959;
      color: 12px;
    }
  }
}

.tag-box {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.bni-info {
  display: flex;
  gap: 40px;

  margin-top: 15px;
  text-align: center;

  .title {
    font-family: SourceHanSansSC-regular;
    font-size: 12px;
    color: rgba(16, 16, 16, 1);
    text-align: left;
  }
}

.title-row {
  display: flex;
  margin-bottom: 9px;
  font-family: SourceHanSansSC-bold;
  font-size: 13px;
  color: rgba(73, 74, 77, 1);
  text-align: left;
}

.card-content {
  padding: 20px 21px 36px 21px;
}

// ---
.card-swiper {
  // --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 15rpx;
  // --wot-swiper-nav-dot-color: #e7e7e7;
  // --wot-swiper-nav-dot-active-color: #4d80f0;
  // padding-bottom: 24rpx;

  :deep(.custom-indicator-class) {
    bottom: -16px;
  }

  :deep(.custom-image) {
    border-radius: 12rpx;
  }

  :deep(.custom-image-prev) {
    // height: 168px !important;
  }
}

.images-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  .item {
    overflow: hidden;
  }
}

.detail-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: #F2F3F7;

  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
