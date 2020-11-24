import request from '@/utils/request'

export default {
  // 添加课程
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduService/course/addCourseInfo',
      method: 'post',
      data:courseInfo,
    })
  }

}
