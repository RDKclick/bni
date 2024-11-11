<template>
  <wd-config-provider :themeVars="themeVars">
    <div class="main-container">
      <TopHead />
      <div class="content">
        <slot />
      </div>
      <div class="footer-box" v-if="false">
        <div class="links">
          <span @click="handleGo('home')">Home</span>
          <span>|</span>
          <span @click="handleGo('about')">About us</span>
        </div>
        <div class="footer">
          Copyright © 2015 - 2024 BNI1688.com. All rights reserved.
        </div>
      </div>
    </div>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import TopHead from "@/components/topHead/index.vue";

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}

const handleGo = (type: 'about' | 'home') => {
  if (type === 'home') {
    uni.switchTab({
      url: "/pages/index/index"
    })
    return
  } else {
    uni.switchTab({
      url: "/pages/about/index"
    })
  }
}

</script>

<style lang="scss">
.main-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  // padding-top: 35px;
  overflow: auto;
  background: #F2F3F7;


  .content {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    overflow: auto;
  }

  .links {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    font-family: SourceHanSansSC-regular;
    font-size: 12px;
    color: rgba(89, 89, 89, 1);
  }

  .footer {
    margin-top: 12px;
    margin-bottom: 9px;
    font-family: SourceHanSansSC-regular;
    font-size: 12px;
    color: rgba(121, 121, 121, 1);
    text-align: center;
  }
}
</style>
