<template>
    <div class="mobile-header">
        <div class="mobile-header__content">
            <div class="logo"><a href="/"><img src="../../assets/logo.png" /></a></div>
            <a @click="showDrawer" class="mobile-header_bar">
                <a-icon :style="{fontSize: '30px',color: '#20202b'}" type="bars" />
            </a>
        </div>

        <a-drawer
            title=""
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
        >
            <ul class="mobile-header__nav" @click="handleClick">
                <li class="mobile-header__nav-item"  data-name="/">
                    {{$t('home.home')}}
                </li>
                <li class="mobile-header__nav-item"  data-name="/comprehensive">
                    {{$t('home.comprehensive_index')}}
                </li>
                <li class="mobile-header__nav-item" data-name="/price">
                    {{$t('home.price_index')}}
                </li>
                <li class="mobile-header__nav-item" data-name="/widget">
                    {{$t('home.widget')}}
                </li>
                <li class="mobile-header__nav-item" data-name="/about">
                    {{$t('home.about_us')}}
                </li>
            </ul>

        </a-drawer>
    </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    handleClick (e) {
      this.onClose()
      this.$router.push(e.target.getAttribute('data-name'))
    }
  }
}
</script>
<style>
    .mobile-header__content{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mobile-header_bar{
        margin-right: 5px;
    }
    .mobile-header__nav{
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .mobile-header__nav-item{
        border-bottom: 1px solid #e8e8e8;
        padding: 20px 0;
        color: rgba(0, 0, 0, 0.65);
    }
</style>
