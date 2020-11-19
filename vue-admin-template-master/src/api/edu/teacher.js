import request from '@/utils/request'

export default {

  // 获取讲师列表,条件分页查询
  getTeacherListPage(current, limit, queryTeacher) {
    return request({
      
      // url: '/eduService/eduTeacher/pageTeacherCondition/'+current+'/'+limit,
      url: `/eduService/eduTeacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: queryTeacher, // 把对象转换为json传递到接口中
    })
  },

  // 添加讲师
  addTeacher(eduTeacher) {
    return request({
      url: '/eduService/eduTeacher/addTeacher',
      method: 'post',
      data: eduTeacher, // 把对象转换为json传递到接口中
    })
  }
}


