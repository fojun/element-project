<template>
  <div>
    <div ref="gantt" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'GanttDemo',
  mounted() {
    this.drawGantt()
  },
  methods: {
    drawGantt() {
      const chart = echarts.init(this.$refs.gantt)
      const option = {
        tooltip: {
          formatter: function(params) {
            return params.name + ': ' + params.value[1] + ' ~ ' + params.value[2]
          }
        },
        title: {
          text: '甘特图示例'
        },
        grid: {
          left: 120,
          right: 40,
          top: 60,
          bottom: 40
        },
        xAxis: {
          type: 'time',
          min: '2025-10-01',
          max: '2025-10-31'
        },
        yAxis: {
          type: 'category',
          data: ['任务A', '任务B', '任务C']
        },
        series: [
          {
            type: 'custom',
            renderItem: function(params, api) {
              var categoryIndex = api.value(0)
              var start = api.coord([api.value(1), categoryIndex])
              var end = api.coord([api.value(2), categoryIndex])
              var height = api.size([0, 1])[1] * 0.6
              return {
                type: 'rect',
                shape: {
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                },
                style: api.style()
              }
            },
            itemStyle: {
              color: '#409EFF'
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: [
              // [y轴序号, 开始时间, 结束时间]
              [0, '2025-10-02', '2025-10-10'],
              [1, '2025-10-05', '2025-10-20'],
              [2, '2025-10-15', '2025-10-28']
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