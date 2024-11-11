<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '关于我们',
    navigationStyle:'custom'
  },
}
</route>

<template>
  <view class="about-container">
    <div class="ab-item-list">
      <div class="ab-item">
        <div class="title">
          About Us
        </div>
        <div class="hr"></div>
        <div class="content" v-html="infos.aboutUs">
        </div>
      </div>
      <!-- <div v-for="(item, index) in contentList" :key="index" class="ab-item">
        <div v-html="item.content"></div>
      </div> -->
      <div class="ab-item">
        <div class="title">
          Contact us
        </div>
        <div class="hr"></div>
        <div class="content" v-html="infos.contactUs">
        </div>
      </div>
      <div class="ab-item">
        <div class="title">
          Privacy Policy
        </div>
        <div class="hr"></div>
        <div class="content" v-html="infos.privacyPolicy">
        </div>
      </div>
    </div>
  </view>
</template>

<script lang="ts" setup>
import { queryAboutUs } from "@/service/index/detail";
//

const contentList = ref<{ id: number, content: string }[]>([])

const infos = reactive({
  aboutUs: "Launched in 2019, buyerb2b.com is China's leading trading platform, providing trade services to millions of global buyers and suppliers.For more than a decade, we have always believed and adhered to our mission: Make Global Trade Easier.We are committed to leading the development of the industry through product, technology and business model innovation.",
  contactUs: `Launched in 2019, buyerb2b.com is China's leading trading platform, providing trade services to millions of global buyers and suppliers.For more than a decade, we have always believed and adhered to our mission: Make Global Trade Easier. We are committed to leading the development of the industry through product, technology and business model innovation.`,
  privacyPolicy: `Welcome to buyerb2b.com, This is our policy to protect your own privacy. By using this site, you may be clear with how your personal information is used and the process of our work. This policy may change without notice, so please check back periodically.
A. Information
a. Registration Information
When you register as a buyerb2b.com member we collect all the information you enter. This includes your own name, company name,contact ways etc. Membership statistics are derived from members' registration information, however no specific member is named or referred to in the resultant statistical reports. Statistics are generally used to classify our members by, for example, industry and country. This information may be used to target our registered members for new services and promotions. Your e-mail address may be used to contact you regarding new services and products in which you may be interested.
b. Publishing Information
We have the right to disclose your information when we think it's necessary to identify, contact or bring legal action against someone who may be infringing or threatening or who may otherwise be causing injury to or interference with (either intentionally or unintentionally) our title, rights, interests or property or those of other website users or of anyone else who could be harmed by such activities.
We also have the rights to disclose, without notice to you, personal information when we believe in good faith that such disclosure is required by any law, regulation or listing requirement or by any stock/securities exchange, governmental or regulatory authority.
c. Payment Information
We think necessary thaat if you establish a credit account with us or our providers or if you purchase a product or service from our site or a vendor available through buyerb2b.com, we may collect additional information, including billing information, credit card numbers and expiration dates and tracking information from cheques or money orders.
B. Cookies
a. We may set and access cookies on your computer.
We allow other companies that are presenting advertisements on some of our pages to set and access their cookies on your computer. Other companies' use of their cookies is subject to their own privacy policies, not this one. Advertisers or other companies do not have access to our cookies.
We use web beacons to access our cookies within and outside our network of web sites and in connection with buyerb2b.com products and services.
You can determine if and how a cookie will be accepted by configuring the browser which is installed in the computer you are using to access the Sites. If you choose, you can change those configurations. By setting your preferences in the browser, you can accept all cookies or you can choose to be notified when a cookie is sent or you can choose to reject or delete all cookies. If you reject or delete all cookies by choosing the cookie-disabling function in your browser, you may be required to re-enter information on the Sites more often.
b. Security Meastures
All your information including account information and profile is protected.No data transmission over the Internet can be guaranteed to be perfectly secured. however,we try our best to protect your personal information, we cannot ensure or guarantee the security of any information you transmit to us and you do so at your own risk.
c. Attention
We may change the information of it from time to time.If there is anything wrong or what you think have brought you some hurt, Please contact with us as soon as possible.
d. Feedback
Welcome to leave your word.Or you can contact us by sending e-mail to info@buyerb2b.com . Thank you.`
})

queryAboutUs().then(res => {
  if (res.code === 200) {
    contentList.value = res.data.aboutUs;
    infos.aboutUs = res.data.aboutUs[0].content
    infos.contactUs = res.data.aboutUs[1].content
    infos.privacyPolicy = res.data.aboutUs[2].content
  }
})
</script>

<style lang="scss" scoped>
.about-container {
  padding: 14px 10px;
  background-color: #F2F3F7;
}

.ab-item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ab-item {
  padding: 11px 16px;
  background-color: #FFFFFF;

  .title {
    font-family: SourceHanSansSC-bold;
    font-size: 18px;
    color: rgba(16, 16, 16, 1);
    text-align: left;
  }

  .hr {
    display: block;
    width: 36px;
    height: 2px;
    margin: 10px 0;
    background-color: rgba(16, 16, 16, 1);
    // border: 2px solid rgba(16, 16, 16, 1);
  }
}
</style>
