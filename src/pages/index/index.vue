<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
    navigationStyle:'custom'
  },
}
</route>

<template>
  <div>
    <scroll-view :refresher-enabled="true" :refresher-triggered="refresherTriggered"
      @refresherpulling="handleQueryProduct">
      <SearchBar />
      <div style="margin: 55px;" v-show="false">
        <h3 style="margin-bottom: 12px;text-align: center;">测试</h3>
        <div style="display: flex;justify-content: space-between;">
          <wd-button @click="handleViewDetail">详情页</wd-button>
          <wd-button @click="handleQuery">关于</wd-button>
        </div>
      </div>
      <div class="body-container">
        <!-- 卡片列 -->
        <div class="card-column-container">
          <div class="row">
            <wd-icon name="star-filled" size="15px" style="margin-right: 8px;"></wd-icon>
            <span class="title">{{ lang("browseByCategory") }}</span>
          </div>
          <div class="card-column-row">
            <div class="card-column" v-for="(product, index) in productList.slice(0, 3)" :key="index"
              @click="handleViewDetail(product.company.id)">
              <div class="bg-box">
                <wd-img width="100%" mode="aspectFit" height="160px" :src="product.product[0].images" />
                <div class="av">
                  <wd-img :width="54" :height="54" :src="product.whatsapp.avatar" />
                </div>
              </div>
              <div class="name">
                {{ product.whatsapp.name }}
              </div>
              <div class="factory-images">
                <div class="images" v-for="(factory, index) in product.album" :key="index">
                  <!-- imageUrl="http://en.bni1688.co/storage/upload/images/company/5386/other/2024/01/06/1704533245825414.jpg" -->
                  <!-- <AutoImg :imageUrl="factory.images" /> -->
                  <wd-img width="100%" mode="widthFix" :src="factory.images" :enable-preview="true">
                    <template #error>
                      <!-- <wd-loading /> -->
                      <!-- <view class="error-wrap">404</view> -->
                    </template>
                  </wd-img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="user-card-container">
          <div class="row">
            <wd-icon name="star-filled" size="15px" style="margin-right: 8px;"></wd-icon>
            <span class="title">SourceHanSansSC-medium</span>
          </div>
          <div class="user-card-list">
            <UserCard v-for="(product, index) in productList" :key="index" :product="product" />
          </div>
        </div>
      </div>
    </scroll-view>

  </div>
</template>

<script lang="ts" setup>
import SearchBar from '@/components/searchBar/index.vue'
import UserCard from "@/components/userCard/index.vue";
import { CompanyProfile, getProductAPI } from '@/service/index/product'

// hooks
import { useLangDict } from '@/hooks/useLang'

const { lang } = useLangDict()

const handleViewDetail = (companyId: number) => {
  uni.navigateTo({
    url: '/pages/detail/index?companyId=' + companyId,
  })
}

const handleQuery = () => {
  uni.switchTab({
    url: '/pages/about/index'
  })
}

const refresherTriggered = ref(false)

const productList = ref<CompanyProfile[]>([])

const handleQueryProduct = () => {
  refresherTriggered.value = true
  getProductAPI().then(res => {
    console.log("数据", res.data.list);

    const { list } = res.data
    productList.value = list

  }).finally(() => {
    refresherTriggered.value = false
  })
}

handleQueryProduct()

</script>

<style lang="scss" scoped>
.body-container {
  box-sizing: border-box;
  width: 100%;
  padding: 46px 17px 0;
  margin-top: -29px;
  overflow: auto;
  background: white;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.card-column-container {
  width: 100%;
  margin-bottom: 44px;


  .card-column-row {
    display: flex;
    gap: 6px;
    width: 100%;

    .card-column {
      flex: 1;
      width: 33%;
      overflow: hidden;

      .bg-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F8F8F8;
        border: 1px solid #ECECEC;

        .av {
          position: absolute;
          bottom: -25px;
          left: 50%;
          // background-color: #F8F8F8;
          // border: 1px solid #ECECEC;
          // border-radius: 50%;
          transform: translateX(-50%);
        }
      }

      .name {
        margin-top: 25px;
        margin-bottom: 11px;
        font-family: SourceHanSansSC-bold;
        font-size: 13px;
        color: rgba(16, 16, 16, 1);
        text-align: center;
      }

      .factory-images {
        display: flex;
        gap: 9px;
        height: 47px;

        .images {
          box-sizing: border-box;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          width: 50%;
          overflow: hide;
          background-color: #F8F8F8;
          border: 1px solid #d3cbcb;
          border-radius: 5px;
        }
      }
    }
  }
}

.user-card-list {
  display: flex;
  flex-direction: column;
  gap: 12px
}
</style>
