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
  },

  // 删除讲师
  delTeacher(id) {
    return request({
      url: `/eduService/eduTeacher/removeTeacher/${id}`,
      method: 'delete'
    })
  },

  // 查询讲师详细信息
  getTeacherInfo(id) {
    return request({
      url: `/eduService/eduTeacher/getTeacher/${id}`,
      method: 'get'
    })
  },

  // 修改讲师
  updateTeacher(eduTeacher) {

    return request({
      url: '/eduService/eduTeacher/updateTeacher',
      method: 'post',
      data: eduTeacher
    })

  }

}


