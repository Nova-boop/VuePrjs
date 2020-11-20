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

export default {
  data() {
    return {
      teacher: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      // 从路径中获取ID值
      const id = this.$route.params.id;
      this.getTeacherInfo(id);
    }
  },

  methods: {
    getTeacherInfo(id) {
      teacherApi.getTeacherInfo(id).then((response) => {
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
      teacherApi.addTeacher(this.teacher).then((response) => {
        // 提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        // 切换到讲师列表路由
        this.$router.push({ path: "/teacher/teacherList" });
      });
    },
    // 修改
    updateTeacher(teacher) {
      teacherApi.updateTeacher(this.teacher).then((response) => {
        // 提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        // 切换到讲师列表路由
        this.$router.push({ path: "/teacher/teacherList" });
      });
    },
  },
};
</script>

<style>
</style>