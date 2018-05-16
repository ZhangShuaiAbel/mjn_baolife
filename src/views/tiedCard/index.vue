<template>
	<div class="card">
		<div class="card-con">
			<div class="card-con-left">开户名</div>
			<div class="card-con-right">
				<input class="input" type="text" v-model="openAccountName" placeholder="请填写开户名" readonly/>
			</div>
		</div>
		<div class="card-con">
			<div class="card-con-left">银行名称</div>
			<div class="card-con-right">
        <input class="input" type="text" @click="isShowBankFun()" v-model="bankName" placeholder="请选择银行" readonly>
			</div>
		</div>
		<div class="card-con">
			<div class="card-con-left">开户地址</div>
			<div class="card-con-right">
				<div class="address-mo" v-show="addressNo" @click="addressFun(code,-1)"><span>请选择开户地址</span></div>
				<div class="address" v-show="addressYes" @click="addressFun(code,-1)"><span>{{addressString}}</span></div>
			</div>
		</div>
		<div class="card-con">
			<div class="card-con-left">银行卡号</div>
			<div class="card-con-right sao">
				<div class="sao-card-input">
					<input class="input" type="text" v-model="bankNumber" placeholder="请填写银行卡号" />
				</div>
				<div class="sao-card-img" @click="cameraFun()">
				</div>
			</div>
		</div>
		<div class="card-con">
			<div class="card-con-left">银行预留手机号码</div>
			<div class="card-con-right">
				<input class="input" type="text" v-model="bankTal" placeholder="请填写银行预留手机号码" />
			</div>
		</div>
		<div class="btn">
			<button @click="so()">确认</button>
		</div>
		<p>绑定银行卡即表示同意<span @click="handleAgreement">《代扣协议》</span></p>

		<ms-popup :isShow="isShowPopup">
			<div class="city">
				<div class="city-header">
						<span v-show="isShowPlaceholder">请选择开户地址</span><span v-text="addressString"></span>		
				</div>
				<ul class="city-content">
					<li v-for="(item,index) in dataList" :key="index" @click="addressFun(index,item)">{{item}}</li>
				</ul>
			</div>
		</ms-popup>
    <ms-popup :isShow="isShowBankPopup">
			<div class="city">
				<div class="city-header">
          <span>请选择银行</span>
        </div>
				<ul class="city-content">
					<li v-for="(item,index) in bankList" :key="index" @click="chooseBankFun(item.means,item.order)">{{item.means}}</li>
				</ul>
			</div>
		</ms-popup>
		<ms-toast :isShow="isShowToast"></ms-toast>
    <ms-hint :isShow="isShowHint" :isText="validationData"></ms-hint>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
import Toast from "@/components/common/toast";
import * as connectURL from "@/http/common/connectURL";
import { bus, busType } from "@/bus";
import Popup from "@/components/common/popup";
import Hint from '@/components/common/hint';

