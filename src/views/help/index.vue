<template>
    <div class="service">
      <div class="scroll_wrap" ref="scroll">
        <div class="container">
            <div class="head">
                <div class="head_list">
                    <a href="javascript:;" @click="_openIphone">
                        <span></span>
                        <p>客服电话</p>
                    </a>
                   
                </div>
                 <div class="head_list">
                    <a href="bglife://app?action=13">
                        <span></span>
                        <p>在线客服</p>
                    </a>
                </div>
                <p class="border"></p>
            </div>

            <div v-for="(item, index) in staticData" :key="index">
                <p class="title">
                    <span></span>
                    <span v-text="item.title"></span>
                </p>
                <ul>
                    <li v-for="(subItme, subIndex) in item.items" :key="subIndex">
                        <p :class="subItme.isShow ? 'title_list' : ''" v-text="subItme.title" @click="isShowContent(index,subIndex)"></p>
                        <div class="content" :class="subItme.isShow ? 'active' : ''" v-text="subItme.content"></div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
      <ms-mask :isShow="isShowRegulation" >
          <!-- bglife://app?action=12 -->
          <div class="open_iphone">
              <p>400-180-7006</p> 
              <p>
                  <a href="javascript:;" @click="_closeIphone">取消</a>
                  <a href="tel:400-180-7006">拨打客服</a>
              </p>
          </div>
      </ms-mask>
       <!-- toast start -->
        <ms-toast :isShow="isShowToast"></ms-toast>
        <!-- toast end -->
    </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import { mapMutations } from "vuex";
import Mask from '@/components/root/mask';
import Toast from "@/components/common/toast";

import Bscroll from "better-scroll";
// ,"分期购物问题","包公万能卡问题","还款相关问题"
 
