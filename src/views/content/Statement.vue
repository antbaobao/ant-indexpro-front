<template>
    <div class="statement">
        <p class="statement-title">{{$t("statement.title")}}</p>
        <div class="statement-content">
            <p>{{$t("statement.p1")}}</p>
            <p class="statement__strong-text">{{$t("statement.p2")}}</p>
            <p>{{$t("statement.p3")}}</p>
            <p class="statement__strong-text">{{$t("statement.p4")}}</p>
            <p>{{$t("statement.p5")}}</p>
            <p>{{$t("statement.p6")}}</p>
            <p>{{$t("statement.p7")}}</p>
            <p class="statement__strong-text">{{$t("statement.p8")}}</p>
            <p class="statement__strong-text">{{$t("statement.p9")}}</p>
            <p class="statement__strong-text">{{$t("statement.p10")}}</p>
            <p>{{$t("statement.p11")}}</p>
            <p class="statement__strong-text">{{$t("statement.p12")}}</p>
            <div>
                <span>{{$t("statement.p13")}}</span>
                <span class="statement__strong-text">{{$t("statement.p14")}}</span>
            </div>
            <p class="statement__strong-text">{{$t("statement.p15")}}</p>
            <p>{{$t("statement.p16")}}</p>
            <p class="statement__strong-text">{{$t("statement.p17")}}</p>
        </div>

    </div>
</template>

<style>
    .statement-title{
        width: 1200px;
        text-align: left;
        font-size: 24px;
        margin: 0 auto;
        margin-top: 40px;
        font-weight: bolder;
        border-radius: 5px;
        text-align: left;
    }
    .statement__strong-text{
        font-weight: bold;
    }
    .statement-content{
        width: 1200px;
        margin: 0 auto;
        background-color: white;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
        padding: 40px;
        text-align: left;
        margin-top: 20px;
    }
    @media screen and (max-width: 1200px) {
        .statement {
            width: 100%;
        }
        .statement-content{
            width: 100%;
        }
        .statement-title{
            margin-left: 20px;
            width: 100%;
        }
    }
    @media screen and (max-width: 760px) {
        .statement-title{
            margin: 0;
            text-align: center;
        }
        .statement-content{
            padding: 20px;
        }
    }
</style>
