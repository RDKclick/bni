
import { http } from '@/utils/http'
import { CompanyProfile } from "./product";
// /api/v1/shop/companyDetails?company_id=1

// 查询公司详情
export const queryCompanyDetail = (companyId: number) => {
  return http.get<{
    company: CompanyProfile
  }>('/api/v1/shop/companyDetails', { company_id: companyId })
}

// 系统设置的关于我们
export const queryAboutUs = () => {
  return http.get<{
    aboutUs: {
      id: number
      content: string
    }[]
  }>('/api/v1/shop/system/about')
}
