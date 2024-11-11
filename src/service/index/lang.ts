import { http } from '@/utils/http'

export interface LangOption {
  id: any
  matomo_site_id: number
  name: string
  domain: string
  image: string
  description: string
  language_code: string
}

// 请求语言列表
export const queryLangApi = () => {
  return http.get<LangOption[]>('/api/v1/shop/language')
}

export const queryDictApi = (code: string = 'en') => {
  return http.get<Record<string, string>>('/api/v1/shop/getin18', {
    lang: code
  })
}
