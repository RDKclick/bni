import { http } from "@/utils/http";
// /api/v1/shop/productCategorys/initCategory

interface Params {
  levels: string
  format: 'pid' | string
  lang: 'en' | string
}

export type Category = {
  id: number;
  name: string;
  avatar_img: string;
  level: number;
  pid: number;
  url: string;
  click_count: number;
  product_count: number;
  childrens?: Category[];
};

export const handleQueryCategorys = (config: Params) => {
  return http.get<{
    categorys: Category[]
    total: number
  }>('/api/v1/shop/productCategorys/initCategory', config)
}


// 根据1级id查询分类列表
export const roductCategorysQuerySonCategory = (config: {
  catid: number
  hasOwned: number
  lang?: 'en'
}) => {
  return http.get<{
    categorys: Category[]
    total: number
  }>('/api/v1/shop/productCategorys/querySonCategory', config)
}
