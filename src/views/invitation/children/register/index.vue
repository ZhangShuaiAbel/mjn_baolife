<template>
  <div class="register">
      <div class="top"></div>
          <div class="bottom">
            <ul>
                <li>
                  <input type="text" placeholder="请输入手机号" v-model="mobile" @input="mobileInput">
                </li>
                <li>
                  <input type="text" placeholder="请输入短信验证码"  v-model="verifyCode">
                  <button @click="getCode(formData)" class="code-btn" :disabled="!show">
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show" class="count">{{count}} s</span>
                  </button>
                </li>
                <li>
                  <input type="password" placeholder="请设置密码" v-model="password">
                </li>
            </ul>
            <div class="btn1" @click="submit"></div>
          </div>
          <p class="invitation_text">注册账号即代表我已阅读并同意<a href="/invitation/shouquan1">《用户注册协议》</a></p>
          <ms-hint :isShow="isShowHint" :isText="validationData"></ms-hint>
  </div>
</template>

<script>
import Toast from "@/components/common/toast";

import * as connectURL from "@/http/common/connectURL";
import { formatDate } from "@/http/common/formatDate.js";
import * as mutationTypes from "@/vuex//mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import * as MobileDetect from "mobile-detect";
import { mapMutations } from "vuex";
import { bus, busType } from "@/bus";
import { calc } from "@/utils";
import Hint from "@/components/common/hint";
import crypto from "crypto";

export default {
  data() {
    return {
      isShowHint: false,
      validationData: "",
      mobile: "",
      verifyCode: "",
      password: "",
      passwordMd5: "",
      show: true,
      count: "",
      timer: null,
      TIME_COUNT: 60,
      deviceType: 0,
      deviceName: ""
    };
  },

  components: {
    msToast: Toast,
    msHint: Hint
  },

  methods: {
    mobileInput: function() {
      if (/^1\d{10}$/.test(this.mobile)) {
      }
      // this.value = value;
    },
    getCode(formData) {
      if (/^1\d{10}$/.test(this.mobile)) {
        this.$http(`${connectURL.VERIFYCODE}?mobile=${this.mobile}&codeType=1`)
          .then(res => {
            console.log(res);
            console.log(res.data.message);
            if (res.data.code == "0") {
              if (!this.timer) {
                this.count = this.TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= this.TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            }
            this.isShowToast = false;
            this.isShowHint = !this.isShowHint;
            this.validationData = res.data.message;
          })
          .catch(err => {
            this.isShowToast = false;
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = err.message;
            console.log("获取验证码请求错误===>>", err);
          });
      } else {
        this.validationData = "请重新输入手机号";
        this.isShowHint = !this.isShowHint;
        return false;
      }
    },
    submit() {
      
      //判断数组中是否包含某字符串
      Array.prototype.contains = function(needle) {
        for (i in this) {
          if (this[i].indexOf(needle) > 0) return i;
        }
        return -1;
      };

      var device_type = navigator.userAgent; //获取userAgent信息
      //document.write(device_type);//打印到页面
      var md = new MobileDetect(device_type); //初始化mobile-detect
      var os = md.os(); //获取系统
      var model = "";
      if (os == "iOS") {
        //ios系统的处理
        os = md.os() + md.version("iPhone");
        model = md.mobile();
      } else if (os == "AndroidOS") {
        //Android系统的处理
        os = md.os() + md.version("Android");
        var sss = device_type.split(";");
        var i = sss.contains("Build/");
        if (i > -1) {
          model = sss[i].substring(0, sss[i].indexOf("Build/"));
        }
      }
      this.deviceName = os + "---" + model;

      if (!/^1\d{10}$/.test(this.mobile)) {
        this.validationData = "手机号码格式错误";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (!/^[0-9A-Za-z]{6,12}$/i.test(this.password)) {
        this.validationData = "密码格式错误,仅限字母数字";
        this.isShowHint = !this.isShowHint;
        return false;
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          this.deviceType = 1;
        } else if (/(Android)/i.test(navigator.userAgent)) {
          this.deviceType = 0;
        }
        
        var md5 = crypto.createHash("md5");
        md5.update(this.password);
        this.passwordMd5 = md5.digest("hex");

        this.$http(connectURL.REGISTER, {
          type: "POST",
          params: {
            verifyCode: this.verifyCode,
            mobile: this.mobile,
            password: this.passwordMd5,
            deviceType: this.deviceType,
            deviceName: this.deviceName,
            deviceNum: "",
            channel: "friend"
          }
        })
          .then(res => {
            this.isShowToast = false;
            this.isShowHint = !this.isShowHint;
            this.validationData = res.data.message;
            if(res.data.code == "0"){
              window.location.href="/invitation/download/"
            }
          })
          .catch(err => {
            this.isShowToast = false;
            this.isShowHint = !this.isShowHint;
            this.isShowHintText = err.message;
            console.log("获取验证码请求错误===>>", err);
          });
      }
    }
  }
}
</script> 

<style lang="less" src="./index.less" scoped></style>