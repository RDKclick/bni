import { http } from '@/utils/http'

export interface WhatsApp {
  id: number;
  company_id: number;
  company_admin_id: number;
  name: string;
  avatar: string;
  position: string;
  whatsapp_account: string;
  to_greet: string;
  created_at: string;
}

export interface Company {
  id: number;
  name: string;
  domain: string;
  is_verified: string;
  legal_name: string;
  tax_num: string;
}

export interface AboutUs {
  company_name: string;
  main_product: string;
  max_staff: number;
  business_type: string;
  establish_year: string;
  max_year_revenue: string;
  area: string;
  operating_status: string | null;
  system_certification: any[];
  quality_certification: any[];
  process_type: any[];
  brief_introduction?: {
    value: string
  }
  bni_info?: OptionalBniInfo
}

interface AlbumItem {
  id: number;
  images: string;
}

export interface ProductItem {
  id: number;
  title: string;
  images: string;
}

export interface BniInfo {
  avatar: string
  companyArea: string
  companyNature: string
  electronicReport: string
  email: string
  employeeCount: number
  establishmentPeriod: string
  joinBni: string
  mainProduct: string
  medal: string[]
  name: string
  phone: string
  position: string
  whatsapp: string
  brief_introduction: {
    htmlType: 0,
    layoutType: 0,
    tabsTitle: "product details",
    value: string,
  }
}

export type OptionalBniInfo = {
  [K in keyof BniInfo]?: BniInfo[K];
};
export interface CompanyProfile {
  whatsapp?: WhatsApp;
  company: Company;
  about_us: AboutUs;
  album: AlbumItem[];
  product: ProductItem[];
  bni_album?: AlbumItem[];
}

export const getProductAPI = (data?: any) => {
  return http.get<{
    list: CompanyProfile[]
    total: number
  }>('/api/v1/shop/product/list', data)
}

export const productSearchAPI = (data?: any) => {
  return http.get<{
    list: CompanyProfile[]
    total: number
  }>('/api/v1/shop/product/search', data)
}
