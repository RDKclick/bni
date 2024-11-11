<template>
  <div class="top-header">
    <div class="left" @click="handleGoCategory" v-if="false">
      <!-- <span> -->
      <!-- China -->
      <!-- </span> -->
      <span class="a">[分类查询]</span>
    </div>
    <div class="left">
      <span class="project-name">BNI1688</span>
    </div>
    <!-- <div class="right">
      <span>English</span>
      <wd-icon name="arrow-down" size="12px" style="margin-left:4px"></wd-icon>
    </div> -->
    <!-- <div class="right">

    </div> -->
    <div>
      <div @click="closeOutside">
        <wd-drop-menu>
          <wd-drop-menu-item v-model="activeLang" :options="langOptions" @change="handleChange" />
        </wd-drop-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { queryLangApi, LangOption } from "@/service/index/lang";
import { useLangDict, useLang } from "@/hooks/useLang";
import { useQueue } from 'wot-design-uni'

interface LangOptions extends LangOption {
  label: string
  value: number
}

const activeLang = ref<number>(1)
const langOptions = ref<LangOptions[]>([])

const { getActiveLangCode } = useLang()

const { closeOutside } = useQueue()
queryLangApi().then(res => {
  langOptions.value = res.data.map(item => {
    return {
      label: item.language,
      value: item.id,
      ...item
    }
  })

  const code = getActiveLangCode()
  const target = langOptions.value.find(item => item.language_code === code)
  activeLang.value = target.id

  console.log("语言列表", res.data, langOptions.value);
})

// 前往分类页
const handleGoCategory = () => {
  // uni.switchTab({
  //   url: "/pages/category/index"
  // })
  uni.navigateTo({
    url: "/pages/category/index"
  })
}

const { modifySecondLevelDomain } = useLangDict()
const handleChange = (row: any) => {
  const link = modifySecondLevelDomain(row.selectedItem.language_code)

  console.log("修改了", link, modifySecondLevelDomain(row.selectedItem.language_code));
  if (link) {
    location.href = link
  }
}
</script>

<style lang="scss" scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  background-color: #FFFFFF;
}

.left {
  .project-name {
    font-weight: bold;
  }

  span {
    font-family: PingFangSC-regular;
    font-size: 14px;
    color: rgba(16, 16, 16, 1);
    text-align: left;
  }

  .a {
    color: #6EB9ED;
  }
}

.right {
  display: flex;
  align-items: center;
  font-family: Arial;
  font-size: 14px;
  line-height: 20px;
  color: rgba(51, 51, 51, 1);

}
</style>
