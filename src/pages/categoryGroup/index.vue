<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'Bni1688',
    navigationStyle:'custom',
  },
}
</route>

<template>
  <!-- <view class="cg-container">

  </view> -->
  <z-paging @query="handleQueryProductList" ref="pagingRef" v-model="productList">
    <template #top>
      <div class="top-container">
        <div class="top-bar" @click="handleBack">
          <wd-icon name="thin-arrow-left" size="14px" color="#4654A3"> </wd-icon>
          <span class="title">{{ cgName }}</span>
        </div>
        <div class="search-card">
          <SelectRow :title="`Category`" :options="categoryThree" :value="searchParams.category_id3"
            @toggle="handleToggleCategoryThree" />
          <SelectRow title="Year's Annual Revenue (million) " :options="revenueArr" :value="searchParams.year_revenue"
            @toggle="handleToggleYear" />
          <SelectRow title="Area (㎡)" :options="areaAr" :value="searchParams.area" @toggle="handleToggleArea" />
        </div>
        <div class="top-tip">
          <!-- Now {{ productList.length }} pieces of data are shown below -->
        </div>
      </div>
    </template>
    <view class="user-list">
      <view class="user-card" v-for="item in productList" :key="item.whatsapp.id">
        <UserCard :product="item" />
      </view>
    </view>
    <!-- 自定义的没有更多数据view -->
    <template #loadingMoreNoMore>
      <view style="padding:15px 0;color:#CCCCCC;text-align: center">No More</view>
    </template>
  </z-paging>

</template>

<script lang="ts" setup>
import { getProductAPI, CompanyProfile } from '@/service/index/product'
import { Category, roductCategorysQuerySonCategory } from '@/service/index/category'

import UserCard from '@/components/userCard/index.vue'
import SelectRow from '@/components/selectRow/index.vue'

const cgName = ref('')

const searchParams = reactive({
  page: 1,
  pageSize: 10,
  category_id1: undefined,
  category_id2: undefined,
  category_id3: undefined,
  year_revenue: undefined,
  area: undefined,
})

const revenueArr = ref([
  {
    value: '0-1',
    label: '< US$1'
  },
  {
    value: '1-10',
    label: 'US$1 < or < US$10'
  },
  {
    value: '10-100',
    label: 'US$10 < or < US$100'
  },
  {
    value: '100-1000000',
    label: '> US$100'
  }
])

const areaAr = ref([
  {
    value: '0-100',
    label: '< 100'
  },
  {
    value: '100-500',
    label: '100 < or < 500'
  },
  {
    value: '500-1000',
    label: '500 < or < 1000'
  },
  {
    value: '1000-1000000000',
    label: '> 1000'
  }
])

const handleBack = () => {
  uni.navigateBack()
}

interface CategoryOptions extends Category {
  label: string;
  value: number;
}

const categoryThree = ref<CategoryOptions[]>([])
const handleInit = async () => {
  await roductCategorysQuerySonCategory({
    catid: searchParams.category_id2,
    hasOwned: 0,
    lang: 'en'
  }).then(res => categoryThree.value = res.data.categorys.map(item => Object.assign(item, {
    label: item.name,
    value: item.id
  })))
}

const pagingRef = ref()

const handleToggleYear = (record: any) => {
  searchParams.year_revenue = record.value
  pagingRef.value.reload()
}

const handleToggleArea = (record: any) => {
  searchParams.area = record.value
  pagingRef.value.reload()
}

const productList = ref<CompanyProfile[]>()
const handleQueryProductList = async (pageNo, pageSize) => {
  searchParams.page = pageNo
  searchParams.pageSize = pageSize

  await getProductAPI(searchParams).then(res => {
    productList.value = res.data.list
    console.log("数量", productList.value);

    pagingRef.value.complete(productList.value);
  }).catch(() => {
    pagingRef.value.complete(false);
  })
}

const handleToggleCategoryThree = (record: any) => {
  searchParams.category_id3 = record.id
  pagingRef.value.reload()
}

onLoad((options) => {
  const { twoLevel, firstLevel, name } = options

  console.log("name", name);
  // cgName.value = name
  searchParams.category_id1 = Number(firstLevel)
  searchParams.category_id2 = Number(twoLevel)

  handleInit()
})
</script>

<style lang="scss" scoped>
.z-paging-content {
  padding: 10px 11px;
  background-color: #F2F3F7;
}

.cg-container {
  padding: 10px 11px;


}

.top-bar {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-card {
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding: 14px 13px;
  margin-top: 10px;
  margin-bottom: 7px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 236, 236, 1);

  .row {
    display: flex;
    gap: 24px;

    .title {
      font-family: SourceHanSansSC-regular;
      font-size: 13px;
      color: rgba(89, 89, 89, 1);
    }

    .option {
      overflow: hidden;
      font-family: SourceHanSansSC-regular;
      font-size: 13px;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.active {
        color: #4654A3;
      }
    }
  }
}

.top-tip {
  font-family: PingFangSC-regular;
  font-size: 12px;
  color: rgba(121, 121, 121, 1);
  text-align: left;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  // overflow: auto;
}

.user-card {
  padding: 14px 12px;
  line-height: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 236, 236, 1);
}
</style>
