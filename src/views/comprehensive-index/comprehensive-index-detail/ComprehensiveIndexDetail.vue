
<template>
<div class="comprehensive_index_detail" v-if="!isLoading">
    <div class="top">
        <div class="comprehensive_index_detail_title">{{itemDetail.index_name}} Index</div>
        <div class="info">
            <div class="item">
                <div class="value">{{formatNumberRgx(countPrice(itemDetail.price,false))}}</div>
                <div class="name">{{$t("comprehensive_index.last_price")}}</div>
            </div>
            <div class="item">
                <div class="value">{{formatNumberRgx(countPrice(itemDetail.highest,false))}}</div>
                <div class="name">{{$t("comprehensive_index.highest")}}</div>
            </div>
            <div class="item">
                <div class="value">{{formatNumberRgx(countPrice(itemDetail.lowest,false))}}</div>
                <div class="name">{{$t("comprehensive_index.lowest")}}</div>
            </div>
        </div>
    </div>
    <Kline
        :title="itemDetail.index_name"
        :change="Number(countPrice(countChange(itemDetail.price,itemDetail.before_price).changeValue.toString(),itemDetail.pairs))"
        :price="Number(countPrice(itemDetail.price,false))"
        :percentage="Number(countPrice(countChange(itemDetail.price,itemDetail.before_price).changePercentage.toFixed(2)))"
        :is-detail="true"
    />
    <div class="comprehensive_index_detail__info">
        <Info/>
    </div>
</div>
</template>
<script>
import Kline from '@/components/Kline'
import { countChange, countPrice } from '@/libs/count'
import { formatNumberRgx } from '@/libs/formatNumberRgx'
import Info from './Info'
export default {
  components: {
    Kline,
    Info
    // Skeleton
  },
  data: function () {
    return {
      loading: ''
    }
  },
  methods: {
    countChange (price, beforePrice) {
      return countChange(price, beforePrice)
    },
    countPrice (price, isPriceIndex) {
      return countPrice(price, isPriceIndex)
    },
    formatNumberRgx (num) {
      return formatNumberRgx(num)
    },
    load () {
      const loading = this.$loading({
        lock: false,
        text: '',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      this.loading = loading
    }
  },
  computed: {
    itemDetail () {
      return this.$store.state.proindex.proindex.find((item) => {
        return item.id === this.$route.params.id
      })
    },
    isLoading () {
      const loading = this.$store.state.proindex.getProindexLoading
      if (loading) {
        this.load()
      } else if (this.loading) {
        this.loading.close()
      }
      return this.$store.state.proindex.getProindexLoading
    }
  }
}
</script>
<style>
    .comprehensive_index_detail {
        padding-bottom: 20px;
    }
    .comprehensive_index_detail .top {
        display:flex;
        width:1200px;
        margin:0 auto;
        justify-content: space-between;
        margin-top:20px;
    }
    .comprehensive_index_detail .top .info {
        width:400px;
        display: flex;
        justify-content: space-between;
        font-size:14px;
    }
    .comprehensive_index_detail .top .info .item {
        line-height: 30px;
    }
    .comprehensive_index_detail .top .info .item .name {
        color:#000;
    }
    .cid {
        width: 1200px;
        background: #fff;
        height: 400px;
        padding-bottom: 20px;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    }
    .cid .title {
        font-size: 24px;
        text-align: center;
        width: 100%;
        font-weight: bolder;
        padding-top: 50px;
    }
    .comprehensive_index_detail .top .comprehensive_index_detail_title {
        text-align:left;
        font-size:24px;
        width:300px;
        margin-top:20px;
        font-weight:bolder;
        align-items: baseline;
    }
    .comprehensive_index_detail__info{
        width: 1200px;
        background: #fff;
        padding-bottom: 20px;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 20px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    }
    @media screen and (max-width: 960px) {
        .comprehensive_index_detail .top .comprehensive_index_detail_title{
           text-align: center;
            width: 100%;
            margin-top:0px;
            margin-bottom: 30px;
        }
        .comprehensive_index_detail .top{
            width: 100%;
            justify-content: center;
        }
        .comprehensive_index_detail .top .info{
            flex-wrap: wrap;
            width: 100%;
            justify-content: space-around;
        }
    }

    @media screen and (max-width: 1200px) {
        .comprehensive_index_detail .top{
            width: 100%;
            flex-wrap: wrap;
            padding: 0 10px;
        }
        .comprehensive_index_detail__info{
            width: 100%;
        }
    }
</style>
