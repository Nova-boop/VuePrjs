<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">课程分类模板</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a
            :href="
              OSS_PATH +
              '/2020/11/23/f8389138e8f04f3ba76b7e1fdb8601c3课程分类.xlsx'
            "
          >点击下载模版</a
          >
        </el-tag>
      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :action="BASE_API + '/eduService/eduSubject/addSubject'"
          :auto-upload="false"
          :disabled="importBtnDisabled"
          :limit="1"
          :on-error="fileUploadError"
          :on-success="fileUploadSuccess"
          accept="application/vnd.ms-excel"
          name="file"
        >
          <el-button slot="trigger" size="small" type="primary"
          >选取文件
          </el-button
          >
          <el-button
            :loading="loading"
            size="small"
            style="margin-left: 10px"
            type="success"
            @click="submitUpload"
          >{{ fileUploadBtnText }}
          </el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API, // 接口API地址
      OSS_PATH: "https://edu-nova.oss-cn-chengdu.aliyuncs.com", // 阿里云OSS地址
      fileUploadBtnText: "上传到服务器", // 按钮文字
      importBtnDisabled: false, // 按钮是否禁用,
      loading: false,
    };
  },
  created() {
  },
  methods: {
    submitUpload() {
      this.fileUploadBtnText = "正在上传";
      this.importBtnDisabled = true;
      this.loading = true;
      this.$refs.upload.submit();
    },

    fileUploadSuccess(response) {
      this.loading = false;
      this.$message({
        type: "success",
        message: response.message,
      });

      // 路由跳转
      this.$router.push({path: "/subject/list"});
    },

    fileUploadError(response) {
      this.loading = false;
      this.$message({
        type: "error",
        message: "导入失败",
      });
    },
  },
};
</script>

<style>
</style>
