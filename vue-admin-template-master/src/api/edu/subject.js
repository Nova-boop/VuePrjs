import request from "@/utils/request";

export default {
  // 获取课程分类的列表
  getAllSubject() {
    return request({
      url: "/eduService/eduSubject/getAllSubject",
      method: "get"
    });
  }
};
