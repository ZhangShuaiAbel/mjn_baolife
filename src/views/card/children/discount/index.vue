<template>
    <div class="service">
      <div class="scroll_wrap" ref="scroll">
			<div class="scroll_center">
            <div class="release_NO">
                <div class="release_NO_img"></div>
                <div class="release_NO_text">暂无优惠券~</div>
            </div>           
			</div>
      </div>

<!-- toast start -->
        <!-- <ms-toast :isShow="isShowToast"></ms-toast> -->
        <!-- toast end -->
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";


import Bscroll from "better-scroll";



export default {
    name: "popup",
    data() {
    return {

    };
  },

    computed: {
       // ...mapState(["detailsInfo"])
    },
    mounted() {
        this.$nextTick(() => {
            // 初始化scroll
            this._initScroll();
        });
    },
    
  methods: {
    _initScroll() {
      this.scroll = new Bscroll(this.$refs.scroll, {
        eventPassthrough: "horizontal"
      });
    },
    // 初始化数据
    
  },
    
}
</script> 

<style lang="less" src="./index.less" scoped>

</style>