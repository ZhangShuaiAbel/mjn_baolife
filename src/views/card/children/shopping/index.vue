<template>
    <div class="service">
      <div class="scroll_wrap_2" ref="scroll">
        
        <div class="scroll_center">
          <div class="release_NO" v-if="month==''">
            <div class="release_NO_img"></div>
            <div class="release_NO_text">您还没有任何卡券~</div>
            <div @click="saleCashCard"  class="button_btn">购买包公卡券</div>
        </div>
        <div v-else>
          <div 
              class="main" v-for="(item,index) in month"
              :key="index"
          >
              <div class="card_list">
                      <div class="card_list_left">
                          <p class="monery_img"
                          :style="{ background: 'url(' + item.bannerUrl + ')' + 'center center' }"
                          >
                          </p>
                          <p class="monery_text">{{item.name}}</p>
                      </div>
                      <div class="card_list_right">
                          <p class="monery_text"><span class="span_text">￥</span>{{item.amount | percentage}}</p>
                      </div>
              </div>
              <div class="card_text">
                  <span class="card_img"  @click="_Regulation(item.amount)"></span> 使用规则
                  <p><span  @click="handlePayment(item.cashCardId)" class="border_red">卖了换钱</span></p>
              </div>

          </div>
        </div>  
        </div>
        
			</div>
      <ms-mask :isShow="isShowRegulation" >
           <div class="regulation">
              <div class="regulation_list" v-if="this.regulationMoney==1000">
                  <h3>使用规则</h3>
                  <p>1. 仅限在【包公生活】转售一次；</p>
                  <p>2. 可提供各类日常百事信息咨询服务（飞机票查询，天气查询，电话查询，景区门票查询）。</p>
                  <p>3.自购买日起不限制使用次数；</p>
              </div>
              <div class="regulation_list" v-else-if="this.regulationMoney==500">
                  <h3>使用规则</h3>
                  <p>1. 仅限在【包公生活】转售一次；</p>
                  <p>2. 可提供各类在线考试培训（儿童在线教育，小学课堂指导，研究生考试培训，烹饪培训等）；</p>
                  <p>3.自购买日起不限制使用次数；</p>
              </div>
              <div class="regulation_button" @click="_close_Regulation">确认</div>
           </div>
      </ms-mask>


        <!-- toast start -->
        <ms-toast :isShow="isShowToast"></ms-toast>
        <!-- toast end -->
        
        <ms-hint :isShow="isShowHint" :isText="isShowHintText"></ms-hint>
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from '@/utils';
import Mask from '@/components/root/mask';
import Bscroll from "better-scroll";
import Toast from "@/components/common/toast";
import Hint from '@/components/common/hint';


export default {
    name: "popup",
    data() {
    return {
        isShowToast: false,
        isShowRegulation:false,
        isShowHint: false,
        isShowHintText: '',
        routerLinkPath: {
        sellcard: '/sellcard?',
        regulationMoney:0,
      }

    };
  },
   computed: {
    getSellcardPath() {
      let path = `${this.routerLinkPath.sellcard}`;
      return path;
    },
  },
  mounted() {
         // 监听
        this._monitor();
        this.$nextTick(() => {
            // 初始化scroll
            this._initScroll();
        });
    },
    beforeRouteEnter: (to, from, next) => {
        // 初始化数据
        next( vm => { vm._getRatioData(vm) });
    },

    components: {
     msToast: Toast,
     msMask: Mask,
     msHint: Hint
    
  },
  methods: {
    ...mapMutations({
      setDeatilsInfo: mutationTypes.DETAILS_INFO
    }),
    _initScroll() {
      this.scroll = new Bscroll(this.$refs.scroll, {
        eventPassthrough: "horizontal"
      });
    },
    //购卡跳转
    saleCashCard(){
        this.$router.push({ path: "/universalcard?userId="+this.$route.query.userId});
    },
    // 显示使用规则
    _Regulation(regulationMoney) {
      this.regulationMoney= parseInt(parseFloat(regulationMoney) / 100);
      this.isShowRegulation = true;
    },
    _close_Regulation(regulationMoney) {
       this.isShowRegulation = false;
    },
    // 监听
    _monitor() {  },
    // 初始化数据
    _getRatioData(_this) {
        _this.isShowToast = true;
      this.$http(`${connectURL.DETAILS_DETAIL}?userId=${this.$route.query.userId}&status=10`)
      .then( res => {
console.log( res )
        this.isShowToast = false;
        if ( res.data.code !== 0 ) {
          this.isShowHint = !this.isShowHint;
          this.isShowHintText = res.data.message;
          return;
        }

        let data = res.data.data;
        //购物卡金额
        this.month=data;
        console.log(this.month)

      })
      .catch( err => {
         this.isShowToast = false;
         this.isShowHint = !this.isShowHint;
         this.isShowHintText = err.message;
         console.log( '获取购物卡请求错误===>>', err )
      })
    },
    handlePayment(path){
        this.$router.push(`/sellcard?cashCardId=${path}`);
    }
    
  },
  filters: {
    percentage: function (value) { // 百分比
    let result = `${parseInt(parseFloat(value) / 100)}`;
      return result
    },
    byStages: function (value) { // 分期
      return `${value}期`;
    },
    addUS: function (value) {
      return `￥${value}`
    }
  }
    
}
</script> 

<style lang="less" src="./index.less" scoped>

</style>