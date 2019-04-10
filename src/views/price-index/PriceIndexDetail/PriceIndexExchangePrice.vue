<template>
    <div class="price-index-exchange">
        <div class="price-index-exchange__price-container">
            <span
                v-for="(item,index) in priceIndexItem.pairs"
                class="price-index-exchange_item"
                :key="index"
            >
                <span class="price-index-exchange_name">
                    {{firstUpperCase(item.exchange)}}
                </span>
                <span class="price-index-exchange_price">
                    {{countPrice(item.price.toString(),true)}}
                </span>
            </span>
        </div>
        <div class="price-index-exchange__table">
            <el-table
                :data="priceIndexItem.pairs"
                style="width: 100%"
                border
                empty-text="No Data"
            >
                <el-table-column
                    prop="exchange"
                    label="Exchange"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{firstUpperCase(scope.row.exchange)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="Price"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{countPrice(scope.row.price.toString(),true)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="price-index-exchange__des">
            <h2>
                {{priceIndexItem.index_name.toUpperCase()}} Index
            </h2>
            <span v-html="replaceString(priceIndexItem.des)">
˚            </span>

        </div>
    </div>

</template>

<script>
import { countPrice } from '@/libs/count'
import { firstUpperCase } from '@/libs/firstUpperCase'
export default {
  computed: {
    priceIndexItem () {
      const data = this.$store.state.proindex.proindex.find((item) => {
        return item.id === this.$route.params.id
      })
      return data
    }
  },
  methods: {
    countPrice (price, isPriceIndex) {
      return countPrice(price, isPriceIndex)
    },
    replaceString (str) {
      return str.replace(/\\n/, '<br/>')
    },
    firstUpperCase (num) {
      return firstUpperCase(num)
    }
  }
}
</script>
<style>
    .price-index-exchange__price-container {
        border: 1px solid #dcdcdc;
        width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-left: none;
        border-right: none;
    }

    .price-index-exchange__table{
        display: none;
    }
    .price-index-exchange_item {
        height: 70px;
        border-right: 1px solid #dcdcdc;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-width: 60px;
    }

    .price-index-exchange_item:last-child {
        border-right: none;
        border-left: none;
    }

    .price-index-exchange__des {
        padding: 20px;
        text-align: left;
        width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .price-index-exchange{
        width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .price-index-exchange__table{
        display: none;
    }

    @media screen and (max-width: 1200px) {
        .price-index-exchange{
            width: 100%;
        }
        .price-index-exchange__price-container{
            display: none;
        }
        .price-index-exchange__des{
            width: 100%;
        }
        .price-index-exchange__table{
            display: block;
        }
    }
</style>
