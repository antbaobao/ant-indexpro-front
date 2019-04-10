
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
            <div class="kline-ci-container__chart" v-if="!getCircleDataLoading">
                <v-chart :options="polar"/>
            </div>
            <slot></slot>
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
import { mapActions } from 'vuex'
import handleRes from '@/libs/handle-res'
import moment from 'moment'
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
  data () {
    return {
      loading: false,
      getCircleDataLoading: false,
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
            data: []
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
            data: [],
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
  },

  components: {
    'v-chart': ECharts,
    ShowChange
  },
  methods: {
    ...mapActions([
      'getCircleData'
    ]),
    goToDetail () {
      if (!this.isDetail) {
        this.$emit('go-detail')
      }
    },
    load () {
      const loading = this.$loading({
        lock: false,
        text: '',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      this.loading = loading
    },
    formatNumberRgx (num) {
      return formatNumberRgx(num)
    },
    async _getCircleData () {
      try {
        this.load()
        this.getCircleDataLoading = true
        const res = await this.getCircleData({ indexName: this.title, circle: 'day' })
        handleRes(this.$message, res, () => {
          this.polar.xAxis[0].data = res.data.map(function (item) {
            return moment(item.timestamp).format('MMMM Do YYYY, h')
          })
          this.polar.series[0].data = res.data.map(function (item) {
            return item.price.toFixed(2)
          })
        })
        this.getCircleDataLoading = false
        this.loading.close()
      } catch (e) {
        console.log(e)
        this.loading.close()
        this.getCircleDataLoading = false
        return this.$message.error('Something wrong')
      }
    }
  },
  mounted () {
    this._getCircleData()
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
        min-height: 420px;
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
