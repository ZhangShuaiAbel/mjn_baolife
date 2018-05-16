/*
    * userId 3589796
    * 详情页 http://192.168.88.237:8083/details?channelId=3133859&channelNum=0&categoryId=1 
    * 授信页 http://192.168.88.237:8083/credit?userId=3589733
    * 授信结果页 http://192.168.88.237:8083/creditresults
    * 万能卡入口页 http://192.168.88.237:8083/universalcard?userId=3589733
    * 万能卡详情页 http://192.168.88.237:8083/universalcarddetails
    * 中间静态页(攻略) http://192.168.88.237:8083/raiders


    * 卡券入口 http://192.168.88.237:8083/card?userId=3589699
    * 我发布的 http://192.168.88.237:8083/sale?userId=3589699
    * 卖了换钱 http://192.168.88.237:8083/sellcard?cashCardId=1
    * 资金流向 http://192.168.88.237:8083/sale/fundFlow?cashCardId=1&userId=3589699
    * 卖了换钱发布结果 http://192.168.88.237:8083/sellcard/esult?cashCardId=1
    *
    * 银行卡认证(绑卡) http://192.168.88.148:8083/tiedcard?userId=57865&realName=张帅帅
    * 银行卡列表 http://192.168.88.148:8083/bankcard?userId=57865&realName=张帅帅

    * 个人信息页 http://192.168.88.237:8083/information?userId=383375 @帅帅

    * 消息 /news

    * 支付成功 /success?status=pay 
    * 绑定成功 /success?status=bind?userId=57865&realName=张帅帅

    * 协议
    * 注册协议 /agreementZhuce
    * 转卖协议 /agreementZhuanmai
    * 消费分期服务 /agreementXiaofei
    * 提供担保协议（安永） /agreementDanbao
    * 借款服务协议（金融服务商-客户） /agreementJiekuan
    * 购物合同（商贸公司A-客户） /agreementGouwu
    * 个人授权  /agreementShouquan
    * 代扣协议  /agreementDaikou
    * CA 个人数字证书授权委托书   /agreementCA
*/ 

// 详情页 @匡
    // import Details from '@/views/details/index.vue';
    // 
    // 详情默认子路由1 @匡
    // import Detailsinfo from '@/views/details/children/detailsinfo/index.vue';
    // 详情子路由2 包装清单 @匡
    // import Detailedlist from '@/views/details/children/detailedlist/index.vue';
    // 详情子路由2 售后服务 @匡
    // import Service from '@/views/details/children/service/index.vue'; 

    // 授信列表 @匡
    // import Credit from '@/views/credit/index.vue';
    // 授信结果 @匡
    // import Creditresults from '@/views/credit/children/creditresults/index.vue';

    // 万能卡
    // native banner 主入口 列表页 @匡
    //import Universalcard from '@/views/universalcard/index.vue';
    // 万能卡详情页 @匡
    //import Universalcarddetails from '@/views/universalcard/children/universalcarddetails/index.vue';

    // 中间静态页(借款攻略) @匡
    // import Raiders from '../views/raiders/index.vue';

    // 银行卡认证 绑卡 @帅帅
    // import TiedCard from '@/views/tiedCard/index.vue';
    //消息  @魏辉
    // import News from '@/views/news/index.vue';

    // 个人信息 @帅帅
    // import Information from '@/views/information/index.vue';

    // 银行卡 @帅帅
    // import Bankcard from '@/views/bankcard/index.vue';
    //银行卡--储蓄卡 @帅帅
    // import Cashcard from '@/views/bankcard/children/cashcard/index.vue'; 
    //银行卡--信用卡 @帅帅
    // import Creditcard from '@/views/bankcard/children/creditcard/index.vue';

    // 卡券入口 @魏辉
    // import Card from '@/views/card/index.vue'; 
    // 卡券默认子路由 购物卡 @魏辉
    // import Shopping from '@/views/card/children/shopping/index.vue';
    // 卡券子路由 优惠券 暂无内容 @魏辉
    // import Discount from '@/views/card/children/discount/index.vue';

    // 我发布的入口 @魏辉
    // import Sale from '@/views/sale/index.vue';
    // 我发布的默认子路由 我发布的列表 @魏辉
    // import SaleIndex from '@/views/sale/children/saleIndex/index.vue';
    // 我发布的默认子路由 资金流向 @魏辉
    // import FundFlow from '@/views/sale/children/fundFlow/index.vue';


    // 卖了换钱入口 @魏辉
    // import Sellcard from '@/views/sellcard/index.vue';
    // 卖了换钱 默认子路由一键售卖 @魏辉
    // import SellcardIndex from '@/views/sellcard/children/sellcardIndex/index.vue';
    // 卖了换钱 子路由 卖了结果 @魏辉
    // import Esult from '@/views/sellcard/children/esult/index.vue';

    //  协议路由 @魏辉
    // 注册
    // import AgreementZhuce from '@/views/agreement/zhuce.vue';
    //转卖 （卖了换钱）
    // import AgreementZhuanmai from '@/views/agreement/zhuanmai.vue';
    //消费分期服务
    // import AgreementXiaofei from '@/views/agreement/xiaofei.vue';
    //提供担保协议（安永）
    // import AgreementDanbao from '@/views/agreement/danbao.vue';
    //借款服务协议（金融服务商-客户）
    // import AgreementJiekuan from '@/views/agreement/jiekuan.vue';
    //购物合同（商贸公司A-客户）
    // import AgreementGouwu from '@/views/agreement/gouwu.vue';
    //个人授权协议 
    // import Shouquan from '@/views/agreement/shouquan.vue';
    //代扣协议
    // import Daikou from '@/views/agreement/daikou.vue';
    //CA 个人数字证书授权委托书
    // import CA from '@/views/agreement/cA.vue';

    // 支付成功与绑卡成功  @匡
    // import Success from '@/views/sucess/index.vue';


    // 帮助中心 
    // import Help from '@/views/help/index.vue';
    //关于包公生活
    // import Absout from '@/views/absout/index.vue';
    //户外运动
    // import OutdoorSports from '@/views/outdoorSports/index.vue';

    // 邀请好友
