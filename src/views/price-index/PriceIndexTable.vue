<template>
    <div class="priceindex-table">
        <el-table
            :data="proindex"
            header-row-class-name="header"
            style="width: 100%"
            v-loading="getProindexLoading"
            element-loading-text=""
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            empty-text="No Data"
        >
            <el-table-column
                prop="name"
                :label="$t('home.name')"
                fixed
            >
                <template slot-scope="scope">
                     <span class="home-index__coin-name" @click="(e)=>onRowClick(scope.row)">
                         {{ scope.row.index_name.toUpperCase() }} - {{firstUpperCase(scope.row.full_name)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="lastPrice"
                :label="$t('home.last_price')"
                width="200"
            >
                <template slot-scope="scope">
                    ${{ formatNumberRgx(countPrice(scope.row.price,scope.row.pairs)) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="low"
                :label="$t('home.lowest') + '(24H)'"
                width="200"
            >
                <template slot-scope="scope">
                    ${{ formatNumberRgx(countPrice(scope.row.lowest,scope.row.pairs)) }}
                </template>
            </el-table-column>

            <el-table-column
                prop="high"
                :label="$t('home.highest') + '(24H)'"
                width="200"
            >
                <template slot-scope="scope">
                    ${{ formatNumberRgx(countPrice(scope.row.highest,scope.row.pairs)) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="change"
                :label="$t('home.change') + '(24H)'"
                width="200"
            >
                <template slot-scope="scope">
                    <ShowChange
                        :value="formatNumberRgx(countPrice(countChange(scope.row.price,scope.row.before_price).changeValue.toString(),scope.row.pairs))"
                        :isRed="countChange(scope.row.price,scope.row.before_price).changeValue < 0 "
                    />
                    <ShowChange
                        :value="formatNumberRgx(Number(countChange(scope.row.price,scope.row.before_price).changePercentage.toFixed(2)))+'%'"
                        :isRed="countChange(scope.row.price,scope.row.before_price).changeValue < 0 "
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="price_graph"
                :label="$t('home.price_graph') + '(7d)'"
                width="200"
            >
                <template slot-scope="scope">
                    <peity :type="'line'"
                           :options="{ width: 150, height:50, stroke: '#4d89f9' }"
                           :data="scope.row.circle.toString()"></peity>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import Peity from 'vue-peity'
import { formatNumberRgx } from '@/libs/formatNumberRgx'
import ShowChange from '@/components/ShowChange'
import { countChange, countPrice } from '@/libs/count'
import { firstUpperCase } from '@/libs/firstUpperCase'
export default {
  components: {
    Peity,
    ShowChange
  },
  computed: {
    lineData () {
      return this.data.toString()
    },
    proindex () {
      return this.$store.state.proindex.proindex.filter(function (item) {
        return item.pairs
      })
    },
    getProindexLoading () {
      return this.$store.state.proindex.getProindexLoading
    }
  },
  methods: {
    onRowClick (row, column, event) {
      // this.$route.push(`/price/:${row.id}`)
      this.$router.push({ path: `/price/detail/${row.id}` })
    },
    formatNumberRgx (num) {
      return formatNumberRgx(num)
    },
    countChange (price, beforePrice) {
      return countChange(price, beforePrice)
    },
    countPrice (price, isPriceIndex) {
      return countPrice(price, isPriceIndex)
    },
    firstUpperCase (str) {
      return firstUpperCase(str)
    }
  }
}
</script>
<style>
    .priceindex-table {
        width: 1200px;
        margin: 30px auto;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        overflow: hidden;
    }

    .priceindex-table .header th {
        background: rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.5)
    }

    .priceindex-table td {
        font-size: 14px;
    }

    .el-table .cell .home-index__coin-name:hover {
        color: #409EFF;
    }

    .el-table .cell .home-index__coin-name {
        width: 100%;
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
    }

    @media screen and (max-width: 1200px) {
        .priceindex-table {
            width: 100%;
            border-radius: 0;
        }
    }
</style>
