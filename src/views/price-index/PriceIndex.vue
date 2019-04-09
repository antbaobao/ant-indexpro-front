<template>
  <div class="price-index">
      <div class="price_index__title">{{$t("price_index.price_index")}}</div>
      <PriceIndexTable/>
  </div>
</template>

<script>
import PriceIndexTable from './PriceIndexTable'
export default {
  name: 'home',
  components: {
    PriceIndexTable
  }
}
</script>
<style>
.price_index__title {
  text-align:left;
  font-size:24px;
  width:1200px;
  margin:0 auto;
  margin-top:40px;
  font-weight:bolder;
}

@media screen and (max-width: 1200px) {
    .price_index__title{
        width:100%;
        padding-left: 10px;
        margin-top: 10px;
    }
}
@media screen and (max-width: 960px) {
    .price_index__title{
        text-align: center;
    }
}
</style>
