<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="tree2"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from "@/api/edu/subject.js";

export default {
  data() {
    return {
      filterText: "",
      subjectList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.getAllSubject();
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },

  methods: {
    getAllSubject() {
      subject
        .getAllSubject()
        .then((response) => {
          this.subjectList=response.data.SubjectList
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>

<style>
</style>