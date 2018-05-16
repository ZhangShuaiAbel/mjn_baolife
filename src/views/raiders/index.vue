<template>
    <div class="raiders">
        <div class="raiders_wrap">

            <div class="raiders_banner_wrap" @click="handleBanner">
                <div class="banner"></div>
                <div class="title">缺钱花？急需钱？点击这里有惊喜</div>
            </div>
            <div 
                class="raiders_panel_wrap" 
                v-for="(item,index) in staticData"
                :key="index"
                @click="bandlePanel(item.url)"
            >
                <div class="left">
                    <div class="left_title">{{item.title}}</div>
                    <div class="left_date">{{item.date}}</div>
                </div>
                <div class="right" :class="'raiders_subbanner_'+index"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'raiders',
    data() {
        return {
            staticData: [
                {
                    title: '十个技巧让你的芝麻分涨涨到800+',
                    date: '2017.11.19',
                    url: 'http://mp.weixin.qq.com/s/mwj1grConEzOfMUXe6652Q'
                },
                {
                    title: '负债多=能力大？越存钱=越穷？这可能是真的',
                    date: '2017.11.11',
                    url: 'http://mp.weixin.qq.com/s/MvJWWqxmIoXu_FSuFUMuVg'
                },
                {
                    title: '为什么你的贷款总是被拒？还不是因为你⋯',
                    date: '2017.10.16',
                    url: 'http://mp.weixin.qq.com/s/XxExxCXb_JOh50u6YjPEqg'
                },
                {
                    title: '信用白户不用怕，3步提高你的贷款通过率！',
                    date: '2017.11.16',
                    url: 'http://mp.weixin.qq.com/s/xAZRzyjSk5xeKud8AMG-yw'
                },
                {
                    title: '信用卡使用习惯也会影响贷款，你踩坑了么？',
                    date: '2017.12.22',
                    url: 'http://mp.weixin.qq.com/s/jrmYzSQaAZX8be_ZE03i1g'
                }
            ]
        }
    },
    methods: {
        handleBanner() { // banner跳转
            window.location.href = 'http://mp.weixin.qq.com/s/lrE7E_niFninomxlkKWsjg';
        },
        bandlePanel(url) { // panel跳转
            window.location.href = url;
        }
    }
}
</script>

<style lang="less" src="./index.less" scoped>

</style>