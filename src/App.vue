<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useLang } from '@/hooks/useLang'



const { genDict, langDict } = useLang()

provide("langDict", langDict)

genDict()

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
  // #ifdef H5
  // uni.hideTabBar({});
  // #endif
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
.uni-placeholder {
  display: none
}

/* 媒体查询，针对PC端进行样式调整 */
@media (min-width: 768px) {

  /* 设置视口，确保页面在不同设备上都能正确显示 */
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 设置body的默认样式 */
  body {
    /* 视口宽度 */
    display: flex;
    /* 水平居中 */
    align-items: center;
    /* 使用flex布局 */
    justify-content: center;
    /* 视口高度 */
    width: 100vw;
    /* 防止滚动条出现 */
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: #EDF2FA;
    /* 垂直居中 */
  }

  /* 设置手机屏幕尺寸的容器 */
  .mobile-container {
    /* 手机高度 */
    position: relative;
    width: 375px;
    /* 手机宽度 */
    // height: 667px;
    height: 100%;
    /* 背景色 */
    overflow: hidden;
    /* 边框，方便查看边界 */
    background-color: #EDF2FA;
    /* 相对定位 */
    border: 1px solid #ccc;
    /* 防止内容溢出 */
  }

  .mobile-container {
    position: absolute;
    /* 绝对定位 */
    // top: 50%;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    /* 居中 */
  }
}

.error-wrap {
  width: 100%;
  height: 100%;
  line-height: 100px;
  color: white;
  text-align: center;
  background-color: red;
}

/* #ifdef H5 */
// uni-page-head {
//   display: none;
// }
/* #endif */
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
