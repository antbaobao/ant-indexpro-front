<template>
    <nav class="nav">
        <div class="nav-header">
            <div class="logo"><a href="/"><img src="../../assets/logo.png" /></a></div>
            <div class="menu">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$t('home.home')" name="/"></el-tab-pane>
                    <el-tab-pane :label="$t('home.comprehensive_index')" name="/comprehensive"></el-tab-pane>
                    <el-tab-pane :label="$t('home.price_index')" name="/price"></el-tab-pane>
                    <el-tab-pane :label="$t('home.widget')" name="/widget"></el-tab-pane>
                    <el-tab-pane :label="$t('home.about_us')" name="/about"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="right">
            </div>
        </div>
        <div class="nav-header-mobile">
            <MobileHeader/>
        </div>

    </nav>
</template>
<script>
import MobileHeader from './MobileHeader'
export default {
  data () {
    return {
      activeName: '/'
    }
  },
  components: {
    MobileHeader
  },
  methods: {
    handleClick (tab, event) {
      this.$router.push(tab.name)
    }
  },
  mounted () {
    this.activeName = window.location.pathname
  }
}
</script>
<style>
    .nav-header-mobile{
        display: none;
    }
    .nav-header {
      height:70px;
      flex-direction: row;
      display:flex;
      justify-content:space-between;
      align-items: center;
      background: #fff;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
    }
    .logo {
      padding: 15px;
    }
    .right {
      width: 300px;
    }
    .menu {
      width: 875px;
      overflow:hidden;
      font-size: 16px;
      padding-left:200px;
    }
    .menu .el-tabs__active-bar {
      background:none
    }
    .menu .el-tabs__header {
      margin:0;
    }
    .menu .el-tabs__nav-wrap::after {
      background: none
    }
    .menu .el-tabs__item {
      font-size:16px;
    }
    @media screen and (max-width: 960px) {
        .nav-header {
            display: none;
        }
        .nav-header-mobile{
            display: block;
        }
    }
</style>
