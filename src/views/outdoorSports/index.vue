<template>
    <div id="sport">
        <div class="banner" :style="{ background: 'url(' + bannerUrl + ')' + 'no-repeat center center' }"></div>
        <div class="list">
            <div class="commodity" v-for="(item,index) in datalist" :key="index" @click="handleDetails(item)">
                <div class="commodity-img" :style="{ background: 'url(' + item.img + ')' + 'no-repeat center' }"></div>
                <div class="commodity-content">
                    <p>{{item.title}}</p>
                    <div class="price">{{item.price | addUS}}</div>
                    <div class="staging">
                        <div class="left">{{item.minPay | addUS}}</div>
                        <div class="right">{{item.period | byStages}}</div>
                    </div>
                </div>
            </div>          
        </div>
        <ms-hint :isShow="isShowHint" :isText="validationData"></ms-hint>
        <ms-toast :isShow="isShowToast"></ms-toast>
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import Toast from "@/components/common/toast";
import * as connectURL from "@/http/common/connectURL";
import { bus, busType } from "@/bus";
import Popup from "@/components/common/popup";
import Hint from '@/components/common/hint';

export default {
    name: "tiedCard",
    data() {
        return {
            datalist:[], 
            isShowHint: false,
            isShowToast: false,
            validationData:"",
            bannerUrl:"",
        };
    },
    components: {
        msHint: Hint,
        msToast: Toast,

    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => { vm.getSpoet() })
    },
    methods: {
        getSpoet(){
            console.log(window.location.href);
            this.isShowToast = true;
            this.$http(`${connectURL.SPORT_GETACTIVITYPRODUCTS}?activityId=${this.$route.query.activityId}`)
            .then(res => {
                console.log(res);
                if ( res.data.data === null ) {
                    this.isShowHint = !this.isShowHint;     
                    this.validationData = res.data.message;
                    this.isShowToast = false;
                    return false;
                }
                this.datalist = res.data.data.productViews;
                this.bannerUrl = res.data.data.bannerUrl;
                this.isShowToast = false;
                document.title = res.data.data.title;
            })
            .catch(err => {     
                console.log("获取商品列表接口请求错误===>>", err);
                this.isShowToast = false;
                this.isShowHint = !this.isShowHint;     
                this.validationData = err.message;
            });
        },
        handleDetails(itemData){
            let {categoryId,channelId,channelNum} = itemData;
            this.$router.push({path: '/details?categoryId=' +categoryId +'&channelId='+ channelId +'&channelNum='+ channelNum + '&userId='+this.$route.query.userId});
        }
    },
    watch: {},
    filters: {
        percentage: function(value) {
            // 百分比
            let result = `${parseInt(parseFloat(value).toFixed(2) / 100)}`;
            return result;
        },
        byStages: function(value) {
            // 分期
            return `${value}期`;
        },
        addUS: function(value) {
            return `￥${value/100}`;
        }
    }
};
</script>

<style lang="less" src="./index.less" scoped>

</style>