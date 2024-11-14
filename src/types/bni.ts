
export enum MedalEnum {
  // 基石会员
  // 连续六个月绿灯
  // 大师级链接者五星
  // 大师级李娜接着
}

export enum PhotoTypeEnum {
  "COMPANY" = 1,
  "FACTORY",
  "BNI"
}

export interface CompanyInfo {
  // 中文名
  zhName: string
  // 英文名
  enName: string
}

export interface BniAboutUs {
  // 姓名
  name: string
  // 职位
  position?: string
  // 头像
  avatar: string
  // WhatsApp手机号
  whatsapp?: string
  // 电话
  phone?: string
  // 邮箱
  email?: string
  // 加入BNI时间
  joinBni: number
  // 荣誉
  medal?: Array<MedalEnum | string>
  // 公司建立时间
  establishmentPeriod: string
  // 公司性质
  companyNature: string
  // 公司员工数量
  employeeCount: number
  // 公司面积
  companyArea?: string
  // 电子相册 - url
  electronicReport?: string
  // 主营产品
  mainProduct?: string[]
}

export interface BniInfo {

}

// 公司相册
// export interface CompanyPhoto {
//   id: number
//   images: string
// }

// // 工厂相册
// export interface FactoryPhoto {
//   id: number
//   images: string
// }

// // BNI相册
// export interface BniPhoto {
//   id: number
//   images: string
// }

export interface BniPhoto {
  id: number
  images: string
  type: PhotoTypeEnum
}