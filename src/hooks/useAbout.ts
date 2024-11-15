import dayjs from "dayjs";
import { BniInfo, CompanyProfile } from "@/service/index/product";

export const useAbout = (company: CompanyProfile) => {
  const { bni_info, ...options } = company.about_us;

  const formData: BniInfo = {
    // 姓名
    name: "",
    // 职位
    position: "总经理",
    // 头像
    avatar: "",
    // WhatsApp手机号
    whatsapp: "",
    // 电话
    phone: "",
    // 邮箱
    email: "",
    // 加入BNI时间
    joinBni: dayjs().format("YYYY-MM-DD"),
    // 荣誉
    medal: [],
    //   Array<MedalEnum | string>
    // 公司建立时间
    establishmentPeriod: dayjs().format("YYYY-MM-DD"),
    // 公司性质
    companyNature: "1",
    // 公司员工数量
    employeeCount: 0,
    // 公司面积
    companyArea: '0',
    // 电子相册 - url
    electronicReport: undefined,
    // 主营产品
    mainProduct: '',
    // 公司简介
    brief_introduction: {
      htmlType: 0,
      layoutType: 0,
      tabsTitle: "product details",
      value: "<p></p>",
    },
  }

  for (const key in bni_info) {
    const val = bni_info[key];

    if (["establishmentPeriod", "joinBni"].includes(key)) {
      if (val) {
        formData[key] = dayjs(bni_info[key]);
      }
    } else if (["brief_introduction"].includes(key) && !formData[key]) {
      formData[key] = {
        htmlType: 0,
        layoutType: 0,
        tabsTitle: "product details",
        value: "<p></p>",
      };
      // 判断是否需要从外部确认是否存在? 若不存在则bin_info里面取
    } else if (key === "name") {
      // 判断是否需要从options中取
      formData[key] = options["contacts_name"] || bni_info[key];
    } else if (key === "avatar") {
      formData[key] = options["avatar"] || bni_info[key];
    } else if (key === "phone") {
      formData[key] = options["mobile"] || bni_info[key];
    } else if (key === "email") {
      formData[key] = options["email"] || bni_info[key];
    } else if (key === "establishmentPeriod") {
      formData[key] = options["establish_year"] || bni_info[key];
    } else if (key === "companyNature") {
      formData[key] = options["business_type"] || bni_info[key];
    } else if (key === "employeeCount") {
      formData[key] = options["min_staff"] || bni_info[key];
    } else if (key === "companyArea") {
      formData[key] = options["area"] || bni_info[key];
    } else if (key === "mainProduct") {
      if (Array.isArray(options["main_product"])) {
        formData[key] = options["main_product"].join("\n");
      } else {
        formData[key] = bni_info[key];
      }
    } else if (key === "layout_type") {
      formData[key] = options["layout_type"] || bni_info[key];
    } else if (key === "brief_introduction") {
      formData[key].value = options['brief_introduction'].value || bni_info[key].value
    } else {
      formData[key] = bni_info[key];
    }
  }

  return formData
}
