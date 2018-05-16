<template>
<div class="download">
      <div class="top"></div>
      <div class="bottom">
          <div class="btn1" @click="downApp"></div>
      </div>
      <div class="wx_download" v-show="ShowPop"></div>
</div>
	
</template>

<script>
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
      ShowPop: false,
    };
  },
  methods: {
        downApp() {
            let ua = navigator.userAgent.toLowerCase();
            //android终端
            let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;  
    　　//ios终端
            let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if (isWeixinBrowser()) {
              this.ShowPop = !this.ShowPop;
            } else {
              if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                  //ios
                  window.location = 'https://itunes.apple.com/cn/app/id1343725299'
              } else if (/(Android)/i.test(navigator.userAgent)) {
                  //android
                 window.location = 'http://18020787610.fx.sj.360.cn/qcms/view/t/detail?id=3959836'
              }
            }
    
            function isWeixinBrowser() {
                return (/micromessenger/.test(ua)) ? true : false;
            }
      }
    
  },

};
</script> 

<style lang="less" src="./index.less" scoped> </style>