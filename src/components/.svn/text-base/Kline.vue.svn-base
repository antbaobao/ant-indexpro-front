
<template>
    <div class="kline-ci-container" @click="goToDetail">
        <div class="kline-ci-container__ci">
            <div>
                <div class="kline-ci-container__title">
                    {{title.toUpperCase()}} Index {{formatNumberRgx(price)}}
                </div>
                <div class="kline-ci-container__change">
                    <span class="kline-ci-container__black">{{$t("home.change")}}(24h): </span>
                    <ShowChange
                        :value="formatNumberRgx(change)"
                        :isRed="change<0"
                    />
                    <ShowChange
                        :value="formatNumberRgx(percentage) + '%'"
                        :isRed="percentage<0"
                    />
                </div>
            </div>
            <div class="kline-ci-container__chart">
                <v-chart :options="polar"/>
            </div>
        </div>
    </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import echarts from 'echarts/lib/echarts'
import { formatNumberRgx } from '@/libs/formatNumberRgx'
import ShowChange from '@/components/ShowChange'

export default {
  name: 'comprehensive_index',
  props: {
    title: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    change: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'v-chart': ECharts,
    ShowChange
  },
  methods: {
    goToDetail () {
      if (!this.isDetail) {
        this.$emit('go-detail')
      }
    },
    formatNumberRgx (num) {
      return formatNumberRgx(num)
    }
  },
  data () {
    let data = [
      ['2000-06-05', 116],
      ['2000-06-06', 129],
      ['2000-06-07', 135],
      ['2000-06-08', 86],
      ['2000-06-09', 73],
      ['2000-06-10', 85],
      ['2000-06-11', 73],
      ['2000-06-12', 68],
      ['2000-06-13', 92],
      ['2000-06-14', 130],
      ['2000-06-15', 245],
      ['2000-06-16', 139],
      ['2000-06-17', 115],
      ['2000-06-18', 111],
      ['2000-06-19', 309],
      ['2000-06-20', 206],
      ['2000-06-21', 137],
      ['2000-06-22', 128],
      ['2000-06-23', 85],
      ['2000-06-24', 94],
      ['2000-06-25', 71],
      ['2000-06-26', 106],
      ['2000-06-27', 84],
      ['2000-06-28', 93],
      ['2000-06-29', 85],
      ['2000-06-30', 73],
      ['2000-07-01', 83],
      ['2000-07-02', 125],
      ['2000-07-03', 107],
      ['2000-07-04', 82],
      ['2000-07-05', 44],
      ['2000-07-06', 72],
      ['2000-07-07', 106],
      ['2000-07-08', 107],
      ['2000-07-09', 66],
      ['2000-07-10', 91],
      ['2000-07-11', 92],
      ['2000-07-12', 113],
      ['2000-07-13', 107],
      ['2000-07-14', 131],
      ['2000-07-15', 111],
      ['2000-07-16', 64],
      ['2000-07-17', 69],
      ['2000-07-18', 88],
      ['2000-07-19', 77],
      ['2000-07-20', 83],
      ['2000-07-21', 111],
      ['2000-07-22', 57],
      ['2000-07-23', 55],
      ['2000-07-24', 60]
    ]
    let dateList = data.map(function (item) {
      return item[0]
    })
    let valueList = data.map(function (item) {
      return item[1]
    })
    return {
      polar: {
        // Make gradient line here
        visualMap: [
          {
            show: true,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          },
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: [
          {
            data: dateList
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon:
                'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            type: 'line',
            showSymbol: true,
            data: valueList,
            sampling: 'average',
            smooth: true,
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            }
          }
        ]
      }
    }
  }
}
</script>

<style>
    /**
         * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
         * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
         */
    .echarts {
        width: 100%;
        height: 100%;
    }
    .kline-ci-container {
        /*margin-bottom: 20px;*/
    }
    .kline-ci-container__ci {
        position: relative;
        width: 1200px;
        background: #fff;
        height: 420px;
        padding-bottom: 20px;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    }
    .kline-ci-container__title {
        font-size: 24px;
        text-align: center;
        width: 100%;
        font-weight: bolder;
        padding-top: 30px;
    }
    .kline-ci-container__chart {
        width: 1200px;
        height: 350px;
    }
    .kline-ci-container__change {
        position: absolute;
        padding: 5px;
        padding-left: 10px;
        background:#eee;
        font-size:14px;
        right: 0;
        margin-top:-50px;
        line-height:50px;
        border-radius: 10px 0 0 10px;
        color:rgba(0, 0, 0, 0.45);
    }
    @media screen and (max-width: 960px) {
        .kline-ci-container{

        }
        .kline-ci-container__change{
            position: static;
            margin-top: 0px;
            border-radius: 0;
        }
        .kline-ci-container__title{
            text-align: center;
            padding: 20px;
            /*display: none;*/
        }
        .kline-ci-container__ci{
            width: 100%;
            height: auto;
        }
    }
    @media screen and (max-width: 1200px) {
        .kline-ci-container__ci{
            width: 100%;
        }
        .kline-ci-container__chart {
            width: auto;
        }
    }
</style>
