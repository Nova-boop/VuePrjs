<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>

        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/eduOss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from "@/api/edu/teacher.js";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  // 声明组件
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "https://edu-nova.oss-cn-chengdu.aliyuncs.com/2020/11/22/aace77414ada4d208cf459870d4be94cfile.png"
      },

      // 上传弹框组件是否显示

      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      saveBtnDisabled: false // 保存按钮是否禁用,
    };
  },

  watch: {
    $route(to, from) {
      // 监听
      this.init();
    }
  },

  created() {
    this.init();
  },

  methods: {
    close() {
      // 关闭上传弹框的方法
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 10000; // 初始化组件id
    },
    cropSuccess(data) {
      this.imagecropperShow = false;
      // 上传成功的方法
      this.teacher.avatar = data.url;
      this.imagecropperKey = this.imagecropperKey + 10000; // 初始化组件id
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 从路径中获取ID值
        const id = this.$route.params.id;
        this.getTeacherInfo(id);
      } else {
        this.teacher = {};
      }
    },
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id).then(response => {
        this.teacher = response.data.teacher;
      });
    },
    saveOrUpdate() {
      // this.saveBtnDisabled = true;
      // 判断修改(updateTeacher)还是保存(saveTeacher),分别调用对应的方法

      if (!this.teacher.id) {
        // 对象被没有id,调用 saveTeacher
        this.saveTeacher();
      } else {
        this.updateTeacher();
      }
    },

    // 保存
    saveTeacher() {
      teacherApi.addTeacher(this.teacher).then(response => {
        // 提示成功
        this.$message({
          type: "success",
          message: "添加成功!"
        });

        // 切换到讲师列表路由
        this.$router.push({ path: "/teacher/teacherList" });
      });
    },
    // 修改
    updateTeacher(teacher) {
      teacherApi.updateTeacher(this.teacher).then(response => {
        // 提示成功
        this.$message({
          type: "success",
          message: "修改成功!"
        });
        // 切换到讲师列表路由
        this.$router.push({ path: "/teacher/teacherList" });
      });
    }
  }
};
</script>

<style></style>
