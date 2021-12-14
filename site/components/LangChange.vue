<!-- i18n -->
<template>
  <el-select v-model="selectValue" @change="langChange" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      selectValue: "",
      options: [
        {
          value: "cn",
          label: "中文"
        },
        {
          value: "en",
          label: "English"
        }
      ]
    };
  },
  created() {
    let that = this;
    console.log(localStorage.lang);
    that.selectValue =
      localStorage.lang == undefined ? "cn" : localStorage.lang;
  },
  methods: {
    //语言切换
    langChange(e) {
      localStorage.setItem("lang", e);
      this.$i18n.locale = e;
    }
  }
};
</script>

<style lang="scss" scoped></style>