export default {
  name: "tiedCard",
  beforeRouteEnter: (to, from, next) => {
    if ( to.query.msg ) { // 绑卡失败进入时执行
      next((vm) => {
        vm.isShowHint = !vm.isShowHint;
        vm.validationData = to.query.msg;
      });
    }else {  // 正常执行
      next();
    }
  },
  data() {
    return {
      isShowBankPopup:false, 
      isShowHint: false,
      validationData:"",
      isShowPlaceholder: true,
      isShowToast: false,
      isShowPopup: false,
      addressNo: true,
      addressYes: false,
      code: "-1",
      dataList: [],
      addressString: "",
      addressArray: [],
      bankNameNo: true,
      bankNameYes: false,
      openAccountName: this.$route.query.realName,
      bankNumber: "",
      bankcode: "",
      bankTal: "",
      bankList: "",
      bankName: "",
    };
  },
  components: {
    msPopup: Popup,
    msToast: Toast,
    msHint: Hint,
  },
  mounted() {
    // 监听开户地址开启popup
    bus.$on(busType.OPEN_CITY_POPUP,function() {this.isShowPopup = true;}.bind(this));
    // 监听开户地址关闭popup
    bus.$on(busType.CLOSE_CITY_POPUP,function() {this.isShowPopup = false;}.bind(this));
    // 监听银行开启popup
    bus.$on(busType.OPEN_CITY_POPUP,function() {this.isShowBankPopup = true; }.bind(this));
    // 监听银行关闭popup
    bus.$on(busType.CLOSE_CITY_POPUP,function() {this.isShowBankPopup = false;}.bind(this));
    this._onSelectChange();

    window.bankCardCallBack = (params) => {
      this.bankCardCallBack(params)
    }
  },
  methods: {
    addressFun(data, val) {
      this.isShowPopup = true;
      if (val != -1 || data != -1) {
        this.addressString += val + "   ";
        this.addressArray.push(data);
      } else {
        this.addressString = "";
        this.addressArray = [];
      }
      this.$http(`${connectURL.TIEDCARD_CITY}?code=${data}`)
        .then(res => {
          console.log(res);
          if (!res.data.data) return;
          this.dataList = res.data.data;
        })
        .catch(err => {
          console.log("获取分期接口请求错误===>>", err);
        });
    },
    cameraFun() {     
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isAndroid === true){
        WebViewJavascriptBridge.selectBankCard();
      }else{
        window.webkit.messageHandlers.methodBankOCR.postMessage('1');
      }
    },
    bankCardCallBack(cardnum) {
      this.bankNumber = cardnum;
    },
    isShowBankFun(){
      this.isShowBankPopup = true;
    },
    chooseBankFun(val,index){
      this.bankcode = index;
      this.bankName = val;
      this.isShowBankPopup = false;
    },
    so(){
       if (this.openAccountName == "") {
        this.validationData = "开户名不能为空";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (!/^[\u4e00-\u9fa5]{2,4}$/i.test(this.openAccountName)) {
        this.validationData = "开户名必须为中文名称";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (this.bankcode == "") {
        this.validationData = "银行名称不能为空";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (this.addressArray.length < 3) {
        this.validationData = "开户地址不能为空";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (this.bankNumber == "") {
        this.validationData = "银行卡卡号不能为空";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (!/^\d*$/.test(this.bankNumber)) {
        this.validationData = "银行卡卡号有误";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (this.bankTal == "") {
        this.validationData = "银行预留手机号码不能为空";
        this.isShowHint = !this.isShowHint;
        return false;
      } else if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.bankTal)) {
        this.validationData = "银行预留手机号码有误";
        this.isShowHint = !this.isShowHint;
        return false;
      }
      this.$nextTick(
        function() {
          this.submitFun();
        }.bind(this)
      )

    },
    submitFun() {    
      let shengCode = this.addressArray[0];
      let shiCode = this.addressArray[1];
      let xianCode = this.addressArray[2];
      let addressStrings = this.addressString.split("   ");
      let shengName = addressStrings[0];
      let shiName = addressStrings[1];
      let xianName = addressStrings[2];
      var _this = this;
      this.bankList.forEach(function(val, index) {
        if (val.order == _this.bankcode) {
          _this.bankName = val.means;
        }
      });
      this.$http(connectURL.TIEDCARD_BILLBANKCARD, {
        type: "POST",
        params: {
          userId: this.$route.query.userId,
          cardNum: this.bankNumber,
          bankName: this.bankName,
          branchAddress: this.addressString,
          bankCode: this.bankcode,
          provinceCode: shengCode,
          cityCode: shiCode,
          countyCode: xianCode,
          province: shengName,
          city: shiName,
          bankPhone: this.bankTal
        }
      })
        .then(res => {
          if(res.data.code!="0"){
            console.log(res.data.message);
            this.validationData = res.data.message;
            this.isShowHint = !this.isShowHint;            
          }else{
            var dataPath = res.data.data;
            console.log(dataPath);
            window.location.href = dataPath;
          }

        })
        .catch(err => {
          console.log("获取城市列表接口请求错误===>>", err);
          this.isShowHint = !this.isShowHint;     
          this.validationData = err.message;
        });
    },

    _onSelectChange() {
      this.isShowToast = true;
      this.$http(`${connectURL.TIEDCARD_YINHANG}`)
        .then(res => {
          console.log(res);
          this.isShowToast = false;
          this.bankList = res.data.data;
        })
        .catch(err => {     
          console.log("获取银行列表接口请求错误===>>", err);
        });
    },
    // 跳转转卖协议
    handleAgreement() {
      this.$router.push('/agreementDaikou');
    },
  },
  watch: {
    // 监控城市联动
    addressArray: function() {
      if (this.addressArray.length == 3) {
        this.isShowPopup = false;
        this.addressNo = false;
        this.addressYes = true;
      } else {
        this.addressNo = true;
        this.addressYes = false;
      }
    },
    addressString:function(){
        if(this.addressString==""){
            this.isShowPlaceholder = true;
        }else{
            this.isShowPlaceholder = false;
        }
    },
  }
};
</script>

<style lang="less" src="./index.less" scoped></style>