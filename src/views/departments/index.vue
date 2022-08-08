<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <treeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入插槽 会循环多次 -->
          <!-- slot-scope=“obj” 接收传给插槽的数据 -->
          <treeTools slot-scope="{data}" :tree-node="data" @editDepts="editDepts" @addDepts="addDepts" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
      <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
    </div>
  </div>
</template>

<script>
import treeTools from '@/views/departments/components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import addDept from '@/views/departments/components/add-dept'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      company: {},
      departs: [
        { name: '总裁办', manager: 'A', children: [{ name: '董事会', manager: 'D' }] },
        { name: '行政部', manager: 'B' },
        { name: '人事部', manager: 'C' }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments() // 调用自身方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
      // console.log(node)
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
