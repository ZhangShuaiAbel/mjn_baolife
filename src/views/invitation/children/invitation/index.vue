<template>
<div class="invitation">
    <iframe v-if="isShowiframe" src="javascript:;" width="1" height="1" ref="iframe"></iframe>
  	<div class="top">
           
    </div>
    <div class="invitation_weixin">
      <div class="weixin weixin1" @click="invitationcClick(1)">
          <span></span>
          <p>微信</p>
      </div>
      <div class="weixin weixin2" @click="invitationcClick(2)">
          <span></span>
          <p>朋友圈</p>
      </div>
    </div>
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
import Hint from '@/components/common/hint';

export default {
  data() {
    return {
        isShowiframe: false
    };
  },

   components: {
    msToast: Toast,
    msHint: Hint
  },

  methods: {
      invitationcClick(type) {
        console.log(window.location.protocol + window.location.host)
            if (type == "1") { 
              this.isShowiframe = true;
              this.$nextTick(() => {
              this.$refs.iframe.src = `bglife://app?action=7&data={"title":"发现好货，乐享生活。","content":"全场上万件臻选精品，0首付就等你带走！","url":"${window.location.protocol}//${window.location.host}/invitation/register","type":"1"}`;
              });
            } else{ 
              this.isShowiframe = true;
              this.$nextTick(() => {
                this.$refs.iframe.src = `bglife://app?action=7&data={"title":"发现好货，乐享生活。","content":"全场上万件臻选精品，0首付就等你带走！","url":"${window.location.protocol}//${window.location.host}/invitation/register","type":"2"}`;
              });
            }
          }

  },

};
</script> 

<style lang="less" src="./index.less" scoped></style>