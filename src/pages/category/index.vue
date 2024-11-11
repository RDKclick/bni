<route lang="json5" type="page">
  {
    layout: 'demo',
    style: {
      navigationBarTitleText: '分类',
      navigationStyle:'custom'
    },
  }
</route>

<template>
  <div class="">
    <z-paging ref="paging" refresher-only @onRefresh="onRefresh">
      <template #top>
        <TopHead />
        <!-- :handle-search-name="handleSearchName"  -->
        <SearchBar />
      </template>
      <!-- 页面内容 -->
      <div class="category-container">
        <div class="row">
          Browse by Category
        </div>
        <div class="card-block-list">
          <div class="card-block" v-for="cg in categoryList" :key="cg.id">
            <div class="title">
              {{ cg.name }}
            </div>
            <ul v-if="cg.childrens">
              <li v-for="cl in cg.childrens" :key="cl.id" @click.stop="handleViewCategory(cg.id, cl.id, cl.name)">{{
                cl.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </z-paging>
  </div>
</template>

<script lang="ts" setup>
import { handleQueryCategorys, Category } from "@/service/index/category";
import SearchBar from "@/components/searchBar/index.vue";
import TopHead from "@/components/topHead/index.vue";

const paging = ref()

const onRefresh = async () => {
  await handleQueryData()
  paging.value?.complete()
}

const categoryList = ref<Category[]>([])
const total = ref(0)

const searchParams = reactive({
  keyword: undefined
})

const handleQueryData = () => {
  categoryList.value = []

  return handleQueryCategorys({
    levels: '1,2',
    format: 'pid',
    lang: 'en',
    ...searchParams
  }).then(res => {
    if (res.code === 200) {
      const { total: t, categorys } = res.data
      categoryList.value = categorys
      total.value = t
    }
  })
}

const handleViewCategory = (firstLevel: number, twoLevel: number, name: string) => {
  // name = decodeURIComponent()

  uni.navigateTo({
    url: `/pages/categoryGroup/index?firstLevel=${firstLevel}&twoLevel=${twoLevel}`,
  })
}

const handleSearchName = (name: string) => {
  searchParams.keyword = name
  handleQueryData()
}

handleQueryData()
</script>

<style lang="scss" scoped>
.category-container {
  padding: 19px 17px 0;

  .row {
    margin-bottom: 11px;
  }
}

.card-block-list {
  display: flex;
  flex-direction: column;
}

.card-block {
  padding: 17px 18px;
  line-height: 19px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 236, 236, 1);
  border-radius: 4px;

  .title {
    margin-bottom: 12px;
    font-family: SourceHanSansSC-medium;
    font-size: 14px;
    color: rgba(68, 68, 68, 1);
    text-align: left;
  }
}
</style>
