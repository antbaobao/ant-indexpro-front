<template>
    <div class="price-index-detail" v-if="!isLoading">
        <div class="top">
            <div class="price-index-detail_title">{{itemDetail.index_name.toUpperCase()}} Index</div>
            <div class="price-index-detail__info">
                <div class="item">
                    <div class="value">
                        ${{formatNumberRgx(countPrice(itemDetail.price,false))}}
                    </div>
                    <div class="name">{{$t("comprehensive_index.last_price")}}</div>
                </div>
                <div class="item">
                    <div class="value">
                        ${{formatNumberRgx(countPrice(itemDetail.highest,false))}}
                    </div>
                    <div class="name">{{$t("comprehensive_index.highest")}}</div>
                </div>
                <div class="item">
                    <div class="value">
                        ${{formatNumberRgx(countPrice(itemDetail.lowest,false))}}
                    </div>
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
        >
            <PriceIndexExchangePrice/>
        </Kline>

    </div>
</template>

<script>
import Kline from '@/components/Kline'
import PriceIndexExchangePrice from './PriceIndexExchangePrice'
import { countChange, countPrice } from '@/libs/count'
import { formatNumberRgx } from '@/libs/formatNumberRgx'
export default {
  components: {
    Kline,
    PriceIndexExchangePrice
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
    .price-index-detail {
        padding-bottom: 20px;
    }
    .price-index-detail .top {
        display:flex;
        width:1200px;
        margin:0 auto;
        justify-content: space-between;
        margin-top:20px;
    }
    .price-index-detail .top .price-index-detail__info {
        width:400px;
        display: flex;
        justify-content: space-between;
        font-size:14px;
    }
    .price-index-detail .top .price-index-detail__info .item {
        line-height: 30px;
    }
    .price-index-detail .top .price-index-detail__info .item .name {
        color:#000;
    }
    .price-index-detail .top .price-index-detail_title {
        text-align:left;
        font-size:24px;
        width:300px;
        margin-top:20px;
        font-weight:bolder;
        align-items: baseline;
    }
    @media screen and (max-width: 1200px) {
        .price-index-detail .top{
            width: 100%;
            flex-wrap: wrap;
            padding: 0 10px;
        }
        .price-index-detail__info{
            width: 100%;
        }
    }
    @media screen and (max-width: 960px) {
        .price-index-detail .top .price-index-detail_title{
            width:100%;
            text-align: center;
            margin-top: 0;
            margin-bottom: 30px;
        }
        .price-index-detail .top .price-index-detail__info{
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap;

        }
    }
</style>
