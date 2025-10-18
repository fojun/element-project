<template>
  <div>
    <div ref="pieChart" style="width: 400px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PieDoughnutDemo',
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      const chart = echarts.init(this.$refs.pieChart)
      const option = {
        title: {
          text: '环形图示例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'], // 内外半径，形成环形
            avoidLabelOverlap: false,
            // label: {
            //   show: false,
            //   position: 'center'
            // },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            // labelLine: {
            //   show: false
            // },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    }
  }
}
</script>