<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryTeacher.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="queryTeacher.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="queryTeacher.begin"
          default-time="00:00:00"
          placeholder="选择开始时间"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="queryTeacher.end"
          default-time="00:00:00"
          placeholder="选择截止时间"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-button icon="el-icon-search" type="primary" @click="getTeacherList()"
      >查询
      </el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="teacherList"
      border
      element-loading-text="数据加载中"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="70">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="name" width="180"></el-table-column>

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column label="资历" prop="intro"/>
      <el-table-column label="添加时间" prop="gmtCreate" width="160"/>
      <el-table-column label="排序" prop="sort" width="60"/>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/teacher/editTeacher/' + scope.row.id"
          >
            <el-button icon="el-icon-edit" size="mini" type="primary"
            >修改
            </el-button
            >
          </router-link
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="danger"
            @click="delTeacher(scope.row.id)"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      layout="total, prev, pager, next, jumper"
      style="padding: 30px 0; text-align: center"
      @current-change="getTeacherList"
    />
  </div>
</template>


<script>
import teacher from "@/api/edu/teacher";

export default {
  data() {
    // 定义变量及初始值
    return {
      total: 0, //总记录数
      page: 1, // 当前页
      limit: 10, // 每页显示的记录数
      queryTeacher: {}, // 条件封装的对象
      teacherList: null, // 查询之后返回的集合
    };
  },

  created() {
    // 页面渲染之前执行,一般调用methods 中定义的方法
    this.getTeacherList();
  },
  methods: {
    // 定义具体方法,调用teacher.js 中的方法
    getTeacherList(page = 1) {
      this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.queryTeacher)
        .then((response) => {
          //   console.log(response);
          this.teacherList = response.data.items;
          this.total = response.data.total;
          //   console.log(this.teacherList);
          //   console.log(this.total);
        })
        .catch((error) => {
          //   console.log(error);
        });
    },
    delTeacher(id) {
      this.$confirm("此操作将永久删除该讲师信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        teacher.delTeacher(id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getTeacherList();
        });
      });
    },
    resetData() {
      // 清空条件查询
      this.queryTeacher = {};
      this.getTeacherList();
    },
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
