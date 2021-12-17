<template>
  <div class="es6">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        label="ECMAScript 6简介"
        name="/ECMAScript-introduction-to-6"
      >
      </el-tab-pane>
      <el-tab-pane label="let和const命令" name="/let-const"> </el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeName: "/ECMAScript-introduction-to-6"
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
      this.$router.push(tab.name);
    }
  }
};
</script>

<style lang="scss"></style>
