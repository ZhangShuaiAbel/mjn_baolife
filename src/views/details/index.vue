<template>
	<div class="details">
		<!-- scroll start -->
		<div class="details_scroll_wrap">
			<div class="details_scroll_center">
				<!-- slide start -->
				<ms-slide :dataSource="initData.slideImgs"></ms-slide>
				<!-- slide end -->

				<!-- title start -->
				<div class="details_panel details_title" v-text="initData.detailsTextInfo.name"></div>
				<!-- title end -->

				<!-- price start -->
				<div class="details_panel details_price">{{ initData.detailsTextInfo.jdPrice / 100 | addUS }}</div>
				<!-- price end -->

				<div class="details_panel details_guarantee" @click="_handleServicePopup">
					<span>
              <span class="details_guarantee_text">正品保证</span>
					</span>
					<span>
              <span class="details_guarantee_text">假一赔十</span>
					</span>
					<span>
              <span class="details_guarantee_text">七天无理由退换</span>
					</span>
					<span>
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </span>
        </div> 

        <!-- 详情tab start -->
        <div class="details_panel_wrap">
          <ul class="details_panel details_tab">
            <router-link class="linkStyle" :to="getDetailsInfoPath" exact replace active-class="is_active">
              <a class="is_active_color">商品详情</a>
            </router-link>
            <router-link class="linkStyle" :to="getDetailsListPath" exact replace active-class="is_active">
              <a class="is_active_color">规格参数</a>
            </router-link>
            <router-link class="linkStyle" :to="getDetailsServicePath" exact replace active-class="is_active">
              <a class="is_active_color">包装清单</a>
            </router-link>
          </ul>
          <div class="details_panel_slider">
            <p class="slider" :class="sliderActivClass"></p>
          </div>
        </div>
			    <!-- 详情tab end -->

          <!-- 货源 start -->
          <div class="details_panel details_source">
            <p class="details_source_title">货源</p>
            <router-link :to="getDetailsInfoPath" class="details_source_text" tag="p">京东/苏宁</router-link>
          </div>
          <!-- 货源 end -->

          <transition :name="direction" mode="out-in">
            <router-view></router-view>
          </transition>

      </div>

        <!-- popup 服务 start -->
        <ms-popup :isShow="isShowServicePopup" >
          <div class="popup_service">
            <div class="popup_service_title">服务</div>
            <div class="popup_service_content">
              <div class="popup_service_content_item">
                <p class="popup_service_content_item_title">正品保证</p>
                <p>该商品由平台提供正品保证</p>
              </div>
              <div class="popup_service_content_item">
                <p class="popup_service_content_item_title">假一赔十</p>
                <p>如消费者购物物品经核实为假冒伪略，平台赔偿所购商品价格的十倍损失</p>
              </div>
              <div class="popup_service_content_item">
                <p class="popup_service_content_item_title">七天无理由退还</p>
                <p>该商品可提供七天无理由退还货服务</p>
              </div>
            </div>
            <div class="popup_service_button" @click="cloneServicePopup">确认</div>
          </div>
        </ms-popup>
         <!-- popup 服务 end -->

        <!-- popup 比例 start -->
        <ms-popup :isShow="isShowRatioPopup" >
          <ms-bystages
            v-if="isShowRatioPopup"
            :dataSource="initData.ratioData"
            :title="initData.detailsTextInfo.name"
            :price="initData.detailsTextInfo.jdPrice / 100"
            :titleImagePath="popupImagesPath"
            :isHref="isHref"
          ></ms-bystages>
        </ms-popup>
        <!-- popup 比例 end -->


        <!-- toast start -->
        <ms-toast :isShow="isShowToast"></ms-toast>
        <!-- toast end -->

        <!-- hint start -->
        <ms-hint :isShow="isShowHint" :isText="isShowHintText"></ms-hint>
        <!-- hint end -->

      </div>
      <!-- scroll end -->

      <!-- 底部 start -->
      <div v-if="isShowFooter">
        <ms-footer
          :isShow="isShowFooter" 
          @submit="submits"
          :monthlySupply="monthlySupply === '' ? initPaymentMoney : monthlySupply "
        ></ms-footer>
      </div>
      <!-- 底部 end -->
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from '@/utils';

import Popup from "@/components/common/popup";
import Slide from "@/components/common/slide";
import Toast from "@/components/common/toast";
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import Hint from '@/components/common/hint';

import Bystages from '@/components/root/bystages';

