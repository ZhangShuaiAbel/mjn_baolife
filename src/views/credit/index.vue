<template>
    <div class="credit">
        <div class="scroll_wrap" ref="scroll">
            <div class="scroll_center">
                <ms-panel
                    title="基础认证"
                    :isShow="dataList.jichu != false"
                    :dataSource="dataList.jichu"
                ></ms-panel>
                <ms-panel
                    title="必要认证"
                    :isShow="dataList.biyao != false"
                    :dataSource="dataList.biyao"
                ></ms-panel>
                <ms-panel
                    title="增额授信"
                    :isShow="dataList.xuanze != false"
                    :dataSource="dataList.xuanze"
                ></ms-panel>
            </div>
        </div>
        

        <ms-footer :isShowContent="false" :isShow="true" @click.native="jumpResult">
            <div class="submit">提交申请</div>
        </ms-footer>
        <ms-toast :isShow="isShowToast"></ms-toast>

        <ms-hint :isShow="isShowHint" :isText="isText"></ms-hint>
    </div>
</template>

<script>

import Bscroll from "better-scroll";
import * as connectURL from "@/http/common/connectURL";
import Toast from "@/components/common/toast";
import panel from '@/components/common/panel';
import Footer from '@/components/common/footer';
import Hint from '@/components/common/hint';
export default {
    name: 'credit',

    data() {
        return {
            isShowToast: false,
            isShowHint: false,
            isText: '',
            dataList: {
                jichu: [],
                biyao: [],
                xuanze: []
            }
        }
    },

    components: {
        'msPanel': panel,
        'msToast': Toast,
        'msFooter': Footer,
        'msHint': Hint
    },

    beforeRouteEnter: (to, from, next) => {
        // 初始化数据
        next((vm) => { vm._getInitData() })
    },

    mounted() {
        this.$nextTick(() => {
            // 初始化scroll
            this._initScroll();
        });
    },

    methods: {
        _getInitData() {
            let userId = this.$route.query.userId;
            this.isShowToast = true;
            this.$http(`${connectURL.CREDIT_LIST}?userId=${userId}`)
            .then (res => {
                this.isShowToast = false;
                
                console.log( res )

                if ( res.data.code !== 0 ) {
                    this.isShowHint = !this.isShowHint;
                    this.isText = res.data.message;
                    return;
                }

                let result = res.data.data;
                this.dataList.jichu = result.jichu;
                this.dataList.xuanze = result.xuanze;
                this.dataList.biyao = result.biyao;
                console.log( this.dataList )


            })
            .catch( err => {
                this.isShowToast = false;
                this.isShowHint = !this.isShowHint;
                this.isText = err.message;
                console.log("===>>数据请求错误，检查参数", err);
            }) 

        },
        _initScroll() {
            this.scroll = new Bscroll(this.$refs.scroll, {
                eventPassthrough: "vertical"
            });
        },
        // 跳转授信结果
        jumpResult() {
            this.isShowToast = true;
            // 评估额度接口
            this.$http(connectURL.CREDIT_EDU, {
                params: {
                    userId: this.$route.query.userId
                }
            })
            .then(res => {
                console.log(res);
                this.isShowToast = false;
                if( res.data.code === 0 ) { // 成功
                    let task = this.dataList.jichu;
                    // 筛选认证结果
                    let isFail = task.find((item,index) => {
                        if ( !item.authStatus ) { return item };
                    });

                    if ( isFail ) { // 认证失败
                        this.isShowHint = !this.isShowHint;
                        this.isText = `${isFail.authName}未认证`;
                    }else { 
                        this.$router.replace('./creditresults'); 
                    }
                }else {
                    this.isShowHint = !this.isShowHint;
                    this.isText = res.data.message;
                }
                
            })
            .catch(err => {
                this.isShowToast = false;
                this.isShowHint = !this.isShowHint;
                this.isText = err.message;
            })

        }
    }
}
</script>

<style lang="less" src="./index.less" scoped>

</style>