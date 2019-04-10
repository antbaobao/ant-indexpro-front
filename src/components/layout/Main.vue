<template>
    <div class="main">
        <main>
            <Header/>
            <div class="main__container">
                <router-view/>
            </div>
            <Footer/>
        </main>
    </div>

</template>
<script>
import Footer from './Footer'
import Header from './Header'
export default {
  components: {
    Footer,
    Header
  }
}
</script>
<style>
    .main{
        min-height: 400px;
    }
    .main__container{
        min-height: 400px;
    }
</style>
