<template>
  <div class="user-card" @click="handleViewDetail(product.company.id)">
    <div class="user-card-body">
      <div class="left" @click.stop>
        <wd-img width="100%" mode="widthFix" :src="product.product[0].images"
          v-if="product.product && product.product[0] && product.product[0].images" :enable-preview="true">
          <template #error>
            <wd-img width="100%" mode="widthFix" src="	http://test.buyerb2b.com/static/images/fantasy_indexhead.png"
              :enable-preview="true"></wd-img>
          </template>
        </wd-img>
        <wd-img width="100%" mode="widthFix" v-else src="	http://test.buyerb2b.com/static/images/fantasy_indexhead.png"
          :enable-preview="true"></wd-img>
      </div>
      <div class="right">
        <div class="name-text">
          {{ product.company.name }}
        </div>
        <div class="info-row">
          <span class="Verified" :style="{
            color: product.company.is_verified ? '#217DF2' : '#999999'
          }">{{ product.company.is_verified ? 'Verified' : 'Unverified' }}</span>
          <span style="margin-left: 8px;">Manufacturer</span>
        </div>
        <div class="product-list">
          <!-- <div v-for="p in product.product">{{ p.title }}</div> -->
          <div v-for="p in mainProduct">{{ p }}</div>
        </div>

        <div class="factory-images-list">
          <div class="images" v-for="item in product.album" @click.stop>
            <wd-img width="100%" mode="widthFix" :src="item.images" :enable-preview="true"></wd-img>
          </div>
        </div>
      </div>
    </div>
    <div class="user-card-footer">
      <div class="left">
        <div class="avatar-warp">
          <img :src="product.whatsapp.avatar" width="100%" class="avatar" />
        </div>
        <div>
          <div class="people-title">
            {{ product.whatsapp.name }}
          </div>
          <div class="people-position">
            {{ product.whatsapp.position }}
          </div>
        </div>
      </div>
      <div class="right">
        <!-- <i class="iconfont icon-liuyanfill"></i> -->
        <span>
          Live Chat
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CompanyProfile } from '@/service/index/product'
interface Props {
  product: CompanyProfile
}

const props = withDefaults(defineProps<Props>(), {})

const mainProduct = computed(() => {

  try {
    return (JSON.parse(props.product.about_us.main_product) as string[])
  } catch (error) {
    return []
  }
})

const handleViewDetail = (companyId: number) => {
  uni.navigateTo({
    url: '/pages/detail/index?companyId=' + companyId,
  })
}
</script>

<style lang="scss" scoped>
.user-card {
  padding-bottom: 16px;
  border-bottom: 1px solid #EFEFEF;
}

.user-card-body {
  display: flex;
  gap: 15px;

  &:last-child {
    border-bottom: none;
  }

  .left {
    width: 40%;
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 4px;
  }

  .right {
    flex: 1;

    .info-row {
      margin: 8px 0;
    }

    .name-text {
      font-family: SourceHanSansSC-bold;
      font-size: 14px;
      color: rgba(70, 84, 163, 1);
      text-align: left;
    }

    .verified {
      color: #217DF2;
    }

    .product-list {
      margin-top: 12px;
      font-family: SourceHanSansSC-regular;
      font-size: 12px;
      line-height: 14px;
      color: rgba(16, 16, 16, 1);
      text-align: left;
    }

    .factory-images-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;

      .images {
        flex: 1;
      }
    }
  }
}

.user-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;

  .left {
    display: flex;
    align-items: center;
  }

  .right .iconfont {
    margin-right: 20px;
    font-size: 28px;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    font-family: Arial;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    color: rgba(0, 189, 97, 1);
    text-align: center;
    background-color: rgba(231, 233, 249, 1);
    border-radius: 21px;
  }
}

.avatar-warp {
  margin-right: 9px;
}

.avatar {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 52px;
}
</style>
