<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  name: 'vx-echarts',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '98%'
    },
    height: {
      type: String,
      default: '550px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // chartData: {
    //   type: Object,
    //   required: true
    // },
    XData: {
      type: Array,
      required: true
    },
    YData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      options:{
        xAxis: {
          name: '时间',
          data: this.XData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          min: function(value) {
            return value.min - 5;
          },
          max: function(value) {
            return value.max + 5;
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [
          {
            name: '值',
            itemStyle: {
              normal: {
                color: 'rgb(136, 249, 162)',
                lineStyle: {
                  color: 'rgb(136, 249, 162)',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: this.YData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
        ]
      }
    }
  },
  watch: {
    YData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })

    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        'transitionend',
        this.sidebarResizeHandler
      )
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions() {
      this.options.xAxis.data=this.XData;
      this.options.series[0].data=this.YData;
      this.chart.setOption(this.options);
//      console.log('XData---->'+this.options.xAxis.data);
//      console.log('YData---->'+this.options.series[0].data);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      setTimeout(() => {
        this.setOptions()
      }, 1000)
    }
  }
}
</script>
