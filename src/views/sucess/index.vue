<template>
    <div class="paySucceed">
        <iframe v-if="isShowiframe" src="javascript:;" width="1" height="1" ref="iframe"></iframe>
          <div class="paySucceed_img"></div>
          <div class="paySucceed_text">{{$route.query.status === 'bind' ? '您已经成功绑卡' : '您已成功支付订单'}}~</div>
          <div @click="saleCashCard" class="button_btn">确认</div>
      </div>
</template>

<script>
export default {
  name: "success",

  data() {
    return {
      isShowiframe: false
    };
  },

  beforeRouteEnter: (to, from, next) => {
    // 如果是绑卡进入
    if (to.query.status === "bind") {
      // 如果绑定成功进入页面
      if (to.query.code === "0000" || to.query.code === "0002") {
        next();
      }else if(to.query.code === "0003") {
        let path = `/tiedcard?userId=${to.query.userId}&realName=${decodeURI(to.query.realName)}&msg=${decodeURI(to.query.msg)},请绑定尾号为${decodeURI(to.query.bankNo)}的银行卡`;
        next(path);
      }else {  // 如果绑定失败,跳转绑卡页面并提示错误信息
        let path = `/tiedcard?userId=${to.query.userId}&realName=${decodeURI(
          to.query.realName
        )}&msg=${decodeURI(to.query.msg)}`;
        next(path);
      }
    }else { // 如果是支付进入
      next();
    }
  },

  methods: {
    saleCashCard() {
      // 绑定成功
      if (this.$route.query.status === "bind") {
        this.$router.push(`/bankcard?userId=${this.$route.query.userId}&realName=${this.$route.query.realName}`);
      }else if (this.$route.query.status === "payfirst") { // 零首付支付
        // 支付成功
        this.isShowiframe = true;
        this.$nextTick(() => {
          // 返回native订单详情
          this.$refs.iframe.src = `bglife://app?action=10&data={"orderId":${this.$route.query.orderId},"productType":0}`;
        });
      } else if (this.$route.query.status === "pay") { // 非零首付支付
        
        this.isShowiframe = true;
        this.$nextTick(() => {
          // 触发关闭浏览器协议
          this.$refs.iframe.src = `bglife://app?action=4`;
        });
      }
    }
  }
};
</script>



<style lang="less" src="./index.less" scoped>

</style>