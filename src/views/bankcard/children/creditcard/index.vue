<template>
    <div class="bank-card">
      <div class="no-bg">
          <div class="no-bg-img"></div>
          <p>您暂时还没有绑定银行卡</p>
      </div>
      <!-- <div class="no-btn">
        <button @click="addCardFun()">立即绑定</button>
      </div> -->
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

      
    };
  },
}
</script> 

<style lang="less" src="./index.less" scoped>

</style>