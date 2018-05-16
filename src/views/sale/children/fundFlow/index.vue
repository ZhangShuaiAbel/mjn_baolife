<template>
	<div class="release">
		<div class="release-pro">
			<div  class="release_list" style="margin-top: 0;">
				<div class="release_left"
                :style="{ background: 'url(' + bannerUrl + ')' + 'center center' }"
                >
					
					

				</div>
				 <div  class="release_center">
					<h3>{{name}}</h3>
					<p>【转手价格】<span>{{saleAmount | percentage | addUS}}</span></p>
				</div>

			</div>
		</div>
  <!-- scroll start -->
		<div class="scroll_wrap" ref="scroll">
			<div class="scroll_center">
        <div class="release-msg">
            
            <div class="release-msg-center">
              <div class="center-box"
              v-for="(item,index) in listUserOperation"
              :key="index">
                <div v-if=" index == 0 " class="release-msg-aside"></div> 
                <div v-else-if=" index >= 1 " class="release-msg-aside1"></div>

                <div class="release-msg-aside-right">
                <span>{{item.createTime | formatDate}}</span>
                <p class="box-p-one">{{item.operationContent}}</p>
                </div>
              </div>
            </div>
          </div>
    	</div>
		</div>
    <!-- scroll end -->

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

import * as connectURL from "@/http/common/connectURL";
import {formatDate} from '@/http/common/formatDate.js';
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
      isShowToast: false,
      bannerUrl: "",
      name:"",
      saleAmount:"",
      listUserOperation:[],
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
    // 初始化数据
    _getRatioData(_this) {
      this.isShowToast = true;
      this.$http(
        `${connectURL.TRADELOG}?userId=${this.$route.query
          .userId}&cashCardId=${this.$route.query
          .cashCardId}`
      )
        .then(res => {
          this.isShowToast = false;
          if (!res.data.data) return;
          let data = res.data.data;
          console.log(data)
          this.bannerUrl = data.bannerUrl;//图片地址
          this.name = data.name;//名称
          this.saleAmount = data.saleAmount;//金额
          this.listUserOperation=data.listUserOperation;//资金流向状态
        })
        .catch(err => {
          this.isShowToast = false;
          this.isShowHint = !this.isShowHint;
         this.isShowHintText = err.message;
          console.log("获取资金流向请求错误===>>", err);
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
    },
    formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
    }   
         
             
  }
};
</script> 

<style lang="less" src="./index.less" scoped></style>