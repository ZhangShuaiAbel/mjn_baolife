<template>
    <div class="universal_details">
        <iframe v-if="isShowiframe" src="javascript:;" width="1" height="1" ref="iframe"></iframe>
        
        <div class="universal_detail_wrap">
                <div class="content">
                    <div class="top">
                        <div class="banner">
                            <div class="src" :style="{ background: 'url(' + initData.bannerUrl + ')' + 'center center no-repeat' }" >
                                <div :class="$route.query.id == 2 ? 'revore' : 'revore2'"></div>
                            </div>
                        </div>
                        <div 
                            class="info" 
                            v-for="(item, index) in initData.listBanner"
                            :key="index"
                        >
                            <div class="title">{{item.title}}</div>
                            <div class="price">
                                <span class="before">￥</span>
                                {{initData.amount / 100}}
                            </div>
                        </div>
                    </div>

                    <img 
                        class="bottom"
                        v-for="(item, index) in initData.listBanner"
                        :key="index"
                        :src="item.src"
                        width="100%"
                    />
                </div>

                <ms-popup :isShow="isShowPopup">
                    <div class="wanneng_popup">
                        <!-- 比例title img -->
                        <div class="radio_top">
                            <div v-if="initData.bannerUrl" class="radio_top_image" >
                                <div 
                                    class="image" 
                                    :style="{ background: 'url(' + initData.bannerUrl + ')' + 'center center no-repeat' }"
                                ></div>
                            </div>
                            <div class="radio_top_info">
                                <P class="radio_top_title">{{initData.name}}</P>
                                <P class="radio_top_price">{{ initData.amount / 100 | addUS}}</P>
                            </div>
                        </div>

                        <div class="radio_content">
                            <!-- 首付比例 -->
                            <div class="radio_content_ratio">
                                <P class="ratio_title">首付比例</P>
                                <ul class="ratio_content">
                                <li 
                                    v-for="(item,index) in [1]"
                                    :key="index"
                                    class="ratio_item ratio_item_active"
                                >0首付</li>
                                </ul>
                            </div>
                            <!-- 分期月数 -->
                            <div class="radio_content_months">
                                <p class="months_title">天数</p>
                                <ul class="months_content">
                                <li 
                                    :class="stagesIndex === index ? 'months_item months_item_active' : 'months_item'"
                                    v-for="(item, index) in initData.listWalletProduct"
                                    :key="index"
                                    @click="handleMounth(index)"
                                >{{item.period}}</li>
                                </ul>
                            </div>
                            <div class="radio_agreement">
                                <div class="radio_agreement_content">
                                    <div class="title">点击立即下单即代表已同意相关协议并下单购买</div>
                                    <div class="agreement">
                                        <span 
                                            v-for="(item, index) in agreementData"
                                            :key="index"
                                            @click="handleAgreement(item.id)"
                                        >{{item.name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 首付，月供金额 与底部样式一致 -->
                        <div class="footer_wrap_2">
                            <div class="current_footer_2">
                                <div class="left">
                                    <span>到期应还金额</span>
                                    <span class="price">{{initAllAmount | addUS}}</span>
                                </div>
                                <div class="right" @click="send">立即下单</div>
                            </div>
                        </div>
                    </div>
                </ms-popup>

                <ms-toast :isShow="isShowToast"></ms-toast>

                <ms-hint :isShow="isShowHint" :isText="isText"></ms-hint>
        </div>
        <div class="footer_wrap_1" v-if="!isShowPopup">
            <ms-footer :isShowContent="false" :isShow="!isShowPopup">
                <div class="current_footer_1" :isShow="!isShowPopup">
                    <div class="left">
                        <span>到期应还金额</span>
                        <span class="price">{{initAllAmount | addUS}}</span>
                    </div>
                    <div class="right" @click="showPopup">分期购买</div>
                </div>
            </ms-footer>
        </div>
        
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import Toast from "@/components/common/toast";
import * as connectURL from "@/http/common/connectURL";
import { calc } from '@/utils';
import {bus, busType} from '@/bus';
import Footer from '@/components/common/footer';
import Popup from "@/components/common/popup";
import Hint from '@/components/common/hint';

export default {
    name: 'universal_details',

    data() {
        return {
            isShowToast: false,
            isShowHint: false,
            isText: '',
            isShowiframe: false,
            isShowPopup: false,
            isSend: true,
            stagesIndex: 0,
            initData: {},
            agreementData: [
                {
                    name: '《购物合同》',
                    id: 'gouwu'
                }, 
                {
                    name: '《借款协议》',
                    id: 'jiekuan'
                },
                {
                    name: '《担保协议》',
                    id: 'danbao'
                },
                {
                    name: '《分期协议》',
                    id: 'fenqi'
                }
            ]
        }
    },

    computed: {
        // 初始化到期应还金额
        initAllAmount() {
            if ( this.initData.amount ) {
              let result = calc('+', this.initData.amount, calc('*', this.initData.amount, this.initData.listWalletProduct[this.stagesIndex].rate)) / 100;
              return result.toFixed(2);
            }else {
                return 0;
            }
        }
    },

    beforeRouteEnter: (to, from, next) => {
        next( vm => {
            vm._gitInitData();
            // 进入可点击
            vm.isSend = true;
            // 进入iframe隐藏
            vm.isShowiframe = false; 
        })
    },

    mounted() {
        // 监听
        this._monitor();
    },

    components: {
        msToast: Toast,
        msFooter: Footer,
        msPopup: Popup,
        msHint: Hint
    },

    methods: {
        _gitInitData() {
            this.isShowToast = true;
            this.$http(connectURL.UNIVERSAL_DETAILS, {
                params: {
                    productId: this.$route.query.id
                }
            })
            .then( res => {
                // 失败
                if ( res.data.code !== 0 ) {
                    this.isShowHint = !this.isShowHint;
                    this.isText = res.data.message;
                    return;
                }

                this.isShowToast = false;
                this.initData = res.data.data;
                
                console.log( this.initData )
            })
            .catch( err => {
                this.isShowToast = false;
                this.isShowHint = !this.isShowHint;
                this.isText = err.message;
                console.log( '请求错误===>>请检查参数',err )
            })
        },
        // 显示万能卡弹层
        showPopup() {
            this.isShowPopup = true;
        },
        // 弹层中提交按钮
        send() {
            // 如果没有userId 没有登录 跳转客户端
            if ( this.$route.query.userId === 'undefined' ) {
                this.isShowHint = !this.isShowHint;
                this.isText = '请前往用户中心登录！';
                this.isSend = true;
                return;
            }

            if ( !this.isSend ) return;
            // 请求万能卡额度购买参数集合
            let currentParams = this.initData.listWalletProduct[this.stagesIndex];
            this.isShowToast = true;
            this.$http(connectURL.UNIVERSAL_SHOPING, {
                params: {
                    userId: this.$route.query.userId,
                    productId: this.$route.query.id,
                    period: currentParams.period
                }
            })
            .then(res => {
                this.isShowToast = false;
                this.isSend = false;
                console.log( res );

                // 失败
                if ( res.data.code !== 0 ) {
                    this.isShowHint = !this.isShowHint;
                    this.isText = res.data.message;
                    setTimeout(function() {
                        this.isShowiframe = true;
                        this.$nextTick(() => {
                            // 失败触发native
                            this.$refs.iframe.src = `bglife://app?action=14`;
                        });
                    }.bind(this),1000)
                }else {
                    this.isShowHint = !this.isShowHint;
                    this.isText = res.data.message;
                    
                    setTimeout(function() {
                        this.isShowiframe = true;
                        this.$nextTick(() => {
                            // 成功后调取native 订单详情
                            this.$refs.iframe.src = `bglife://app?action=10&data={"orderId":${res.data.data.cashCardId},"productType":${res.data.data.productType}}`;
                        });
                    }.bind(this),1000)
                }
            })
            .catch(err => {
                this.isShowToast = false;
                this.isShowHint = !this.isShowHint;
                this.isText = err.message;
                this.isSend = true;
                console.log("===>>数据请求错误，检查参数", err);
            });
        },
        _monitor() {
            let _this = this;
            // 监听关闭万能卡popup弹层
            bus.$on(busType.ClOSE_WANNENG_POPUP, function() {
                _this.isShowPopup = false;
            });
        },
        // 改变月数
        handleMounth(index) {
            this.stagesIndex = index;
        },
        // 触发协议
        handleAgreement(id) {
            // 关闭弹层，关闭取消默认滚动行为
            if ( this.isShowPopup ) {
                this.isShowPopup = false;
            }
            // 渲染后跳转
            this.$nextTick(() => {
                if ( id === 'gouwu' ) { // 购物协议
                    this.$router.push('./agreementGouwu');
                }else if ( id === 'jiekuan' ) { // 借款协议
                    this.$router.push('./agreementJiekuan');
                }else if ( id === 'danbao' ) { // 担保协议
                    this.$router.push('./agreementDanbao');
                }else if ( id === 'fenqi' ) { // 分期协议
                    this.$router.push('./agreementXiaofei');
                }else {
                    return;
                }
            })
        }
    },

    filters: {
        addUS: function (val) {
            let result = `￥${parseFloat(val).toFixed(2)}`;
            return result;
        }
    },
    watch: {
        // 监听弹层显示隐藏
        isShowPopup(to) {
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

<style lang="less" src="./index.less" scoped> </style>