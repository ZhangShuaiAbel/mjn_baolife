<template>
	<div class="release">
		<div class="release-pro">
			<div 
            class="release_list" v-for="(item,index) in release_list"
            :key="index"
        >
				<div class="release_left"
                :style="{ background: 'url(' + item.bannerUrl + ')' + 'center center' }"
                >
					
					

				</div>
				<div  class="release_center">
					<h3>{{item.name}}</h3>
					<p>【转手价格】<span>{{item.saleAmount | percentage | addUS}}</span></p>
				</div>
				<div  class="release_right">
					<h3 v-if=" item.cashCardStatus == 20 ">已售完</h3>
					<h3 v-else-if=" item.cashCardStatus == 21 ">售卖中</h3>
					<h3 v-else-if=" item.cashCardStatus == 22 ">售卖成功</h3>
					
					<p @click="compile(item.cashCardId)"  v-if=" item.cashCardStatus == 21 ">编辑</p>
					<p v-else-if=" item.cashCardStatus == 20 ">资金流向</p>
					<p v-else-if=" item.cashCardStatus == 22 ">资金流向</p>
				</div>
			</div>
		</div>
    <!-- toast start -->
        <ms-toast :isShow="isShowToast"></ms-toast>
        <!-- toast end -->
		<!-- <div class="release-msg">
			<div class="release-msg-aside">
				<img src="../../assets/images/tiao_one.png" v-show="isShowstepsImgOne" />
				<img src="../../assets/images/tiao_two.png" v-show="isShowstepsImgTwo" />
				<img src="../../assets/images/tiao_three.png" v-show="isShowstepsImgThree" />
			</div>
			<div class="release-msg-center">
				<div class="center-box" v-show="isShowstepsThree">
					<p class="box-p-one">售卖所得资金已汇款至您尾号（xxxx）</p>
					<p class="box-p-two">的xxx银行卡中【请注意查收】</p>
					<span>2017-12-12 16:00:00</span>
				</div>
				<div class="center-box" v-show="isShowstepsTwo">
					<p class="box-p-one box-p-left">【售卖成功】</p>
					<p class="box-p-two">xxx已购买了您发布的商品</p>
					<span>2017-12-12 16:00:00</span>
				</div>
				<div class="center-box" v-show="isShowstepsOne">
					<p class="box-p-two box-p-left">【发布售卖】</p>
					<span>2017-12-12 16:00:00</span>
				</div>
			</div>
			<div class="release-msg-aside"></div>
		</div> -->
	</div>
</template>

<script>
import Toast from "@/components/common/toast";

import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from "@/utils";
import Bscroll from "better-scroll";

export default {
  name: "popup",
  data() {
    return {
      isShowToast: false,
      release_list: []
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
  },

  watch: {},

  methods: {
    // _initScroll() {
    //   this.scroll = new Bscroll(this.$refs.scroll, {
    //     eventPassthrough: "vertical"
    //   });
    // },
    // 初始化数据
    _getRatioData(_this) {
      this.isShowToast = true;
      this.$http(
        `${connectURL.DETAILS_DETAIL}?userId=${this.$route.query
          .userId}&status=2`
      )
        .then(res => {
          //this.isShowToast = false;
          if (!res.data.data) return;
          let data = res.data.data;
          this.release_list = data;
          //购物卡金额
          // this.month=data
          console.log(release_list);
        })
        .catch(err => {
          this.isShowToast = false;
          console.log("获取分期接口请求错误===>>", err);
        });
    },
    //编辑
    compile(cashCardId) {
      this.$router.push({ path: "/sellcard?cashCardId="+cashCardId });

     
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

<style lang="less" src="./index.less" scoped></style>