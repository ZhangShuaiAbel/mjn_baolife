<template>
    <div class="service" ref="scroll">
        <div class="release_success">
            <div class="release_success_img">

            </div>
            <div class="release_success_text">
                商品发布成功
            </div>
            <div class="release_success_text">
                预计24小时内转售成功
            </div>
        </div>
        <!-- <div class="recommend">
                <h3>为您推荐</h3>
                <div class="recommend_img">
                    <ul>
                        <li
                         v-for="(item, index) in getRandomArrayElements"
                        :key="index"
                        :style="{ background: 'url(' + item.img + ')' + 'no-repeat' }"
                        >
                        </li>
                    </ul>
                </div>
        </div> -->
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from '@/utils';
import Bscroll from "better-scroll";



export default {
    name: "popup",
    data() {
        return {
            isShowToast: false,
            data_list:[],
            getRandomArrayElements:[],
            userId:"",
            
        };
        
  },
    beforeRouteEnter: (to, from, next) => {
        // 初始化数据
        next( vm => { vm._saleCashCard(vm) });
    }, 
    mounted() {
    // 初始化scroll
        this.$nextTick(() => { this._initScroll() });
        this.$nextTick(() => { this.created() });
    },

  methods: {
      _initScroll() {
      this.scroll = new Bscroll(this.$refs.scroll, {
        eventPassthrough: "horizontal"
      });
    },
    
    created() { 
        this.userId=this.$route.query.userId;
        let userIds=this.userId;
        var t;
        clearTimeout(t)
        t = setTimeout(function (){
           window.location.href ="/sale?userId="+userIds
        }, 2000);
                //

    },

    // 初始化数据
    _saleCashCard(){
            // console.log(this.$route.query.cashCardId)
            // console.log(this.saleAmount)
            this.$http(`${connectURL.SALEPRODUCTS}?page=1`)
              .then( res => {
                if ( !res.data.data ) return; 
                let data = res.data.data;
                this.data_list=data;
                function getRandomArrayElements(arr, count) {
                    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
                    while (i-- > min) {
                        index = Math.floor((i + 1) * Math.random());
                        temp = shuffled[index];
                        shuffled[index] = shuffled[i];
                        shuffled[i] = temp;
                    }
                    return shuffled.slice(min);
                }
               this.getRandomArrayElements=getRandomArrayElements(this.data_list, 4)

                               // this.$router.push({ path: '/sellcard/esult'})

                //购物卡金额
                // this.month=data
                // console.log(this.month)
                
              })
              .catch( err => {
                console.log( '获取分期接口请求错误===>>', err )  
              })
        },
    
  },
    
}
</script> 

<style lang="less" src="./index.less" scoped>

</style>