export default {
  name: "popup",

  data() {
    return {
      isShowToast: false,
      isShowRatioPopup: false, 
      isShowServicePopup: false,
      isShowHint: false,
      isShowHintText: '',
      paymentIndex: 0, // 首付索引
      stagesIndex: 0,  // 月供索引
      firstPayment: '',// 首付金额
      monthlySupply: '', // 月供金额
      direction: 'left',
      routerLinkPath: {
        detailsInfo: '/details?',
        detailsList: '/details/detailedlist?',
        service: '/details/service?'
      },
      isHref: '',
      initData: {
        slideImgs: [],
        detailsTextInfo: {},
        ratioData: [],
        stagingTime: []
      },
      submitData: {} // 分期popup弹层回调数据
    };
  },

  computed: {
    // 是否显示页面footer
    isShowFooter() {
      if ( this.isShowRatioPopup ) {
          return false;
      }else if ( this.isShowServicePopup ) {
          return false;
      }else {
          return true;
      }
    },
    // 获取自由路path
    getDetailsInfoPath() {
      let path = `${this.routerLinkPath.detailsInfo}channelId=${this.$route.query.channelId}&channelNum=${this.$route.query.channelNum}&categoryId=${this.$route.query.categoryId}`;
      return path;
    },
    // 获取自由路path
    getDetailsListPath() { 
      let path = `${this.routerLinkPath.detailsList}channelId=${this.$route.query.channelId}&channelNum=${this.$route.query.channelNum}&categoryId=${this.$route.query.categoryId}`;
      return path;
    },
    // 获取自由路path
    getDetailsServicePath() {
      let path = `${this.routerLinkPath.service}channelId=${this.$route.query.channelId}&channelNum=${this.$route.query.channelNum}&categoryId=${this.$route.query.categoryId}`;
      return path;
    },
    // 选项卡边框动效
    sliderActivClass() {
      if ( this.$route.meta.index === 1 ) {
        return 'location_1'
      }else if ( this.$route.meta.index === 2 ) {
        return 'location_2'
      }else {
        return 'location_3'
      }
    },
    popupImagesPath() {
      let path = this.initData.slideImgs[0].path;
      return path;
    },
    // 初始化月供金额
    initPaymentMoney() {
      // 初始化月供总额
      let ben = calc('-', parseFloat(this.initData.detailsTextInfo.price / 100), parseFloat(this.firstPayment));

      if ( this.initData.ratioData != false && this.initData.ratioData != undefined ) {
          // 初始化月供利率
          let lv = this.initData.ratioData[this.paymentIndex].financeProducts[this.stagesIndex].interest;
          // 初始化月供期限
          let qi = this.initData.ratioData[this.paymentIndex].financeProducts[this.stagesIndex].periods;//
          // 初始化月供金额
          let moon = calc('/',(calc('*',calc('*',ben,lv), Math.pow((calc('+',1,lv)),qi))),(calc('-',Math.pow((1+lv),qi),1))).toFixed(2);
          return moon;
      }else {
        return '';
      }
    }
  },

  beforeRouteEnter: (to, from, next) => {
    // 初始化数据
    next( vm => { vm._getInitData(vm) });
  },

  components: {
    msHeader: Header,
    msFooter: Footer,
    msPopup: Popup,
    msSlide: Slide,
    msToast: Toast,
    msBystages: Bystages,
    msHint: Hint
    
  },
  mounted() {
    // 监听
    this._monitor();
  },

  methods: {
    ...mapMutations({
      setDeatilsInfo: mutationTypes.DETAILS_INFO
    }),
    // 初始化数据
    _getInitData() {
      let tasks = [];
      // 商品图片列表
      tasks.push(
        this.$http(connectURL.DETAILS_IMAGES,{
          params: {
            channelId: this.$route.query.channelId,
            channelNum: this.$route.query.channelNum
          }
        })
      );
      // 商品详情信息
      tasks.push(
        this.$http(connectURL.DETAILS_INFO, {
          params: {
            channelId: this.$route.query.channelId,
            channelNum: this.$route.query.channelNum
          }
        })
      );
      this.isShowToast = true;
      const Task = Promise.all(tasks)
        .then(res => {
          this.isShowToast = false;
          const [slideImgs, detailsTextInfo] = res.map(item => {
            return item.data;
          });

          // 接口失败
          if ( slideImgs.code !== 0 ) {
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = slideImgs.message;
            return;
          }else if ( detailsTextInfo.code !== 0 ) {
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = detailsTextInfo.message;
            return;
          }

          // 获取分期数据
          this._getRatioData(detailsTextInfo.data.name, detailsTextInfo.data.jdPrice);

          // 设置详情数据
          this.initData = {
            slideImgs: slideImgs.data,
            detailsTextInfo: detailsTextInfo.data
          };
          console.log( this.initData )

          // 设置vuex数据
          const {introduction, param, wareQD} = this.initData.detailsTextInfo;
          this.setDeatilsInfo({
            introduction,
            param,
            wareQD
          });
        })
        .catch(err => {
          this.isShowToast = false;
          this.isShowHint = !this.isShowHint;
          this.isShowHintText = err.message;
          console.log("===>>数据请求错误，检查参数", err);
        });
    },
    // 初始化分期数据
    _getRatioData(name, jdPrice) {
      this.isShowToast = true;
      this.$http(connectURL.DETAILS_RATIO,{
        params: {
          price: jdPrice,
          categoryId: this.$route.query.categoryId
        }
      })
      .then( res => {
        this.isShowToast = false;
        if ( res.data.code !== 0 ) {
          this.isShowHint = !this.isShowHint;
          this.isShowHintText = res.data.message;
          return;
        };

        let data = res.data.data;
        // 首付比例整体数据
        this.initData.ratioData = data;
        // 初始化分期月数
        this.initData.stagingTime = data[0].financeProducts;
        // 初始化首付金额
        let firstPayment = calc('*', (jdPrice / 100) ,data[0].downPayment).toFixed(2);
        this.firstPayment = firstPayment;

      })
      .catch( err => {
        this.isShowToast = false;
        this.isShowHint = !this.isShowHint;
        this.isShowHintText = err.message;
        console.log( '获取分期接口请求错误===>>', err )
      })
    },
    // 显示服务popup
    _handleServicePopup() {
      this.isShowServicePopup = true;
    },
    // 监听
    _monitor() {
      let _this = this;
      // 监听详情月供金额
      bus.$on('monthlySupply', function (data, result) {
        let datas = {
          "channelId": _this.$route.query.channelId,
          "channelNum": _this.$route.query.channelNum,
          "productNum": '1',
          "categoryId": _this.$route.query.categoryId,
          "fenqiNum": result.fenqiNum,
          "fenqiPersent": result.fenqiPersent,
          "shoufuPersent": result.shoufuPersent,
          "fenqiId": result.fenqiId,
          "img": result.img,
          "jdPrice": result.jdPrice * 100,
          "title": result.title
        }

        _this.isHref = `bglife://app?action=1&data=${JSON.stringify(datas)}`;
        console.log( _this.isHref )

        _this.monthlySupply = data;
      });
      // 监听开启比例popup
      bus.$on(busType.OPEN_POPUP_RATIO, function() {
        this.isShowRatioPopup = true;
        }.bind(this)
      );
      // 监听关闭比例popup
      bus.$on(busType.CLOSE_POPUP_RATIO, function() {
        this.isShowRatioPopup = false;
        }.bind(this)
      );

      // 监听开启服务popup
      bus.$on(busType.OPEN_POPUP_SERVICE, function() {
        this.isShowServicePopup = true;
        }.bind(this)
      );
      // 监听关闭服务popup
      bus.$on(busType.CLOSE_POPUP_SERVICE, function() {
        this.isShowServicePopup = false;
        }.bind(this)
      );
    },
    // 点击分期购买按钮 显示popup
    submits() {
      // 开启比例popup
      bus.$emit(busType.OPEN_POPUP_RATIO);
    },
    // 手动关闭服务弹层
    cloneServicePopup() {
      bus.$emit(busType.CLOSE_POPUP_SERVICE);
    }
  },

  filters: {
    addUS: function (val) {
      return `¥${val}`
    }
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
    },
    isShowRatioPopup(to) {  // 监听比例弹层，阻止取消默认滚动行为
        document.addEventListener('touchmove',(ev) => {
          if ( to ) {
            ev.preventDefault();    
          }else {
             ev.returnValue = true;
          }
        })
    },
    isShowServicePopup(to) { // // 监听服务弹层，阻止取消默认滚动行为
        document.addEventListener('touchmove',(ev) => {
          if ( to ) {
            ev.preventDefault();    
          }else {
             ev.returnValue = true; 
          }
        })
    }
  }
};
</script>

<style lang="less" src="./index.less">

</style>