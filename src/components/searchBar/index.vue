<template>
  <div class="mb-banner" :style="{ backgroundImage: `url(${bg})` }">
    <h2>
      BNI1688
    </h2>
    <div class="input-box">
      <wd-input type="text" no-border v-model="value" style="border:0" placeholder="I'm looking for..."
        name="search-val"></wd-input>
      <wd-icon name="search1" size="24px" @click="handleSearch"></wd-icon>
      <!-- <i class="iconfont icon-sousuo" id="search"></i> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import bg from "../../static/images/home-bg.jpg";

interface Props {
  handleSearchName?: (searchName: string) => void;
}

const props = withDefaults(defineProps<Props>(), {})

const value = ref()
const handleSearch = () => {
  if (props.handleSearchName) {
    props.handleSearchName(value.value)
    return false
  }
  uni.navigateTo({
    url: "/pages/search/index?searchName=" + value.value
  })

}
</script>

<style lang="scss" scoped>
.mb-banner {
  position: relative;
  height: 81px;
  padding: 16px 17px;
  margin-bottom: 19px;
  background-repeat: no-repeat;
  background-position: right;
  background-size: 100% 100%;
}

.mb-banner h2 {
  color: rgba(255, 255, 255, 1);
}

.mb-banner .input-box {
  position: absolute;
  bottom: -16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  width: calc(100vw - 58px);
  height: 45px;
  padding: 0 12px;
  font-family: Arial;
  font-size: 14px;
  line-height: 20px;
  color: rgba(165, 165, 165, 1);
  text-align: left;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: 0px 2px 6px 0px rgba(72, 78, 168, 0.2);
}

@media (min-width: 768px) {
  .mb-banner .input-box {
    width: 300px
  }
}

.mb-banner .input-box input {
  height: 40px;
}

.mb-banner .input-box .iconfont.icon-sousuo {
  font-size: 24px;
  color: #4654A3;
  text-align: right;
}


.mb-banner .input-box input:focus {
  outline: none;
}
</style>
