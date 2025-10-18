<template>
  <div id="app" class="sort-container">
    <span class="title">项目排序</span>
    <el-table
      row-key="id"
      :data="projects"
      ref="sortableTable"
      border
    >
      <el-table-column label="序号" width="200">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  data() {
    return {
      projects: [
        { id: '1', name: '男子10米气步枪' },
        { id: '2', name: '女子50米步枪三姿' },
        { id: '3', name: '男子双向飞碟' },
        { id: '4', name: '女子25米手枪' },
        { id: '5', name: '男子50米步枪卧射' },
      ]
    }
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    initSortable() {
      // 获取 el-table 的 tbody 元素
      this.$nextTick(() => {
        const el = this.$refs.sortableTable.$el.querySelector('.el-table__body-wrapper tbody')
        this.sortable = Sortable.create(el, {
          animation: 150,
          handle: '', // 可指定拖拽手柄
          onEnd: evt => {
            const oldIndex = evt.oldIndex
            const newIndex = evt.newIndex
            if (oldIndex === newIndex) return
            const moved = this.projects.splice(oldIndex, 1)[0]
            this.projects.splice(newIndex, 0, moved)
            this.projects = [...this.projects]
            this.$nextTick(() => {
              this.$refs.sortableTable.doLayout && this.$refs.sortableTable.doLayout()
            })
          }
        })
      })
    }
  },
  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy()
      this.sortable = null
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-container {
  padding: 15px;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .el-table {
    margin-top: 20px;
  }
}
</style>