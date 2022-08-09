<template>
  <el-card>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="6">
        <!-- 前插槽 -->
        <!-- 具名插槽 -->
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <!-- 后插槽 -->
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// 左侧内容按需显示，通过自定义属性
export default {
  props: {
    showBefore: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
  }
  i {
    margin-right: 5px;
    color: #409eff;
  }
  display: inline-block;
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid rgba(145, 213, 255, 1);
  background: rgba(230, 247, 255, 1);
}
</style>
