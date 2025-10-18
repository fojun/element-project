<template>
  <div>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
    />
  </div>
</template>

<script>
// import { Radio } from 'element-ui';

export default {
  name: 'SingleSelectTree',
  // components: { ElRadio: Radio },
  data() {
    return {
      selectedNodeId: null,
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
    };
  },
  methods: {
    renderContent(h, { node, data }) {
    const isLeaf = !data.children || data.children.length === 0;
    return h('span', [
      isLeaf
        ? h('el-radio', {
            props: {
              value: this.selectedNodeId,
              label: data.id
            },
            on: {
              input: val => {
                this.selectedNodeId = val;
              }
            }
          })
        : null,
      h('span', { style: { marginLeft: '8px' } }, [data.label])
    ]);
  }
  }
};
</script>