<template>
    <footer>
        <div class="risk_reminder">
            {{ $t('home.risk_reminder') }}
        </div>
        <div class="mid">
            <div class="links">
                <a href="http://www.okex.com" target="_blank"><img src="../../assets/okex.png" /></a>
                <a href="http://www.huobi.pro" target="_blank"><img src="../../assets/huobi.png" /></a>
                <a href="http://www.bitmex.com" target="_blank"><img src="../../assets/bitmex.png" /></a>
                <a href="http://www.bitfinex.com" target="_blank"><img src="../../assets/bitfinex.png" /></a>
            </div>
            <div class="info">
                <p class="info-title">{{ $t('home.contact_us')}}</p>
                <p>{{ $t('home.email')}}: proindex@proindex.com</p>
                <div>
                    {{ $t('home.working_hour')}}:
                    <span>Monday - Friday</span>
                    <p>9:00 AM to 5:00 PM, CST/CDT</p>
                </div>
            </div>
        </div>
        <div class="last">
            <div class="lastnav">
                <router-link class="item" to="/about">{{$t('home.about_us')}}</router-link>
                <router-link class="item" to="/statement">{{$t('home.statement')}}</router-link>
            </div>
            <div class="copyright">
                {{$t('home.copyright')}}
            </div>
        </div>
    </footer>
</template>

<script>

</script>
<style>
footer {
    height:200px;
    width:1200px;
    margin:0 auto;
    margin-top:60px
}
.risk_reminder {
    font-size:14px;
    text-align:left;
    color:#8a94a6;
}
.mid {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top:20px;
}
.links {
    width: 900px;
    display: flex;
    justify-content: space-between
}
.links a {
    margin-right:20px;
    padding:5px;
    display:block;
    width:150px;
    filter:grayscale();
    text-align:center
}
.links a img {
    width:150px;
}
.links a:hover {
    filter:none;
}
.info {
    text-align: left;
    width:250px;
    font-size:14px;
    color:#8a94a6;
    transition: color .25s;
}
.last {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top:20px;
    font-size:14px;
    padding-bottom:20px;
    align-items: center;
}
.last .lastnav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:200px;
}
.last .lastnav a {
    color:#454752;
    display:block;
    text-align: center;
    margin-right: 20px;
}
.lastnav .item{
    border-bottom: 1px solid #ddd;
}
.lastnav .item:hover{
    border-bottom: 1px solid #000;
}
.info-title{
    font-weight: bold;
}
@media screen and (max-width: 960px) {
    .mid{
        flex-direction: column;
    }
    .links {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
    }
    .links a{
        margin: 10px;
    }
    .last{
        flex-wrap: wrap;
    }
    .last .lastnav{
        width: auto;
        padding: 20px 0;
    }
}

@media screen and (max-width: 1200px) {
    footer {
        width: 100%;
        border-radius: 0;
        padding: 10px;
        text-align: justify;
        box-sizing: border-box;
    }
}
</style>
