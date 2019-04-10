<template>
  <div class="home">
      <div class="banner">
      </div>
      <HomeIndex/>
  </div>
</template>

<script>
import HomeIndex from './HomeIndex'
export default {
  name: 'home',
  components: {
    HomeIndex
  }
}
</script>
<style>
.banner {
    height:299px;
    overflow: hidden;
    background:url(../../assets/banner.jpg) center #202133;
    background-size: cover;
}
@media screen and (max-width: 960px) {
    .banner{
        display: none;
    }
}
</style>
