<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps
      :active="1"
      align-center
      process-status="wait"
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subjectP in subjectParentIdList"
            :key="subjectP.id"
            :label="subjectP.title"
            :value="subjectP.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectIdList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师  -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          :min="0"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介  -->
      <el-form-item label="课程简介">
        <tinymce v-model="courseInfo.description" :height="300"/>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :action="BASE_API + '/eduOss/file/upload'"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          class="avatar-uploader"
        >
          <img :src="courseInfo.cover"/>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseInfo.price"
          :min="0"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="savaOrUpdateCourseInfo"
        >保存并下一步
        </el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course";
import teacher from "@/api/edu/teacher";
import subject from "@/api/edu/subject";
import Tinymce from "@/components/Tinymce";


export default {
  components: {Tinymce},
  name: "info",
  data() {
    return {
      courseInfo: {
        title: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        subjectParentId: "",
        description: "",
        cover:
          "https://edu-nova.oss-cn-chengdu.aliyuncs.com/2020/11/25/5cc1d9c55bde4db8a8292d139d1d74ce海湾.jpg", //默认值
        price: 0
      },
      courseId: '',
      saveBtnDisabled: false, // 保存按钮是否禁用
      teacherList: [],
      subjectParentIdList: [], //一级分类列表
      subjectIdList: [], //二级分类列表
      BASE_API: process.env.BASE_API
    };
  },
  watch: {
    $route(to, from) {
      // 监听
      this.savaOrUpdateCourseInfo();
    }
  },

  created() {
    // 获取路由中的ID
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCourseInfoById();
    }
    this.getTeacherList();
    this.getOneSubjectList();
  },

  methods: {
    // 获取课程基本信息
    getCourseInfoById() {
      course.getCourseInfoById(this.courseId)
        .then(response => {
          //
          this.courseInfo = response.data.courseInfoVo
          // 查询所有的一级二级分类
          subject.getAllSubject().then(response => {
            // 先获取所有的一级分类
            this.subjectParentIdList = response.data.SubjectList
            // 遍历所有的一级分类,
            for (let i = 0; i < this.subjectParentIdList.length; i++) {
              // 当前的courseInfo 中的id 与一级分类是否一致
              if (this.courseInfo.subjectParentId === this.subjectParentIdList[i].id) {
                // 如果一致,返回二级分类的列表
                this.subjectIdList = this.subjectParentIdList[i].children
              }
            }
          })

        })

      this.getTeacherList();
    },
    // 获取一级分类
    getOneSubjectList() {
      subject.getAllSubject().then(response => {
        this.subjectParentIdList = response.data.SubjectList;
      });
    },

    // 获取二级分类
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectParentIdList.length; i++) {
        if (this.subjectParentIdList[i].id === value) {
          this.subjectIdList = this.subjectParentIdList[i].children;
          // 重置选项值
          this.courseInfo.subjectId = "";
        }
      }
    },

    // 查询所有讲师
    getTeacherList() {
      teacher.getAllTeacherList().then(response => {
        this.teacherList = response.data.items;
      });
    },

    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseInfo.cover = res.data.url;
    },

    // 上传封面
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addCourseInfo() {
      // 添加课程
      course.addCourseInfo(this.courseInfo)
        .then(response => {
          // 提示信息
          this.$message({
            type: "success",
            message: "添加课程信息成功!!"
          });
          // 跳转页面
          this.$router.push({path: "/course/chapter/" + response.data.courseId});
        })
    },
    updateCourseInfo() {
      // 修改课程
      course.updateCourseInfo(this.courseInfo).then(response => {
        // 提示信息
        this.$message({
          type: "success",
          message: "修改课程信息成功!!!"
        });
        // 跳转页面
        this.$router.push({path: "/course/chapter/" +  this.courseId});
      })
    },
    savaOrUpdateCourseInfo() {
      if (!this.courseInfo.id) {
        this.addCourseInfo()
      } else {
        this.updateCourseInfo()
      }
    }
  }
};
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
