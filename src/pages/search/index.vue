<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '搜索',
  },
}
</route>

<template>
  <div style="background-color: #F2F3F7;">
    <z-paging ref="paging" v-model="dataList" @query="queryList" style="background-color: #F2F3F7;">
      <template #top>
        <div class="search-box-container">
          <div class="search-box" style="width: 100%;">
            <wd-input type="text" style="width: 100%;" v-model="searchName" placeholder="请输入用户名" @change="queryList"
              no-border suffix-icon="search" />
          </div>
        </div>
        <div class="count-row">
          {{ dataList.length }} products found for {{ searchName || 'any' }}
        </div>
      </template>

      <!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
      <!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
      <view class="g-UserCard-list">

        <view class="g-UserCard" v-for="(item, index) in dataList" :key="index">
          <!-- <view class="item-title">{{ item.whatsapp.name }}</view> -->
          <UserCard :product="item" />
        </view>
      </view>
    </z-paging>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import UserCard from '@/components/userCard'
import { getProductAPI } from '@/service/index/product'

const paging = ref(null)
// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const dataList = ref([])

const searchName = ref('')

// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
const queryList = (pageNo, pageSize) => {
  // 此处请求仅为演示，请替换为自己项目中的请求
  getProductAPI({
    keyword: searchName.value,
    page: pageNo,
    num: pageSize
  }).then(res => {
    // 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
    paging.value.complete(res.data.list);
  }).catch(res => {
    // 如果请求失败写paging.value.complete(false);
    // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
    // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
    paging.value.complete(false);
  })
}

onLoad((options) => {
  console.log("searchName", searchName);

  if (options.searchName) {
    searchName.value = options.searchName
  }
})
</script>

<style lang="scss" scoped>
.item-title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.search-box-container {
  display: flex;
  align-items: center;
  padding: 11px;
  background-color: white;
}

.search-box {
  display: flex;
  align-items: center;
  padding: 5px 12px;
  font-family: Arial;
  font-size: 14px;
  line-height: 20px;
  color: rgba(16, 16, 16, 1);
  text-align: left;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 8px;
}

.count-row {
  padding: 9px 11px;
  font-family: SourceHanSansSC-regular;
  font-size: 12px;
  color: rgba(89, 89, 89, 1);
  text-align: left;
}

.g-UserCard-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px;

  .g-UserCard {
    padding: 14px 13px;
    background-color: white;
  }
}
</style>
