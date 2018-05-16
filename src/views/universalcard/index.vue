<template>
    <div class="universal_card">
        <div class="universal_card_content">
            <div 
                class="banner" 
                :style="{ background: 'url(' + initData.banner.src + ')' + 'center center no-repeat' }"
            ></div>
            <div class="back_title"></div>
            <div class="content_wrap">
                <div 
                    class="content_wrap_item"
                    v-for="(item, index) in initData.list"
                    :key="index"
                > 
                    <div 
                        class="item_images"
                        :style="{ background: 'url(' + item.bannerUrl + ')' + 'center center no-repeat' }"
                        @click="bandleBtn(item.id)"
                    ></div>
                    <div class="item_button" @click="bandleBtn(item.id)">
                        <span>点击购买</span>
                        <i class="fa fa-angle-right"></i>
                    </div>
                </div>
            </div>

            <div class="advantage">
                <div class="advantage_images"></div>
            </div>
        </div>

        <ms-hint :isShow="isShowHint" :isText="isHintText"></ms-hint>

        <!-- toast start -->
        <ms-toast :isShow="isShowToast"></ms-toast>
        <!-- toast end -->
    </div>
</template>

<script>
import Toast from "@/components/common/toast";
import Hint from '../../components/common/hint';
import * as connectURL from "@/http/common/connectURL";

export default {
    name: 'universalcard',

    data() {
        return {
            isShowToast: false,
            isShowHint: false,
            isHintText: '',
            initData: {
                banner: {},
                list: []
            }
            
        }
    },

    beforeRouteEnter(to, from, next) {
        next( vm => {vm._getInitData()} )
    },

    mounted() {},

    components: {
        msToast: Toast,
        msHint: Hint
    },

    methods: {
        _getInitData() {
            this.isShowToast = true;
            let task = [];
            // banner 接口
            task.push(
                this.$http(connectURL.UNIVERSAL_CARD_BANNER, {
                    params: {
                        bannerType: 2
                    }
                })
            );
            // item 接口
            task.push(this.$http(connectURL.UNIVERSAL_CARD_LIST));
            // request all
            Promise.all(task)
            .then((res) => {
                this.isShowToast = false;
                let [banner, list] = res.map((item) => {
                    return item.data;
                });

                if ( banner.code !== 0 ) {
                    this.isShowHint = !this.isShowHint;
                    this.isHintText = banner.message;
                    return;
                }else if ( list.code !== 0 ) {
                    this.isShowHint = !this.isShowHint;
                    this.isHintText = list.message;
                    return;
                }

                this.initData = {
                    banner: banner.data[0],
                    list: list.data
                }
                console.log( this.initData )
            })
            .catch((err) => {
                this.isShowToast = false;
                this.isShowHint = !this.isShowHint;
                this.isHintText = err.message;
                console.log( '请求错误===>>请检查参数',err )
            })
        },
        bandleBtn(id) {
            this.$router.push(`./universalcarddetails?userId=${this.$route.query.userId}&id=${id}`);
        } 
    }
}
</script>

<style lang="less" src="./index.less"> </style>