<template>
  <div style="width:100%;height:500px;">
    <div ref="gantt" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import gantt from 'dhtmlx-gantt'

export default {
  name: 'DhtmlxGanttDemo',
  mounted() {
    gantt.init(this.$refs.gantt)
    gantt.parse({
      data: [
        {id: 1, text: "任务A", start_date: "2025-10-01", duration: 5, progress: 0.6},
        {id: 2, text: "任务B", start_date: "2025-10-03", duration: 7, progress: 0.4}
      ]
    })
  },
  beforeDestroy() {
    gantt.clearAll()
  }
}
</script>