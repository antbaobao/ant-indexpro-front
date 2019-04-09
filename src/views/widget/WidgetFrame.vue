<template>
    <div class="body">
        <div class="widget-frame" :style="{width:width,background: theme}">
            <i v-if="loading" class="el-icon-loading"></i>
            <div v-if="!loading" class="widget__frame__info">
                    <div class="widget__frame__info-container">
                        <div class="widget-frame__title" :style="{color: theme === 'black' && 'white'}">
                            {{index}}
                        </div>
                        <div class="widget-frame__value" :style="{color: theme === 'black' && 'white'}">${{formatNumberRgx(countPrice(indexData.price,false))}}</div>
                        <div class="widget-frame__change">
                            <ShowChange
                                :value="formatNumberRgx(countPrice(countChange(indexData.price,indexData.before_price).changeValue.toString(),indexData.pairs))"
                                :isRed="countChange(indexData.price,indexData.before_price).changeValue < 0 "
                            />
                            <ShowChange
                                :value="formatNumberRgx(Number(countChange(indexData.price,indexData.before_price).changePercentage.toFixed(3)))+'%'"
                                :isRed="countChange(indexData.price,indexData.before_price).changeValue < 0 "
                            />
                        </div>
                    </div>
                    <div class="widget__frame__right-info">
                        <span class="widget__frame__widget-24h">24h</span>
                        <peity :type="'line'"
                               :options="{ width: 90, height:40, stroke: '#4d89f9' }"
                               :data="[1000,34,200,44,566,99,1000].toString()"></peity>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import peity from 'vue-peity'
import ShowChange from '@/components/ShowChange'
import { countChange, countPrice } from '@/libs/count'
import { formatNumberRgx } from '@/libs/formatNumberRgx'
export default {
  components: {
    peity,
    ShowChange
  },
  data () {
    return {
      index: '',
      currency: '',
      price: 0,
      width: '298px',
      theme: 'white'
    }
  },
  methods: {
    parseQuery (url) {
      var queryObj = {}
      var reg = /[?&]([^=&#]+)=([^&#]*)/g
      var querys = url.match(reg)
      if (querys) {
        for (var i in querys) {
          var query = querys[i].split('=')
          var key = query[0].substr(1)
          var value = query[1]
          queryObj[key] ? queryObj[key] = [].concat(queryObj[key], value) : queryObj[key] = value
        }
      }
      return queryObj
    },
    countChange (price, beforePrice) {
      return countChange(price, beforePrice)
    },
    countPrice (price, isPriceIndex) {
      return countPrice(price, isPriceIndex)
    },
    formatNumberRgx (num) {
      return formatNumberRgx(num)
    },
    countStyle (width, theme, index) {
      this.width = width + 'px'
      this.theme = theme
      this.index = index
    }
  },
  computed: {
    indexData () {
      if (!this.$store.state.proindex.proindex.length) {
        return []
      }
      const params = window.parent.document.getElementsByTagName('iframe')[0]
        ? this.parseQuery(window.parent.document.getElementsByTagName('iframe')[0].src)
        : this.parseQuery(window.location.href)
      const width = window.parent.document.getElementsByTagName('iframe')[0] ? window.parent.document.getElementsByTagName('iframe')[0].width : 298
      this.countStyle(width, params.theme, params.index)
      const indexData = this.$store.state.proindex.proindex.find((item) => {
        return item.index_name === params.index
      })
      return indexData
    },
    loading () {
      return this.$store.state.proindex.getProindexLoading
    }
  }
}

</script>

<style>
    .body{
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: white;
        z-index: 999;
    }
    .widget-frame{
        height: 160px;
        border-radius: 5px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .widget__frame__info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 0 20px;
    }
    .widget-frame__title{
        font-size: 14px;
        text-align: left;
        font-weight: 500;
        color: #233143;
    }
    .widget__frame__info-container{
        display: flex;
        flex-direction: column;
        padding: 10px;
        box-sizing: border-box;
    }
    .widget-frame__value{
        font-size: 28px;
        font-weight: 400;
        vertical-align: top;
    }
    .widget-frame__change{
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: #eee;
        padding: 5px;
        border-radius: 5px;
    }
    .widget__frame__widget-24h{
        align-self: flex-end;
        background-color: #dbe1e8;
        border-radius: 2px;
        color: #fff;
        font-size: 11px;
        padding: 1px 4px;
        margin-bottom: 30px;
    }
    .widget__frame__right-info{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-top: 20px;
    }
</style>
