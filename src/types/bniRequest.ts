export interface Request {
  /**
   * 面积（平方米）
   */
  area?: number;
  /**
   * bni 综合信息(前端自定义字段塞入)
   */
  bni_info?: string[];
  /**
   * 公司简介 Example:
   */
  brief_introduction?: string[];
  /**
   * 业务类型：1、Manufacturer，2、Custom manufacturer，3、Trading Company，4、Manufacturer&Trading Company
   */
  business_type?: number;
  /**
   * 市 Example:
   */
  city_name?: string;
  /**
   * 公司名称 Example:
   */
  company_name?: string;
  /**
   * 联系人名称 Example:
   */
  contacts_name?: string;
  /**
   * 国家 Example:
   */
  country_name?: string;
  /**
   * 部门 Example:
   */
  department?: string;
  /**
   * 联系人邮箱 Example:
   */
  email?: string;
  /**
   * 成立年份
   */
  establish_year?: number;
  /**
   * 联系人固定电话 Example:
   */
  fixed_tel?: string;
  /**
   * 代工服务：0否，1是
   */
  is_oem?: number;
  /**
   * 内容展示类型：0默认，1选项卡
   */
  layout_type?: number;
  /**
   * 主营产品，字符串json数组格式
   */
  main_product?: string;
  /**
   * 最大员工数量
   */
  max_staff?: number;
  /**
   * 最小年营业额
   */
  max_year_revenue?: number;
  /**
   * 最少员工数量
   */
  min_staff?: number;
  /**
   * 最小年营业额
   */
  min_year_revenue?: number;
  /**
   * 联系人手机号 Example:
   */
  mobile?: string;
  /**
   * 办公地址 Example:
   */
  office_address?: string;
  /**
   * 个人照片 Example:
   */
  photo?: string;
  /**
   * 省 Example:
   */
  province_name?: string;
  /**
   * 公司注册地址 Example:
   */
  register_address?: string;
  /**
   * 网站 Example:
   */
  website?: string;
  /**
   * 邮编 Example:
   */
  zip_code?: string;
  [property: string]: any;
}


// BniAboutUs => Request