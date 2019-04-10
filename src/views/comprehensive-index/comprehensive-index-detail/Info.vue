<template>
    <div class="comprehensive-index-detail-info">
        <div class="comprehensive-index-detail-info__left">
            <div class="comprehensive-index-detail-info_left__header">
                <span class="comprehensive-index-detail-info__title">{{$t('comprehensive_index.detail.info.right.title')}}</span>
                <a class="comprehensive-index-detail-info__left-download" href="#">{{$t('comprehensive_index.detail.info.right.download_the_index')}}</a>
            </div>
            <div class="comprehensive-index-detail-info__table">
                <el-table
                    border
                    :data="data.leftItems.data"
                >
                    <el-table-column
                        prop="index_name"
                        :label="$t('comprehensive_index.detail.info.right.index_name')"
                        fixed
                        min-width="80"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="public_date"
                        :label="$t('comprehensive_index.detail.info.right.public_date')"
                        align="center"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        min-width="130"
                        prop="nums"
                        :label="$t('comprehensive_index.detail.info.right.number_of_coins')"
                        align="center"
                    >
                    </el-table-column>
                </el-table>

            </div>
            <div class="comprehensive-index-detail-info__introduction">
                <!--<p class="comprehensive-index-detail-info__title">{{$t('comprehensive_index.detail.info.right.index_introduction')}}</p>-->
                <p class="comprehensive-index-detail-info__introduction-des" v-html="replaceString(data.leftItems.des)"></p>
            </div>
        </div>
        <div class="comprehensive-index-detail-info_right">
            <p class="comprehensive-index-detail-info_right__title">{{$t('comprehensive_index.detail.info.left.title')}}</p>
            <el-table
                border
                :data="data.rightItems"
                style="width: 100%"
            >
                <el-table-column
                    prop="index_name"
                    :label="$t('comprehensive_index.detail.info.left.index_name')"
                    fixed
                    min-width="120"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{scope.row.index_name.toUpperCase()}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="percentage"
                    :label="$t('comprehensive_index.detail.info.left.percentage')"
                    align="center"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        {{scope.row.percentage}} %
                    </template>
                </el-table-column>
                <el-table-column
                    prop="last_price"
                    :label="$t('comprehensive_index.detail.info.left.last_price')"
                    align="center"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        ${{formatNumberRgx(scope.row.last_price)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="change"
                    :label="$t('comprehensive_index.detail.info.left.change')"
                    align="center"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        <ShowChange
                            :value="formatNumberRgx(scope.row.change) + '%'"
                            :isRed="scope.row.change < 0"
                        />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { countChange, countPrice } from '@/libs/count'
import moment from 'moment'
import { formatNumberRgx } from '@/libs/formatNumberRgx'
import ShowChange from '@/components/ShowChange'
export default {
  components: {
    ShowChange
  },
  computed: {
    data () {
      const data = this.$store.state.proindex.proindex.find((item) => {
        return item.id === this.$route.params.id
      })
      const rightItems = data.composition.map((item) => {
        return {
          index_name: item.coin,
          percentage: item.percentage.toFixed(2),
          last_price: countPrice(item.price.toString(), true),
          change: this.findOutChange(item.coin)
        }
      })
      const leftItems = {
        des: data.des,
        data: [{
          index_name: data.index_name,
          public_date: moment(data.update_time).format('L'),
          nums: data.composition.length
        }]
      }
      return {
        rightItems,
        leftItems
      }
    }
  },
  methods: {
    replaceString (str) {
      return str.replace(/\\n/, '<br/>')
    },
    countChange (price, beforePrice) {
      return countChange(price, beforePrice)
    },
    countPrice (price, isPriceIndex) {
      return countPrice(price, isPriceIndex)
    },
    findOutChange (priceIndexName) {
      const currentPriceIndex = this.$store.state.proindex.proindex.find((item) => {
        return item.index_name === priceIndexName
      })
      return this.countChange(currentPriceIndex.price, currentPriceIndex.before_price).changePercentage.toFixed(2)
    },
    formatNumberRgx (num) {
      return formatNumberRgx(num)
    }
  }
}
</script>
<style>
    .comprehensive-index-detail-info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .comprehensive-index-detail-info__left {
        flex: 3;
        padding: 0px;
    }
    .comprehensive-index-detail-info_right {
        flex: 2;
        padding: 15px;
    }
    .comprehensive-index-detail-info_left__header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .comprehensive-index-detail-info__introduction{
        margin-top: 10px;
    }
    .comprehensive-index-detail-info__introduction p{
        padding: 30px;
        margin: 0;
        text-align: left;
        text-align: justify;
    }
    .comprehensive-index-detail-info_right__title{
        text-align: left;
        padding: 0;
        margin: 0;
        margin-bottom: 25px;
        font-size: 20px;
        margin-top: 20px;
    }
    .comprehensive-index-detail-info__title{
        font-size: 20px;
        padding: 30px;
        padding-bottom: 15px;
    }
    .comprehensive-index-detail-info__introduction-des{
        margin-top: 20px;
    }
    .comprehensive-index-detail-info__left-download{
        display: none;
    }
    .comprehensive-index-detail-info__table{
        padding: 0 30px;
    }
    @media screen and (max-width: 1200px) {
        .comprehensive-index-detail-info{
            flex-direction: column;
        }
    }
</style>
