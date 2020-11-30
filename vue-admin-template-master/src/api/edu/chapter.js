import request from '@/utils/request'

export default {
  // 获取chapter video
  getChapterVideoList(courseId) {
    return request({
      url: `/eduService/eduChapter/getChapterVideo/${courseId}`,
      method: 'get',
    })
  },
  // 添加 chapter
  addChapter(chapter) {
    return request({
      url: "/eduService/eduChapter/addChapter",
      method: 'post',
      data: chapter
    })
  },
  // 修改 chapter
  updateChapter(chapter) {
    return request({
      url: "/eduService/eduChapter/updateChapter",
      method: 'post',
      data: chapter
    })
  },
  // 获取 chapterInfo
  getChapterInfo(chapterId) {
    return request({
      url: '/eduService/eduChapter/getChapterInfo/' + chapterId,
      method: 'get',
    })
  },
  // 删除
  delChapterInfo(chapterId) {
    return request({
      url: '/eduService/eduChapter/delChapter' + chapterId,
      method: 'delete',
    })
  },
}
