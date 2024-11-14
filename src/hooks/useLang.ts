import { inject } from 'vue'
import { queryDictApi } from '@/service/index/lang'

export const useLang = () => {
  const activeLangCode = ref('en')

  // 获取当前语言的code
  function getActiveLangCode() {
    var domain = window.location.hostname; // 获取完整的域名
    var parts = domain.split('.'); // 以点号分割域名

    if (parts.length > 2) {
      let domainIdx = parts.findIndex(item => item === 'bni1688')
      const code = parts[domainIdx - 1]
      return code
    } else {
      return 'en'
    }

    // if (parts.length > 2) {
    //   if (typeof Number(parts[0]) === 'number') {
    //     return 'en'
    //   }


    //   // 如果域名中包含至少两个点，那么返回第二部分作为二级域名
    //   return parts[0];
    // } else {
    //   // 如果没有二级域名，返回空字符串
    //   return 'en';
    // }
  }

  activeLangCode.value = getActiveLangCode()
  console.log(activeLangCode.value); // 输出当前页面的二级域名

  // 字典
  const langDict = ref<Record<string, any>>({})

  // 生成字典
  const genDict = async (langCode?: string) => {
    const code = langCode || getActiveLangCode()

    const res = await queryDictApi(code)
    langDict.value = res.data

    console.log("字典", langDict.value);

    return langDict.value
  }

  return {
    langDict,
    getActiveLangCode,
    genDict,
  }
}

// 使用字典
export const useLangDict = () => {
  const langDict: Ref<Record<string, string>> = inject("langDict")

  function modifySecondLevelDomain(newDomain: string) {
    var currentUrl = new URL(window.location.href); // 获取当前 URL 对象
    var hostnameParts = currentUrl.hostname.split('.'); // 分割当前域名

    // 检查是否有至少两个部分（二级域名和顶级域名）
    if (hostnameParts.length < 2) {
      console.error('Invalid hostname for modification');
      return;
    }

    // 构建新的域名，保留顶级域名和其余部分
    var newHostname = `${newDomain}.${hostnameParts.slice(-2).join('.')}`;

    // 更新 URL 对象的 hostname 部分
    currentUrl.hostname = newHostname;

    // 返回新的 URL 字符串
    return currentUrl.toString();
  }

  return {
    lang: (str: string) => langDict.value[str] || str,
    modifySecondLevelDomain
  }
}
