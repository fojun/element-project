<template>
  <div>
    <el-button @click="expandLevel(1)">展开一级</el-button>
    <el-button @click="expandLevel(2)">展开二级</el-button>
    <el-button @click="expandLevel(3)">展开三级</el-button>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      default-expand-all="false"
      :expand-on-click-node="false"
      style="margin-top: 20px; text-align: left; display: inline-block;"
    />
  </div>
</template>

<script>
export default {
  name: 'ExpandLevelTreeDemo',
  data() {
    return {
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                { id: 9, label: '三级 1-1-1' },
                { id: 10, label: '三级 1-1-2' }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            { id: 5, label: '二级 2-1' },
            { id: 6, label: '二级 2-2' }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            { id: 7, label: '二级 3-1' },
            { id: 8, label: '二级 3-2' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    expandLevel(level) {
      // 先全部收起
      this.$refs.tree.store._getAllNodes().forEach(node => {
        node.expanded = false
      })
      // 展开到指定层级
      const expandTo = (nodes, currentLevel) => {
        if (!nodes) return
        nodes.forEach(node => {
          if (currentLevel < level) {
            this.$refs.tree.store.getNode(node.id).expanded = true
            expandTo(node.children, currentLevel + 1)
          }
        })
      }
      expandTo(this.treeData, 1)
    }
  }
}
</script>