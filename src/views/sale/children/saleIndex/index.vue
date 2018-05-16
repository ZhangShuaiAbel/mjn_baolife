<template>
	<div class="release">
    
		<div class="release-pro" ref="scroll">
      <div class="release_NO" v-if="releaseLlist==''">
          <div class="release_NO_img"></div>
          <div class="release_NO_text">您还没有发布任何商品~</div>
           <div @click="saleCashCard"  class="button_btn">购买包公卡券</div>
      </div>
      <div v-else>
          <div 
            class="release_list" v-for="(item,index) in releaseLlist"
            :key="index"
          >
          <div class="release_left"
            :style="{ background: 'url(' + item.bannerUrl + ')' + 'center center' }"
          ></div>

          <div class="release_center">
            <h3>{{item.name}}</h3>
            <p>【转手价格】<span>{{item.saleAmount | percentage | addUS}}</span></p>
          </div>

          <div  class="release_right">
            <h3 v-if=" item.cashCardStatus == 20 ">已售出</h3>
            <h3 v-else-if=" item.cashCardStatus == 21 ">售卖中</h3>
            <h3 v-else-if=" item.cashCardStatus == 22 ">售卖成功</h3>
            
            <p @click="compile(item.cashCardId)"  v-if=" item.cashCardStatus == 21 ">编辑</p>
            <p @click="fundFlow(item.cashCardId,item.userId)"  v-else-if=" item.cashCardStatus == 20 ">资金流向</p>
            <p @click="fundFlow(item.cashCardId,item.userId)"  v-else-if=" item.cashCardStatus == 22 ">资金流向</p>
          </div>

        </div>
      </div>
			
		</div>
      <!-- toast start -->
      <ms-toast :isShow="isShowToast"></ms-toast>
      <!-- toast end -->
       <!-- hint start -->
        <ms-hint :isShow="isShowHint" :isText="isShowHintText"></ms-hint>
        <!-- hint end -->
	</div>
</template>

<script>
import Toast from "@/components/common/toast";
import Bscroll from "better-scroll";

import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from "@/utils";
import Hint from '@/components/common/hint';


export default {
  name: "popup",
  data() {
    return {
      isShowToast: false,
      releaseLlist: [],
      isShowHint: false,
      isShowHintText: '',
    };
  },
  beforeRouteEnter: (to, from, next) => {
    // 初始化数据
    next(vm => {
      vm._getRatioData(vm);
    });
  },
   components: {
    msToast: Toast,
    msHint: Hint
  },

  watch: {},
  mounted() {
    // 初始化scroll
    this.$nextTick(() => { this._initScroll() });
  },
  methods: {
    _initScroll() {
      this.scroll = new Bscroll(this.$refs.scroll, {
        eventPassthrough: "horizontal"
      });
    },
    //购卡跳转
    saleCashCard(){
        this.$router.push({ path: "/universalcard?userId="+this.$route.query.userId});
    },
    // 初始化数据
    _getRatioData(_this) {
      this.isShowToast = true;
      this.$http(
        `${connectURL.DETAILS_DETAIL}?userId=${this.$route.query
          .userId}&status=2`
      )
        .then(res => {
          this.isShowToast = false;
          if (!res.data.data) return;
          let data = res.data.data;
          this.releaseLlist = data;
          //购物卡金额
          // this.month=data
        })
        .catch(err => {
          this.isShowToast = false;
          this.isShowHint = !this.isShowHint;
          this.isShowHintText = err.message;
          console.log("获取购物卡请求错误===>>", err);
        });
    },
    //编辑
    compile(cashCardId) {
      this.$router.push({ path: "/sellcard?cashCardId="+cashCardId });
    },
    //资金流向
    fundFlow(cashCardId,userId) {
      this.$router.push({ path: "/sale/fundFlow?cashCardId="+cashCardId+"&userId="+userId });
    },
  },
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
      return `￥${value}`;
    }
  }
};
</script> 

<style lang="less" src="./index.less" scoped> </style>