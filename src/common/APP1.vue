<template>
  <div id="app">
    <!-- <single-select-tree /> -->
    <!-- <gantt-demo /> -->
    <!-- <dhtmlx-gantt-demo /> -->
    <!-- <PieDoughnutDemo /> -->
     <el-button @click="stepClick()">默认按钮1</el-button>
     <el-steps id='steps' class="col-4" :active='active' space='20%'>
        <el-step id='step1' title="开始" @click.native="handle1('030')"></el-step>
        <el-step id='step2' title="执行" @click.native="handle2('060')"></el-step>
        <el-step id='step3' title="核验" @click.native="handle3('090')"></el-step>
        <el-step id='step4' title="结束" @click.native="handle4('120')"></el-step>
      </el-steps>

    <el-button @click="handleClick(1)">默认按钮1</el-button>
    <el-button @click="handleClick(2)">默认按钮2</el-button>
    <el-button @click="handleClick(3)">默认按钮3</el-button>
    <el-button @click="handleClick(4)">默认按钮4</el-button>
    <!-- :key="numFlag" -->
    <el-table
      :key="numFlag"
      ref="myTable"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column v-if="numFlag === 4" prop="address4">
        <template slot="header" slot-scope="scope">
          <span style="color: red">地址4</span>
        </template>
      </el-table-column>
      <el-table-column v-if="numFlag === 3" prop="address3">
        <template slot="header" slot-scope="scope">
          <span style="color: blue">地址3</span>
        </template>
      </el-table-column>
      <el-table-column v-if="numFlag === 2" prop="address2">
        <template slot="header" slot-scope="scope">
          <span style="color: green">地址2</span>
        </template>
      </el-table-column>
      <el-table-column v-if="numFlag === 1" prop="address1">
        <template slot="header" slot-scope="scope">
          <span style="color: orange">地址1</span>
        </template>
      </el-table-column>
      <el-table-column v-if="numFlag !== 4" prop="address" label="123">
        <template slot="header" slot-scope="scope">
          <span style="color: purple">地址123</span>
        </template>
      </el-table-column>
    </el-table>
    <expand-level-tree-demo />
  </div>
</template>

<script>
// import SingleSelectTree from './components/SingleSelectTree.vue';
// import GanttDemo from './components/GanttDemo.vue';
// import DhtmlxGanttDemo from './components/DhtmlxGanttDemo.vue'
// import PieDoughnutDemo from './components/PieDoughnutDemo.vue'
// import EditableCell from "./components/PieDoughnutDemo.vue";
// import ExpandLevelTreeDemo from "./components/ExpandLevelTreeDemo.vue";
// import { getDemoData } from "@/api/demo";

export default {
  name: "TlwTableByDxcUmd",
  components: {
    //  SingleSelectTree,
    //  DhtmlxGanttDemo
    //  GanttDemo,
    //  PieDoughnutDemo,
    ExpandLevelTreeDemo,
  },
  data() {
    return {
      
      active: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      numFlag: 1,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    getDemoData().then((res) => {
      console.log("Demo接口返回：", res);
    });
  },
  methods: {
    stepClick() {
      this.active++ >= 4 ? (this.active = 0) : this.active;
    },
    handle1(flag) {
        console.log(flag)
    },
    handle2(flag) {
        console.log(flag)
    },
    handle3(flag) {
        console.log(flag)
    },

    handle4(flag) {
        console.log(flag)
    },

    handleClick(val) {
      console.log("点击了按钮", val);
      this.numFlag = val;
      this.$nextTick(() => {
        // 通过ref获取el-table并刷新布局
        this.$refs.myTable && this.$refs.myTable.doLayout();
      });
    },
    handleCheckChange(data, checked, tree) {
      if (checked) {
        this.currentNodeData.id = data.id;
        this.$refs.treeList.setCheckedNodes([data.id]);
      }
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* 虚线样式（如只想未激活为虚线） */
.el-steps--horizontal .el-step:not(.is-process):not(.is-finish) .el-step__line {
  border-top: 2px dashed #f56c6c;
  background: none;
  height: 0;
}

/* 激活（高亮）连线样式 */
.el-steps--horizontal .el-step.is-process .el-step__line,
.el-steps--horizontal .el-step.is-finish .el-step__line {
  background-color: #b9ff40;
  border-top: 2px dashed #b9ff40;
  height: 4px;
}

/* .el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner{display: inline-block;}
.el-tree .el-tree-node .el-checkbox .el-checkbox__inner{display: none;} */
</style>
