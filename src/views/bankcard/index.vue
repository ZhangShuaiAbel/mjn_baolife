<template>
    <div class="card" ref="wrapper">
        <ms-header>
            <div class="card_wrap">
                <ul class="contents card_panel card_tab">
                    <router-link class="linkStyle" :to="getCashcardPath" exact replace active-class="is_active">
                        <a class="is_active_color">储蓄卡</a>
                    </router-link>
                    <router-link class="linkStyle" :to="getCreaditcardPath" exact replace active-class="is_active">
                        <a class="is_active_color">信用卡</a>
                    </router-link> 
                </ul>
                <div class="details_panel_slider">
                    <p class="slider" :class="sliderActivClass"></p>
                </div>
            </div>
        </ms-header>

            <!-- scroll start -->
            <div class="scroll_wrap" ref="scroll">
                  <transition :name="direction" mode="out-in">
                    <router-view></router-view>
                  </transition>
            </div>
            <!-- scroll end -->
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";

import Bscroll from "better-scroll";

import Popup from "@/components/common/popup";
import Slide from "@/components/common/slide";
import Toast from "@/components/common/toast";
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';


export default {
  name: "popup",
    data() {
    return {
      direction: 'left',
      routerLinkPath: {
        cashcardPath: '/bankcard?',
        creditcard: '/bankcard/creditcard?',
      }
    };
  },
   computed: {
    getCashcardPath() {
      let path = `${this.routerLinkPath.cashcardPath}?userId=${this.$route.query.userId}&realName=${this.$route.query.realName}`;
      return path;
    },
    getCreaditcardPath() {
      let path = `${this.routerLinkPath.creditcard}?userId=${this.$route.query.userId}&realName=${this.$route.query.realName}`;
      return path;
    },
    sliderActivClass() {
      if ( this.$route.meta.index === 1 ) {
        return 'location_1'
      }else if ( this.$route.meta.index === 2 ) {
        return 'location_2'
      }else {
        return 'location_3'
      }
    },


  },
  watch: {
    $route(to, from) {
      // 重新计算scroll
      //this.scroll.refresh();
      if ( to.meta.index > from.meta.index ) {
        this.direction = 'left';
      }else {
        this.direction = 'right';
      }
    }
  },
  components: {
    msHeader: Header,
  }

}
</script>

<style lang="less" src="./index.less" scoped></style>