<template>
    <div class="comprehensive_index">
        <div class="comprehensive_index_title">{{$t("comprehensive_index.comprehensive_index")}}</div>
        <div v-if="!isLoading">
            <Kline
                v-for="item in comprehensiveIndexData"
                :key="item.id"
                :title="item.index_name"
                :change="Number(countPrice(countChange(item.price,item.before_price).changeValue.toString(),item.pairs))"
                :price="Number(countPrice(item.price,false))"
                :percentage="Number(countPrice(countChange(item.price,item.before_price).changePercentage.toFixed(2)))"
                @go-detail="goDetail(item.id,item.index_name)"
            />
        </div>
    </div>
</template>

<script>
import Kline from '@/components/Kline'
import { countChange, countPrice } from '@/libs/count'
export default {
  name: 'comprehensive_index',
  components: {
    Kline
  },
  data: function () {
    return {
      loading: ''
    }
  },
  computed: {
    comprehensiveIndexData () {
      return this.$store.state.proindex.proindex.filter(function (item) {
        return !item.pairs
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
  },
  methods: {
    countChange (price, beforePrice) {
      return countChange(price, beforePrice)
    },
    countPrice (price, isPriceIndex) {
      return countPrice(price, isPriceIndex)
    },
    goDetail (id, name) {
      this.$router.push({ path: `/comprehensive/detail/${id}` })
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
  }
}
</script>
<style>
    .comprehensive_index:hover{
        cursor: pointer;
    }
    .comprehensive_index_title {
        text-align:left;
        font-size:24px;
        width:1200px;
        margin:0 auto;
        margin-top:40px;
        font-weight:bolder;
    }
    @media screen and (max-width: 760px) {
        .comprehensive_index_title{
            width: 100%;
            display: none;
        }
    }
    @media screen and (max-width: 1200px) {
        .comprehensive_index_title{
            width: 100%;
            padding-left: 10px;
        }
    }
</style>
