<template>
    <div class="bank-card">
       <div class="cards cards-checked" v-show="bankCradContent" v-for="(item,index) in bankList" :key="index" :class="item.repayStatus==1 ? 'cards-checked' : 'cards-no-checked'" aria-hidden="true">
          <div class="cards-left">
            <div class="cards-img" :class=" 'bank_' + item.bankName"></div>
            </div>
          <div class="cards-center">
            <p class="cards-name">{{item.bankNameChar}}</p>
            <p class="cards-type" v-if="item.creditStatus==0">储蓄卡</p>
            <p class="cards-type" v-else>信用卡</p>
            <p class="cards-num">{{item.bankNum | hideNum}}</p>
          </div>
          <div class="cards-right">
            <div class="cards-tit-img" :class="item.repayStatus==1 ? 'cards-tit-img-ed' : ''" aria-hidden="true"></div>
          </div>         
       </div>
      <!-- <div class="btn">
			  <button @click="addCardFun()">添加更多储蓄卡</button>
		  </div> -->
      <div class="no-bg" v-show="isNoCard">
          <div class="no-bg-img"></div>
          <p>您暂时还没有绑定银行卡</p>
      </div>
      <div class="no-btn" v-show="isNoCard">
        <button @click="addCardFun()">立即绑定</button>
      </div>
      <ms-toast :isShow="isShowToast"></ms-toast>

      <ms-hint :isShow="isShowHint" :isText="isShowHintText"></ms-hint>
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from "@/utils";

import Bscroll from "better-scroll";
import Toast from "@/components/common/toast";
import Hint from '@/components/common/hint';

export default {
  name: "popup",
  data() {
    return {
      isNoCard:false,
      bankCradContent:false,
      isShowToast: false,
      isShowHint: false,
      isShowHintText: '',
      routerLinkPath: {
        sellcard: "/sellcard?"
      },
      bankList: []
      
    };
  },
  computed: {
    getSellcardPath() {
      let path = `${connectURL.TIEDCARD_BILLBANKCARD}?userId=${this.$route.query.userId}`;
      return path;
    },
  },
  components: {
    msToast: Toast,
    msHint: Hint
  },
  beforeRouteEnter: (to, from, next) => {
    // 初始化数据
    next(vm => {
      vm._getRatioData(vm);
    });
  },

  // computed: {
  //     ...mapState(["detailsInfo"])
  // },
  mounted() {
    // this.$nextTick(() => {
    //     // 初始化scroll
    //     this._initScroll();
    // });
  },

  methods: {
    ...mapMutations({
      setDeatilsInfo: mutationTypes.DETAILS_INFO
    }),
    _initScroll() {
      this.scroll = new Bscroll(this.$refs.scroll, {
        eventPassthrough: "vertical"
      });
    },
    // 初始化数据
    _getRatioData(_this) {
      this.isShowToast = true;
      this.$http(`${connectURL.BANKCARD_MYBILLBANK}?userId=${this.$route.query.userId}`)
        .then(res => {
          this.isShowToast = false;
          if(res.data.data!=""){
              this.isNoCard = false;
              this.bankCradContent = true;
          }else{
            this.isNoCard = true;
          }
          if ( res.data.code !== 0 ) {
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = res.data.message;
            return;
          }

          this.bankList = res.data.data;
          console.log(this.bankList);
        })
        .catch(err => {
          this.isShowToast = false;
          this.isShowHint = !this.isShowHint;
          this.isShowHintText = err.message;
          console.log("获取分期接口请求错误===>>", err);
        });
    },
    addCardFun: function() {
        this.$router.push({path: '/tiedcard?userId=' + this.$route.query.userId +'&realName='+ this.$route.query.realName});
    }
  },
  filters: {
    percentage: function(value) {
      // 百分比
      let result = `${parseInt(parseFloat(value) / 100)}`;
      return result;
    },
    byStages: function(value) {
      // 分期
      return `${value}期`;
    },
    addUS: function(value) {
      return `￥${value}`;
    },
    hideNum: function(value) {
      let cardNum = `${value.replace(/^\d{15}/, "**** **** **** ")}`;
      return cardNum;
    }
  }
};
</script> 

<style lang="less" src="./index.less" scoped>

</style>