const staticData = [
    {
        title: '额度获取问题',
        items: [
            {
                title: '1.如何获取额度？',
                content: '包公生活的额度可以通过认证与授信完成。我们会根据您授信时提供的信息通过大数据分析、量化金融模型以及智能化算法，为您快速、精准地匹配额度。',
                isShow: false
            },
            {
                title: '2.获取额度需要多长时间？',
                content: '包公生活需要一定的时间来为您匹配额度，这个时间通常在30分钟左右，请您耐心等待或先前往商城挑选心仪的产品。',
                isShow: false
            },
            {
                title: '3.额度如何使用？',
                content: '分期购买商品时，会根据您的分期金额扣除相应的可用额度。当您的可用额度不足时，则需您支付相应的最低首付或补充更多授信，进行提额。',
                isShow: false
            },
            {
                title: '4.使用后的额度能恢复么？',
                content: '包公生活采用循环额度，额度使用后，当您进行还款时额度会恢复您还款金额中的本金部分。当您全部结清订单时，该订单所占用的额度会全部恢复，您可以再次使用。',
                isShow: false
            },
            {
                title: '5.申请额度需要准备哪些材料？',
                content: '包公生活的额度获取采用纯信用的获取方式。您只需本人身份证与个人基本信息即可激活额度。',
                isShow: false
            },
            {
                title: '6.额度有使用期限么？',
                content: '若您未使用额度购买任何商品，您的额度将会在1个月后过期。届时您需要补充授信项重新获取额度。',
                isShow: false
            },
            {
                title: '7.未能获取额度如何处理？',
                content: '未能获取额度即表示您的资质尚未达到我们的授额标准。您可以补充更多的提额授信项再进行尝试。',
                isShow: false
            }
        ]
    },
    {
        title: '分期购物问题',
        items: [
            {
                title: '1.分期购物的整个流程是怎样的？',
                content: '包公生活完整的购物流程如下：【选择产品】-【选择型号】-【选择首付/分期方案】-【确认订单】-【订单复审】-【支付首付】-【确认收货】。',
                isShow: false
            },
            {
                title: '2.什么是首付？',
                content: '当您所购买的商品价格超出您的可用额度时，需要您支付差额部分的首付，支付成功后我们将为您发货。',
                isShow: false
            },
            {
                title: '3.额度不足时如何处理？',
                content: '当您所购买的商品价格超出您的可用额度时，需要您支付差额部分的首付，支付成功后我们将为您发货。',
                isShow: false
            },
            {
                title: '4.如何查看商品参数？',
                content: '商品参数在商品详情页有详细的展示，请您在下单前仔细查看您想要分期购买的产品具体参数详情及配件信息。',
                isShow: false
            },
            {
                title: '5.商品有保证么？',
                content: '包公生活的商品由京东商城等优质供应商提供，均为正品行货。所有商品均能享受相应厂商提供的售后保障服务。',
                isShow: false
            },
            {
                title: '6.下单后我能修改商品的颜色型号等信息么？',
                content: '一但下单，我们无法改变您选择的颜色型号等信息。您可以通过拒收产品的方式进行退货。我们收到供货商的退货通知后，我们会立即恢复您的额度。若您已经为该订单支付首付，我们会将款项返还到您的默认银行卡。',
                isShow: false
            }
        ]
    },
    {
        title: '包公万能卡问题',
        items: [
            {
                title: '1.包公万能卡是什么？',
                content: '包公万能卡是“包公生活”平台专用的虚拟卡，共有“包公万事通卡”与“包公培训卡”两种类型。“包公万事通卡”主要提供飞机票查询，天气查询，电话查询，景区门票查询等相关服务。“包公培训卡”主要提供儿童在线教育，小学课堂指导，研究生考试培训，烹饪培训等服务。万能卡无有效期限制，购买成功后可以在包公生活平台转卖一次。',
                isShow: false
            },
            {
                title: '2.包公万能卡如何转卖？',
                content: '购买包公万能卡后，可在【个人中心】-【我的卡券】中点击【卖了换钱】按钮进行转卖。转卖最高价格可设置为原价的80%。卡券卖出情况可在【个人中心】-【我发布的】中查看。',
                isShow: false
            },
            {
                title: '3.万能卡可以调整出售价么？',
                content: '万能卡在无人下单购买时可以进行调整价格，有人下单后，将被锁定，无法调整价格。',
                isShow: false
            },
            {
                title: '4.发布后多久可以售出？',
                content: '发布的卡券预计将在24小时内售出。款项将直接通过打款到您绑定的默认储蓄卡中。请及时关注【我发布的】中的卡券状态。',
                isShow: false
            },
            {
                title: '5.万能卡转售后还需要进行还款么？',
                content: '万能卡转售后仍需您进行还款，请按时还款避免造成逾期，产生不必要的费用。',
                isShow: false
            },
            {
                title: '6.万能卡可以退货么',
                content: '包公万能卡属于虚拟卡券，不支持7日退货。一经下单，暂不支持退货。',
                isShow: false
            }
        ]
    },
    {
        title: '还款相关问题',
        items: [
            {
                title: '1.如何进行还款？',
                content: '您可以通过包公生活APP进行还款，在【我的订单】、【我要还款】、【还款计划】中均有还款入口。您可以选择多期或单期进行还款。请您提前几日主动进行还款，或保证默认储蓄卡中余额充足，避免逾期产生的额外费用。',
                isShow: false
            },
            {
                title: '2.提前还款有优惠么？',
                content: '提前还款目前没有优惠，也无需额外费用。您可以通过勾选多期还款计划进行多期还款。',
                isShow: false
            },
            {
                title: '3.如何更换银行卡还款？',
                content: '还款收银台页面可以更换还款银行卡及支付方式。如您无法更换银行卡，可以拨打客服电话400-180-7006或联系在线客服处理。',
                isShow: false
            },
        ]
    }
]

export default {
    name: "popup",
    data() {
    return {
        isShowToast: false,
        isShowRegulation:false,
        staticData
    };
  },

    computed: {},
    mounted() {
        this.$nextTick(() => {
            // 初始化scroll
            this._initScroll();
        });
    },
    components: {
     msToast: Toast,
     msMask: Mask,    
  },
  methods: {
    _initScroll() {
        this.scroll = new Bscroll(this.$refs.scroll, {
            eventPassthrough: "horizontal"
        });
    },
    _openIphone(regulationMoney) {
      this.regulationMoney= parseInt(parseFloat(regulationMoney) / 100);
      this.isShowRegulation = true;
    },
    _closeIphone(regulationMoney) {
       this.isShowRegulation = false;
    },
    isShowContent(index, subIndex) {
        this.staticData[index].items[subIndex].isShow = !this.staticData[index].items[subIndex].isShow;
    }
  },

  watch: { 
      // 监听弹层阻止默认股滚动行为
      isShowRegulation(to) {
        document.addEventListener('touchmove',(ev) => {
            if ( to ) {
                ev.preventDefault();    
            }else {
                ev.returnValue = true; 
            }
        })
      }
  }
    
}
</script> 

<style lang="less" src="./index.less" scoped>

</style>