// import Invitation from '@/views/invitation/index.vue';

const routes = [
    {  // 详情页
        path: '/details',
        // 详情页 '@/views/details/index.vue'; @匡
        component: resolve => require(['@/views/details/index.vue'], resolve),
        children: [
            {
                path: '',
                name: 'Detailsinfo',
                meta: {
                    index: 1,
                    title: '商品详情'
                },
                // 详情默认子路由1 '@/views/details/children/detailsinfo/index.vue' @匡
                component: resolve => require(['@/views/details/children/detailsinfo/index.vue'], resolve)
            },
            {
                path: 'detailedlist',
                name: 'Detailedlist',
                meta: {
                    index: 2,
                    title: '商品详情'
                },
                // 详情默认子路由2 '@/views/details/children/detailedlist/index.vue' @匡
                component: resolve => require(['@/views/details/children/detailedlist/index.vue'], resolve)
            },
            {
                path: 'service',
                name: 'Service',
                meta: {
                    index: 3,
                    title: '商品详情'
                },
                // 详情默认子路由3 '@/views/details/children/service/index.vue' @匡
                component: resolve => require(['@/views/details/children/service/index.vue'], resolve)
            }
        ]
    },
    {  // 支付成功与绑卡成功
        path: '/success',
        meta: {
            title: '支付成功'
        },
        // 支付成功与绑卡成功 '@/views/sucess/index.vue'
        component: resolve => require(['@/views/sucess/index.vue'], resolve)
    },
    {  // 授信列表
        path: '/credit',
        meta: {
            title: '授信中心'
        },
        // 授信列表 '@/views/credit/index.vue'
        component: resolve => require(['@/views/credit/index.vue'], resolve)
    },
    { // 授信结果
        path: '/creditresults',
        meta: {
            title: '额度结果'
        },
        // 授信结果 '@/views/credit/children/creditresults/index.vue'
        component: resolve => require(['@/views/credit/children/creditresults/index.vue'], resolve)
    },
    {  // 卡券入口
        path: '/card',
        meta: {
            title: 'card'
        },
        // 卡券入口 '@/views/card/index.vue'; 
        component: resolve => require(['@/views/card/index.vue'], resolve),
        children: [
            { // 卡券子路由购物卡
                path: '',
                name: 'Shopping',
                meta: {
                    index: 1,
                    title: '我的卡券'
                },
                // 卡券子路由购物卡 '@/views/card/children/shopping/index.vue'
                component: resolve => require(['@/views/card/children/shopping/index.vue'], resolve)
            },
            { // 卡券子路由购物券
                path: 'discount',
                name: 'Discount',
                meta: {
                    index: 2,
                    title: '优惠券'
                },
                // 卡券子路由购物券 '@/views/card/children/discount/index.vue'
                component: resolve => require(['@/views/card/children/discount/index.vue'], resolve)
            }
        ]
    },
    {  // 银行卡入口
        path: '/bankcard',
        meta: {     
            title: '银行卡'
        },
        // 银行卡入口 '@/views/bankcard/index.vue';
        component: resolve => require(['@/views/bankcard/index.vue'], resolve),
        children: [
            { // 储蓄卡
                path: '',
                name: 'Cashcard',
                meta: {
                    index: 1,
                    title: '银行卡'
                },
                // 储蓄卡 '@/views/bankcard/children/cashcard/index.vue'
                component: resolve => require(['@/views/bankcard/children/cashcard/index.vue'], resolve)
            },
            { // 信用卡
                path: 'creditcard',
                name: 'Creditcard',
                meta: {
                    index: 2,
                    title: '银行卡'
                },
                // 信用卡 '@/views/bankcard/children/creditcard/index.vue'
                component: resolve => require(['@/views/bankcard/children/creditcard/index.vue'], resolve)
            }
        ]
    },
    { // 借款攻略
        path: '/raiders',
        name: 'Raiders',   
        meta: {
            title: '资讯'
        },
        // 借款攻略 '@/views/raiders/index.vue'
        component: resolve => require(['@/views/raiders/index.vue'], resolve)
    },
    { // banner文案
        path: '/raiders/banner',
        name: 'Banner',   
        meta: {
            title: '资讯详情'
        },
        component: resolve => require(['@/views/raiders/banner.vue'], resolve)
    },
    { // 文案1
        path: '/raiders/text1',
        name: 'Text1',   
        meta: {
            title: '资讯详情'
        },
        component: resolve => require(['@/views/raiders/text1.vue'], resolve)
    },
    { // 文案1
        path: '/raiders/text2',
        name: 'Text2',   
        meta: {
            title: '资讯详情'
        },
        component: resolve => require(['@/views/raiders/text2.vue'], resolve)
    },
    {  // 注册协议
        path: '/agreementZhuce',
        name: 'AgreementZhuce',
        meta: {
            title: '注册协议'
        },
        // 注册协议 '@/views/agreement/zhuce.vue'
        component: resolve => require(['@/views/agreement/zhuce.vue'], resolve)
    },
    {  // 注册协议 暂留
        path: '/agreementZhuce1',
        name: 'AgreementZhuce1',
        meta: {
            title: '注册协议'
        },
        // 注册协议 '@/views/agreement/zhuce.vue'
        component: resolve => require(['@/views/agreement/zhuce1.vue'], resolve)
    },
    {  // 卖了换钱协议
        path: '/agreementZhuanmai',
        name: 'AgreementZhuanmai',
        meta: {
            title: '转卖协议'
        },
        // 卖了换钱协议 '@/views/agreement/zhuanmai.vue'
        component: resolve => require(['@/views/agreement/zhuanmai.vue'], resolve)
    },
    {  // 消费分期服务
        path: '/agreementXiaofei',
        name: 'AgreementXiaofei',
        meta: {
            title: '消费分期服务协议'
        },
        // 消费分期服务 '@/views/agreement/xiaofei.vue'
        component: resolve => require(['@/views/agreement/xiaofei.vue'], resolve)
    },
    {  // 提供担保协议（安永）
        path: '/agreementDanbao',
        name: 'AgreementDanbao',
        meta: {
            title: '提供担保协议'
        },
        // 提供担保协议（安永） '@/views/agreement/danbao.vue'
        component: resolve => require(['@/views/agreement/danbao.vue'], resolve)
    },
    {  // 借款服务协议（金融服务商-客户）
        path: '/agreementJiekuan',
        name: 'AgreementJiekuan',
        meta: {
            title: '借款服务协议'
        },
        // 借款服务协议（金融服务商-客户） '@/views/agreement/jiekuan.vue'
        component: resolve => require(['@/views/agreement/jiekuan.vue'], resolve)
    },
    {  // 购物协议
        path: '/agreementGouwu',
        name: 'AgreementGouwu',
        meta: {
            title: '购物合同'
        },
        // 购物协议 '@/views/agreement/gouwu.vue'
        component: resolve => require(['@/views/agreement/gouwu.vue'], resolve)
    },
    {  // 个人授权协议
        path: '/agreementShouquan',
        name: 'Shouquan',
        meta: {
            title: '个人授权协议'
        },
        // 个人授权协议 '@/views/agreement/shouquan.vue'
        component: resolve => require(['@/views/agreement/shouquan.vue'], resolve)
    },
    {  // 个人授权协议  暂留
        path: '/agreementShouquan1',
        name: 'Shouquan1',
        meta: {
            title: '个人授权协议'
        },
        // 个人授权协议 '@/views/agreement/shouquan.vue'
        component: resolve => require(['@/views/agreement/shouquan1.vue'], resolve)
    },
    {  // 代扣协议
        path: '/agreementDaikou',
        name: 'Daikou',
        meta: {
            title: '代扣协议'
        },
        // 代扣协议 '@/views/agreement/daikou.vue'
        component: resolve => require(['@/views/agreement/daikou.vue'], resolve)
    },
    {  // CA 个人数字证书授权委托书
        path: '/agreementCA',
        name: 'CA',
        meta: {
            title: '个人数字证书授权委托书'
        },
        // CA 个人数字证书授权委托书 '@/views/agreement/cA.vue'
        component: resolve => require(['@/views/agreement/cA.vue'], resolve)
    },
    {  // APP banner 链接包公生活公众号
        path: '/banner',
        name: 'Banner',
        meta: {
            title: '包公生活公众号'
        },
        component: resolve => require(['@/views/agreement/banner.vue'], resolve)
    },
    {  // 万能卡 native banner 入口  @/views/universalcard/index.vue
        path: '/universalcard',
        meta: {
            title: '万能卡专区'
        },
       // 万能卡 native banner 入口  '@/views/universalcard/index.vue'
       component: resolve => require(['@/views/universalcard/index.vue'], resolve)
    },
    { // 万能卡详情页  
        path: '/universalcarddetails',
        meta: {
            title: '商品详情'
        },
       // 万能卡详情页 @/views/universalcard/children/universalcarddetails/index.vue
       component: resolve => require(['@/views/universalcard/children/universalcarddetails/index.vue'], resolve)
    },
    { // 帮助中心
        path: '/help',
        name: 'Help',
        meta: {
            title: '帮助中心'
        },
        // 帮助中心 '@/views/help/index.vue'
        component: resolve => require(['@/views/help/index.vue'], resolve)
    },
    { // 帮助中心
        path: '/about',
        name: 'About',
        meta: {
            title: '关于我们'
        },
        component: resolve => require(['@/views/about/index.vue'], resolve)
    },
    { // 卖了换钱入口 
        path: '/sellcard',
        meta: {
            index: 1,
            title: '一键售卖'
        },
        // 卖了换钱入口 '@/views/sellcard/index.vue'
        component: resolve => require(['@/views/sellcard/index.vue'], resolve),
        children: [
            { // 卖了换钱默认子路由一键售卖
                path: '',
                name: 'SellcardIndex',
                meta: {
                    title: '一键售卖'
                },
                // 卖了换钱默认子路由一键售卖 '@/views/sellcard/children/sellcardIndex/index.vue'
                component: resolve => require(['@/views/sellcard/children/sellcardIndex/index.vue'], resolve)
            },
            { // 卖了换钱默认子路由卖了结果
                path: 'esult',
                name: 'Esult',
                meta: {
                    title: '发布结果'
                },
                // 卖了换钱默认子路由卖了结果 '@/views/sellcard/children/esult/index.vue'
                component: resolve => require(['@/views/sellcard/children/esult/index.vue'], resolve)
            }
        ]
        
    },
    { // 个人信息 @帅帅
        path: '/information',
        name: 'Information',
        meta: {
            index: 1,
            title: '个人信息'
        },
        // 个人信息 '@/views/information/index.vue'
        component: resolve => require(['@/views/information/index.vue'], resolve),
    },
    { // 邀请好友
        path: '/invitation',
        meta: {
            index: 1,
            title: '邀请好友'
        },
        component: resolve => require(['@/views/invitation/index.vue'], resolve),
        children: [
            {
                path: 'invitation',
                name: 'InvitationIndex',
                meta: {
                    title: '邀请好友'
                },
                component: resolve => require(['@/views/invitation/children/invitation/index.vue'], resolve)
 
            },
            {
                path: 'download',
                name: 'Download',
                meta: {
                    title: '下载包公生活APP'
                },
                component: resolve => require(['@/views/invitation/children/download/index.vue'], resolve)
            },
            {
                path: 'register',
                name: 'Register',
                meta: {
                    title: '注册'
                },
                component: resolve => require(['@/views/invitation/children/register/index.vue'], resolve)
            },
            {
                path: 'shouquan1',
                name: 'Shouquan1',
                meta: {
                    title: '注册协议'
                },
                component: resolve => require(['@/views/invitation/children/xieyi/index.vue'], resolve)
            }

        ]
        
    },
    { // 我发布的入口
        path: '/sale',
        meta: {
            title: '我发布的'
        },
        // 我发布的入口 '@/views/sale/index.vue'
        component: resolve => require(['@/views/sale/index.vue'], resolve),
        children: [
            { // 我发布的默认子路由发布列表
                path: '',
                name: 'SaleIndex',
                meta: {
                    title: '我发布的'
                },
                // 我发布的默认子路由发布列表 '@/views/sale/children/saleIndex/index.vue'
                component: resolve => require(['@/views/sale/children/saleIndex/index.vue'], resolve)
            },
            { // 我发布的子路由资金流向
                path: 'fundFlow',
                name: 'FundFlow',
                meta: {
                    title: '资金流向'
                },
                // 我发布的子路由资金流向 '@/views/sale/children/fundFlow/index.vue'
                component: resolve => require(['@/views/sale/children/fundFlow/index.vue'], resolve)
            }
            
        ]
    },
    { // 银行卡认证 @帅帅
        path: '/tiedCard',
        name: 'TiedCard',
        meta: {
            title: '银行卡认证'
        },
        // 银行卡认证 '@/views/tiedCard/index.vue'
        component: resolve => require(['@/views/tiedCard/index.vue'], resolve)
    },
    { // 消息 @魏辉
        path: '/news',
        name: 'News',
        meta: {
            title: '消息'
        },
        // 消息 '@/views/news/index.vue'
        component: resolve => require(['@/views/news/index.vue'], resolve)
    }, 
    { // 户外运动 
        path: '/outdoorSports',
        name: 'OutdoorSports',
        meta: {
            title: ''
        },
        // 户外运动 '@/views/outdoorSports/index.vue'
        component: resolve => require(['@/views/outdoorSports/index.vue'], resolve)
    },   
    // {   
    //     path: '*', 
    //     // redirect: '/details'
    //     redirect: function (to) {
    //         if ( to.path === '/details' ) { // 详情
    //             return '/details'
    //         }else if ( to.path === '/credit' ) { // 授信列表
    //             return '/credit'
    //         }else if (  to.path === '/creditresults' ) { //  授信结果 
    //             return '/creditresults'
    //         }else if ( to.path === '/card' ) { // 卡券入口列表
    //             return '/card'
    //         }else if ( to.path === '/universalcard' ) { // 万能卡入口 列表页
    //             return '/universalcard'
    //         }else if ( to.path === '/universalcarddetails' ) { // 万能卡详情页
    //             return '/universalcarddetails'
    //         }else if ( to.path === '/bankcard' ) { // 银行卡列表
    //             return '/bankcard'
    //         }else if ( to.path === '/information' ) { // 个人信息
    //             return '/information'
    //         }else if ( to.path === '/sellcard' ) { // 卖了换钱
    //             return '/sellcard'
    //         }else if ( to.path === '/sale' ) { // 我发布的
    //             return '/sale'
    //         }else if ( to.path === '/tiedCard' ) { // 银行卡认证
    //             return '/tiedCard'
    //         }else if ( to.path === '/success' ) { // 支付成功页
    //             return '/Success'  
    //         }else if ( to.path === '/help' ) { // 帮助中心
    //             return '/help'  
    //         }else if ( to.path === '/news' ) { // 消息
    //             return '/news'  
    //         }else if ( to.path === '/absout' ) { // 关于包公生活
    //             return '/absout'  
    //         }else if ( to.path === '/outdoorSports' ) { // 户外运动
    //             return '/outdoorSports'  
    //         }
            
    //     }
    // }
    
]

export default routes;
