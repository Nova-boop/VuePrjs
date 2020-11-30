import request from '@/utils/request'

export default {
  // 添加课程
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduService/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  // 根据ID 查询课程基本信息
  getCourseInfoById(courseId) {
    return request({
      url: `/eduService/course/getCourseInfo/${courseId}`,
      method: 'get',
    })
  },
  // 修改课程基本信息
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduService/course/updateCourseInfo',
      method: 'post',
      data: courseInfo,
    })
  },

}
