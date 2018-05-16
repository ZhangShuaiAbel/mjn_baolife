<template>
    <div class="service">
      
        <div class="sellcard">
            <div class="sellcard_list">

          
              <div class="sellcard_top">
                <!-- :style="{ background: 'url(' + popupImagesPath + ')' + 'center center' }" -->
                <div 
                  class="sellcard_img"
                  :style="{ background: 'url(' + img + ')' + 'center center' }"
                >
                </div>
                <div class="sellcard_text">
                  <p class="text1">{{text}}</p>
                  <p class="color_red">{{amount | percentage | addUS}}</p>
                </div>
              </div>
              <div class="sellcard_bottom">
                <p class="text1">售卖价格</p>
                <p class="sellcard_input">
                  <input 
                    type="text" 
                    v-model.number="saleAmount" 
                    :placeholder="'请设置售卖价格(最高' + saleAmountMax + '元)'" />
                </p>
              </div>
          </div>
         </div>
         <div @click="saleCashCard(cashCardId)"  class="button_btn">确认</div>

         <div class="agreement">点击确认按钮即表示已经阅读并同意<span @click="handleAgreement">《转卖协议》</span></div>

           <ms-hint
             :isShow="isShowHint" :isText="isShowHintText"
           ></ms-hint>
         
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
import Hint from '@/components/common/hint';

export default {
  name: "popup",
  data() {
    return {
      img: "",
      text: "",
      amount: "",
      saleAmount: "",
      saleAmountMax: "",
      userId: "",
      routerLinkPath: {
        esult: "/esult?"
      },
      isShowHint: false,
      isShowHintText:"",
    };
  },
  beforeRouteEnter: (to, from, next) => {
    // 初始化数据
    next(vm => {
      vm._getRatioData(vm);
    });
  },
  components: {
    msHint: Hint,
  },
  computed: {
    getShoppingcardPath() {
      let path = `${this.routerLinkPath.esult}`;
      return path;
    }
  },

  watch: {
    saleAmount: function(value) {
       
      // 百分比
      if (value > this.saleAmountMax) {
        //alert(111)
        this.saleAmount = this.saleAmountMax;
        //return `${this.saleAmountMax}`;
        //data.stock = "";
      }
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //     // 初始化scroll
    //     this._initScroll();
    // });
  },

  methods: {
    // 跳转转卖协议
    handleAgreement() {
      this.$router.push('/agreementZhuanmai');
    },

    //售出操作
    saleCashCard() {
      // console.log(this.userId)
      // console.log(this.$route.query.cashCardId)
      // console.log(this.saleAmount)
      if (this.saleAmount == "" || this.saleAmount <= "0") {
        this.isShowHint = !this.isShowHint;
        this.isShowHintText = " 售卖价格不能为空";
        return false;
      } else {
        this.$http(
          `${connectURL.SALECASHCARD}?cashCardId=${this.$route.query
            .cashCardId}&userId=${this.userId}&saleAmount=${this.saleAmount *
            100}`
        )
          .then(res => {
            let data = res.data.data;
            this.$router.push({ path: "/sellcard/esult?userId="+this.userId });
          })
          .catch(err => {
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = err.message;
            console.log("售出操作请求错误===>>", err);
          });
      }
    },

    // 初始化数据
    _getRatioData(_this) {
      this.$http(
        `${connectURL.CARDSALEAMOUNT}?cashCardId=${this.$route.query
          .cashCardId}`
      )
        .then(res => {
          //this.isShowHint = true;
          if(res.data.data==null){
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = res.data.message;
          }else{
            //if (!res.data.data) return;
          let data = res.data.data;          
          this.img = data.bannerUrl;
          this.text = data.name;
          this.amount = data.amount;
          this.userId = data.userId;
          this.saleAmount =
            parseInt(parseFloat(data.saleAmount)).toFixed(2) / 100;
          this.saleAmountMax =
            parseInt(parseFloat(data.saleAmountMax)).toFixed(2) / 100;
          //购物卡金额
          // this.month=data
          //console.log(this.saleAmountMax);
          }
          
        })
        .catch(err => {
          this.isShowHint = !this.isShowHint;
          this.isShowHintText = err.message;
          console.log("获取售卡金额请求错误===>>", err);
        });
    }
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

<style lang="less" src="./index.less" scoped>

</style>