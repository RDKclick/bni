<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: 'Home',
    navigationStyle:'custom'
  },
}
</route>

<template>
  <z-paging ref="pagingRef" v-model="productList" @query="queryList">
    <template #top>
      <TopHead />
    </template>
    <SearchBar />
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
              <AutoImg :src="product.product[0].images" />
              <div class="av">
                <AutoImg :src="product?.about_us?.bni_info?.avatar" />
              </div>
            </div>
            <div class="name">
              {{ product.about_us.bni_info.name || '-' }}
            </div>
            <div class="factory-images">
              <template v-for="(factory, index) in product.album" :key="index">
                <div class="images" v-if="index <= 1">
                  <AutoImg :src="factory.images" :preview-current="index"
                    :preview-urls="product.album.map(item => item.images)" />
                </div>
              </template>
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
    <!-- 自定义的没有更多数据view -->
    <template #loadingMoreNoMore>
      <view style="padding:15px 0;color:#CCCCCC;text-align: center">no more...</view>
    </template>
  </z-paging>

</template>

<script lang="ts" setup>
import TopHead from "@/components/topHead/index.vue";
import AutoImg from "@/components/autoImg/index.vue";
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

const pagingRef = ref()

const queryList = (pageNo, pageSize) => {
  // 此处请求仅为演示，请替换为自己项目中的请求
  getProductAPI({ pageNo, pageSize }).then(res => {
    // 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
    pagingRef.value.complete(res.data.list);
  }).catch(res => {
    // 如果请求失败写paging.value.complete(false);
    // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
    // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
    pagingRef.value.complete(false);
  })
}

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

</script>

<style lang="scss" scoped>
.body-container {
  box-sizing: border-box;
  width: 100%;
  padding: 46px 17px 0;
  margin-top: -29px;
  // overflow: auto;
  background: white;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .title {
    font-family: SourceHanSansSC-Bold;
  }
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

      .bg-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        aspect-ratio: 118/160;
        background-color: #F8F8F8;
        border: 1px solid #ECECEC;

        .av {
          position: absolute;
          bottom: -25px;
          left: 50%;
          width: 54px;
          height: 54px;
          overflow: hidden;
          border-radius: 50%;
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
        gap: 5px;
        justify-content: space-between;
        height: 47px;

        .images {
          box-sizing: border-box;
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1;
          // width: 50%;
          // overflow: hide;
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
