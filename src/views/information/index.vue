<template>
    <div class="invitation">
        <div class="scoll_wrap">
            <div>           
                <div class="msg">
                    <div class="msg-title">
                        <span></span>
                        <h3>工作信息</h3>    
                    </div>
                    <div class="msg-content">
                        <div class="msg-dan">
                            <span class="span-icon icon-hangye"></span>
                            <div class="msg-con-left">从事行业</div> 
                            <div class="msg-con-right">
                                <input type="text" placeholder="请选择行业" readonly v-model="radio_hangye" @click="hangYeFun()">
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-zhiwei"></span>
                            <div class="msg-con-left">所在职位</div>
                            <div class="msg-con-right">
                                <input type="text" placeholder="请选择职位" readonly v-model="radio_zhiwei" @click="zhiWeiFun()">
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-mingcheng"></span>
                            <div class="msg-con-left">单位名称</div>
                            <div class="msg-con-right">
                                <input type="text" v-model="companyName" placeholder="请填写单位名称">
                            </div>
                            <span class="span-icon-right"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-danwei"></span>
                            <div class="msg-con-left">单位地址</div> 
                            <div class="msg-con-right">
                                <div class="div-mo" v-show="addressNo" @click="addressDanFun(code,-1)"><span>请选择单位地址</span></div>
                                <div class="div-box" v-show="addressYes" @click="addressDanFun(code,-1)"><span>{{addressString}}</span></div>
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-xidizhi"></span>
                            <div class="msg-con-left">详细地址</div>
                            <div class="msg-con-right">
                                <input type="text" v-model="companyAddress" placeholder="请填写详细地址">
                            </div>
                            <span class="span-icon-right"></span>
                        </div>
                    </div>
                </div>
                <div class="msg">
                    <div class="msg-title">
                        <span></span>
                        <h3>家庭住址信息</h3> 
                    </div>
                    <div class="msg-content">
                        <div class="msg-dan">
                            <span class="span-icon icon-jtdizhi"></span>
                            <div class="msg-con-left">家庭地址</div> 
                            <div class="msg-con-right">
                                <div class="div-mo" v-show="addressHomeNo" @click="addressHomeFun(code,-1)"><span>请选择家庭住地址</span></div>
                                <div class="div-box" v-show="addressHomeYes" @click="addressHomeFun(code,-1)">{{addressHomeString}}</div>
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-jtxiangxi"></span>
                            <div class="msg-con-left">详细地址</div>
                            <div class="msg-con-right">
                                <input type="text" v-model="homeAddress" placeholder="请填写详细地址">
                            </div>
                            <span class="span-icon-right"></span>
                        </div>
                    </div>
                </div>
                <div class="msg">
                    <div class="msg-title">
                        <span></span>
                        <h3>其他个人信息</h3> 
                    </div>
                    <div class="msg-content">
                        <div class="msg-dan">
                            <span class="span-icon icon-yesgouru"></span>
                            <div class="msg-con-left">月收入</div> 
                            <div class="msg-con-right">
                                <input type="text" placeholder="请选择月收入" readonly v-model="radio_shouru" @click="shouRuFun()">
                                <!-- <input type="text" placeholder="请选择月收入" readonly v-model="radio_zhiwei" @click="zhiWeiFun()"> -->
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-hanghuan"></span>
                            <div class="msg-con-left">还款能力</div> 
                            <div class="msg-con-right">
                                 <input type="text" placeholder="请选择还款能力" readonly v-model="radio_huankuan" @click="huanKuanFun()">
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-hunyin"></span>
                            <div class="msg-con-left">婚姻状况</div> 
                            <div class="msg-con-right">
                                 <input type="text" placeholder="请选择婚姻状况" readonly v-model="radio_hunyin" @click="hunyinFun()">
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                        <div class="msg-dan">
                            <span class="span-icon icon-xueli"></span>
                            <div class="msg-con-left">学历</div> 
                            <div class="msg-con-right">
                                <input type="text" placeholder="请选择学历" readonly v-model="radio_xueli" @click="xueliFun()">
                            </div>
                            <span class="span-icon-left"></span>
                        </div>
                    </div>
                </div> 
                <div class="btn">
                    <button @click="setUserInfoFun">确认</button>
                </div>      
            </div>
        
        </div>         
        <!-- <ms-toast :isShow="isShowToast"></ms-toast> -->
        
        <ms-hint :isShow="isShowHint" :isText="validationData"></ms-hint>
        <ms-toast :isShow="isShowToast"></ms-toast>
        <ms-popup :isShow="isShowPopupHangYe">
                <div class="city">
                    <div class="city-header">
                        <span>请选择从事行业</span>
                    </div>
                    <ul class="city-content">
                        <li v-for="(item,index) in hangyeList" :key="index" @click="alertHYFun(item.means,item.order)">{{item.means}}</li>
                        <!-- <li v-for="(item,index) in hangyeList" :key="index" @click="alertHYFun(item.means,item.id)">
                            <input type="radio" id="111" v-model="radio_hangye">
                            <label for="111">{{item.means}}</label>
                        </li> -->
                    </ul>
                </div>
		    </ms-popup>
            <ms-popup :isShow="isShowPopupZhiWei">
                <div class="city">
                    <div class="city-header">
                        <span>请选择职位</span>
                    </div>
                    <ul class="city-content">
                        <li v-for="(item,index) in zhiweiList" :key="index" @click="alertZWFun(item.means,item.order)">{{item.means}}</li>
                    </ul>
                </div>
            </ms-popup>
            <ms-popup :isShow="isShowPopupShouRu">
                <div class="city">
                    <div class="city-header">
                        <span>请选择月收入</span>
                    </div>
                    <ul class="city-content">
                        <li v-for="(item,index) in shouruList" :key="index" @click="alertSRFun(item.means,item.order)">{{item.means}}</li>
                    </ul>
                </div>
            </ms-popup>
            <ms-popup :isShow="isShowPopupHuanKuan">
                <div class="city">
                    <div class="city-header">
                        <span>请选择还款能力</span>
                    </div>
                    <ul class="city-content">
                        <li v-for="(item,index) in huankuanList" :key="index" @click="alertHKFun(item.means,item.order)">{{item.means}}</li>
                    </ul>
                </div>
            </ms-popup>
            <ms-popup :isShow="isShowPopupHunYin">
                <div class="city">
                    <div class="city-header">
                        <span>请选择婚姻状况</span>
                    </div>
                    <ul class="city-content">
                        <li v-for="(item,index) in hunyinList" :key="index" @click="alertHYZKFun(item.means,item.order)">{{item.means}}</li>
                    </ul>
                </div>
            </ms-popup>
            <ms-popup :isShow="isShowPopupXueLi">
                <div class="city">
                    <div class="city-header">
                        <span>请选择学历</span>   
                    </div>
                    <ul class="city-content">
                        <li v-for="(item,index) in xueliList" :key="index" @click="alertXLFun(item.means,item.order)">{{item.means}}</li>
                    </ul>
                </div>
            </ms-popup>
            <ms-popup :isShow="isShowPopupDanWei">   
                <div class="city">
                    <div class="city-header">
                        <span v-show="isShowPlaceholder">请选择单位地址</span><span v-text="addressString"></span>				
                    </div>
                    <ul class="city-content" id="danwei">
                        <li v-for="(item,index) in dataList" :key="index" @click="addressDanFun(index,item)">{{item}}</li>
                    </ul>
                </div>
            </ms-popup>
            <ms-popup :isShow="isShowPopupHome">   
                <div class="city">
                    <div class="city-header" id="home">
                        <span v-show="isShowHomePlaceholder">请选择家庭地址</span><span v-text="addressHomeString"></span>				
                    </div>
                    <ul class="city-content jiating">
                        <li v-for="(item,index) in dataHomeList" :key="index" @click="addressHomeFun(index,item)">{{item}}</li>
                    </ul>
                </div>
            </ms-popup>
    </div>

</template>

<script>
// import Bscroll from "better-scroll";
import Toast from "@/components/common/toast";
import * as connectURL from "@/http/common/connectURL";
import { bus, busType } from "@/bus";
import Popup from "@/components/common/popup";
import Hint from "@/components/common/hint";
export default {
  name: "information",
  data() {
    return {
      isShowHint: false,
      validationData: "",
      isShowPopupHome: false,
      isShowPlaceholder: true,
      isShowHomePlaceholder: true,
      isShowPopupDanWei: false,
      isShowPopupXueLi: false,
      isShowPopupHunYin: false,
      isShowPopupHangYe: false,
      isShowPopupZhiWei: false,
      isShowPopupShouRu: false,
      isShowPopupHuanKuan: false,
      isShowToast: false,
      isShowPopup: false,
      addressNo: true,
      addressYes: false,
      addressHomeNo: true,
      addressHomeYes: false,
      addressHomeString: "",
      addressString: "",
      addressHomeArray: [],
      addressArray: [],
      code: "-1",
      dataList: [],
      dataHomeList: [],
      hangyeList: [],
      hunyinList: [],
      shouruList: [],
      xueliList: [],
      zhiweiList: [],
      huankuanList: [],
      radio_hangye: "",
      radio_hunyin: "",
      radio_xueli: "",
      radio_shouru: "",
      radio_zhiwei: "",
      radio_huankuan: "",

      radio_hangye_num: "",
      radio_hunyin_num: "",
      radio_xueli_num: "",
      radio_shouru_num: "",
      radio_zhiwei_num: "",
      radio_huankuan_num: "",
      companyName: "",
      companyAddress: "",
      homeAddress: ""
    };
  },
  components: {
    msPopup: Popup,
    msToast: Toast,
    msHint: Hint
  },
  mounted() {
    // 监听开启行业popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupHangYe = true;
      }.bind(this)
    );
    // 监听关闭行业popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupHangYe = false;
      }.bind(this)
    );
    // 监听开启职位popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupZhiWei = true;
      }.bind(this)
    );
    // 监听关闭职位popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupZhiWei = false;
      }.bind(this)
    );
    // 监听开启月收入popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupShouRu = true;
      }.bind(this)
    );
    // 监听关闭月收入popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupShouRu = false;
      }.bind(this)
    );
    // 监听开启还款能力popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupHuanKuan = true;
      }.bind(this)
    );
    // 监听关闭还款能力popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupHuanKuan = false;
      }.bind(this)
    );
    // 监听开启婚姻状况popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupHunYin = true;
      }.bind(this)
    );
    // 监听关闭婚姻状况popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupHunYin = false;
      }.bind(this)
    );
    // 监听开启婚姻状况popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupXueLi = true;
      }.bind(this)
    );
    // 监听关闭婚姻状况popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupXueLi = false;
      }.bind(this)
    );
    // 监听开启单位地址三级联动popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupDanWei = true;
      }.bind(this)
    );
    // 监听关闭单位地址三级联动popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupDanWei = false;
      }.bind(this)
    );
    // 监听开启单位地址三级联动popup
    bus.$on(
      busType.OPEN_CITY_POPUP,
      function() {
        this.isShowPopupHome = true;
      }.bind(this)
    );
    // 监听关闭单位地址三级联动popup
    bus.$on(
      busType.CLOSE_CITY_POPUP,
      function() {
        this.isShowPopupHome = false;
      }.bind(this)
    );
    // this.$nextTick(() => {
    //   this._initScroll();
    // });
    this.listFun();
  },
  methods: {
    getUserInfoFun() {
      var _this = this;
      this.$http(connectURL.INFORMATION_GETUSERINFO, {
        type: "POST",
        params: {
          userId: this.$route.query.userId
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.data == null) {
            // this.validationData = res.data.message;
            // this.isShowHint = !this.isShowHint;
          } else {
            var oalUserInforList = res.data.data;
            _this.companyAddress = oalUserInforList.companyAddress;
            _this.companyName = oalUserInforList.companyName;
            _this.homeAddress = oalUserInforList.homeAddress;

            let companyAddressArea = oalUserInforList.companyAddressArea;
            let companyAddressCity = oalUserInforList.companyAddressCity;
            let companyAddressProvince =
              oalUserInforList.companyAddressProvince;

            let homeAddressProvinceId = oalUserInforList.homeAddressProvinceId;
            let homeAddressCityId = oalUserInforList.homeAddressCityId;
            let homeAddressAreaId = oalUserInforList.homeAddressAreaId;

            _this.radio_hangye_num = oalUserInforList.industry; //获取行业order
            _this.radio_zhiwei_num = oalUserInforList.place; //获取职位order
            _this.radio_shouru_num = oalUserInforList.monthIncome; //获取月收入order
            _this.radio_hunyin_num = oalUserInforList.marrayStatus; //获取婚姻order
            _this.radio_huankuan_num = oalUserInforList.repaymentAbility; //获取还款order
            _this.radio_xueli_num = oalUserInforList.education; //获取学历rder
            _this.radio_xueli_num = oalUserInforList.education; //获取学历rder
            _this.addressString = oalUserInforList.companyPca; //获取 省市区  公司
            _this.addressHomeString = oalUserInforList.homePca; //获取 省市区  家庭

            _this.addressHomeArray = [
              homeAddressProvinceId,
              homeAddressCityId,
              homeAddressAreaId
            ];
            _this.addressArray = [
              companyAddressProvince,
              companyAddressCity,
              companyAddressArea
            ];
            console.log(_this.addressString, _this.addressHomeString);
            _this.hangyeList.forEach(function(val, index) {
              if (_this.radio_hangye_num == val.order) {
                _this.radio_hangye = val.means;
              }
            });
            this.shouruList.forEach(function(val, index) {
              if (oalUserInforList.monthIncome == val.order) {
                _this.radio_shouru = val.means;
              }
            });
            this.hunyinList.forEach(function(val, index) {
              if (oalUserInforList.marrayStatus == val.order) {
                _this.radio_hunyin = val.means;
              }
            });
            this.huankuanList.forEach(function(val, index) {
              if (oalUserInforList.repaymentAbility == val.order) {
                _this.radio_huankuan = val.means;
              }
            });
            this.xueliList.forEach(function(val, index) {
              if (oalUserInforList.education == val.order) {
                _this.radio_xueli = val.means;
              }
            });
            this.zhiweiList.forEach(function(val, index) {
              if (oalUserInforList.place == val.order) {
                _this.radio_zhiwei = val.means;
              }
            });
            console.log(
              this.radio_hangye,
              this.radio_shouru,
              this.radio_hunyin,
              this.radio_huankuan,
              this.radio_xueli,
              this.radio_zhiwei
            );
          }
        })
        .catch(err => {
          console.log("获取个人信息接口请求错误===>>", err);
        });
    },
    _initScroll() {
      this.scroll = new Bscroll(this.$refs.scroll, {
        eventPassthrough: "horizontal"
      });
    },
    addressDanFun(data, val) {
      this.isShowPopupDanWei = true;
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
          console.log("获取城市联动请求错误===>>", err);
        });
    },

    addressHomeFun(data, val) {
      this.isShowPopupHome = true;
      if (val != -1 || data != -1) {
        this.addressHomeString += val + "   ";
        this.addressHomeArray.push(data);
      } else {
        this.addressHomeString = "";
        this.addressHomeArray = [];
      }
      this.$http(`${connectURL.TIEDCARD_CITY}?code=${data}`)
        .then(res => {
          console.log(res);
          if (!res.data.data) return;
          this.dataHomeList = res.data.data;
        })
        .catch(err => {
          console.log("获取城市联动请求错误===>>", err);
        });
    },
    cameraFun() {
      WebViewJavascriptBridge.selectBankCard();
    },
    bankCardCallBack(cardnum) {
      this.bankNumber = cardnum;
    },
    setUserInfoFun() {
      let companyAddressProvince = this.addressArray[0]; //单位-省code
      let companyAddressCity = this.addressArray[1]; //单位-市code
      let companyAddressArea = this.addressArray[2]; //单位-县code  addressString
      let companyAddress = this.companyAddress; //单位-具体地址  name
      //   console.log(companyAddressProvince,companyAddressCity,companyAddressArea);

      let homeAddressProvinceId = this.addressHomeArray[0]; //家庭-省code
      let homeAddressCityId = this.addressHomeArray[1]; //家庭-市code
      let homeAddressAreaId = this.addressHomeArray[2]; //家庭-县code
      let homeAddress = this.homeAddress; //家庭-具体地址 name   addressHomeString

      let marrayStatus = this.radio_hunyin_num; //婚姻
      let monthIncome = this.radio_shouru_num; //月收入
      let industry = this.radio_hangye_num; //行业
      let repaymentAbility = this.radio_huankuan_num; //还款能力
      let education = this.radio_xueli_num; //学历
      let companyName = this.companyName; //公司名称
      let place = this.radio_zhiwei_num; //职位
      var _this = this;
      if (industry == "") {
        this.validationData = "请选择行业";
        this.isShowHint = !this.isShowHint;
      } else if (place == "") {
        this.validationData = "请选择职位";
        this.isShowHint = !this.isShowHint;
      } else if (companyName == "") {
        this.validationData = "请填写单位名称";
        this.isShowHint = !this.isShowHint;
      } else if (this.addressArray.length !== 3) {
        this.validationData = "请选择单位地址";
        this.isShowHint = !this.isShowHint;
      } else if (companyAddress == "") {
        this.validationData = "请填写单位详细地址";
        this.isShowHint = !this.isShowHint;
      } else if (this.addressHomeArray.length !== 3) {
        this.validationData = "请选择家庭地址";
        this.isShowHint = !this.isShowHint;
      } else if (homeAddress == "") {
        this.validationData = "请填写家庭详细地址";
        this.isShowHint = !this.isShowHint;
      } else if (monthIncome == "") {
        this.validationData = "请选择月收入";
        this.isShowHint = !this.isShowHint;
      } else if (repaymentAbility == "") {
        this.validationData = "请选择还款能力";
        this.isShowHint = !this.isShowHint;
      } else if (marrayStatus == "") {
        this.validationData = "请选择婚姻状况";
        this.isShowHint = !this.isShowHint;
      } else if (education == "") {
        this.validationData = "请选择学历";
        this.isShowHint = !this.isShowHint;
      } else {
        this.$http(connectURL.INFORMATION_SETUSERINFO, {
          type: "POST",
          params: {
            companyAddress: companyAddress,
            companyAddressArea: companyAddressArea,
            companyAddressCity: companyAddressCity,
            companyAddressProvince: companyAddressProvince,
            companyName: companyName,
            education: education,
            homeAddress: homeAddress,
            homeAddressAreaId: homeAddressAreaId,
            homeAddressCityId: homeAddressCityId,
            homeAddressProvinceId: homeAddressProvinceId,
            marrayStatus: marrayStatus,
            monthIncome: monthIncome,
            industry: industry,
            repaymentAbility: repaymentAbility,
            userId: this.$route.query.userId,
            cashId: this.$route.query.cashId,
            place: place
          }
        })
          .then(res => {
            if (res.data.code !== 0) {
              this.isShowHint = !this.isShowHint;
              this.validationData = res.data.message;
            } else {
              this.$router.push(`/credit?userId=${this.$route.query.userId}`);
            }
          })
          .catch(err => {
            console.log("获取分期接口请求错误===>>", err);
            this.isShowHint = !this.isShowHint;
            this.validationData = err.message;
          });
      }
    },

    listFun() {
      this.isShowToast = true;
      let task = [];
      task.push(this.$http(`${connectURL.INFORMATION_HANGYE}`));
      task.push(this.$http(`${connectURL.INFORMATION_HUNYIN}`));
      task.push(this.$http(`${connectURL.INFORMATION_SHOURU}`));
      task.push(this.$http(`${connectURL.INFORMATION_XUELI}`));
      task.push(this.$http(`${connectURL.INFORMATION_ZHIWEI}`));
      task.push(this.$http(`${connectURL.INFORMATION_HUANKUAN}`));
      Promise.all(task)
        .then(res => {
          let [a, b, c, d, e, f] = res.map((item, index) => {
            return item.data.data;
          });
          this.hangyeList = a; //获取行业列表
          this.hunyinList = b; //获取婚姻状况列表
          this.shouruList = c; //获取收入列表
          this.xueliList = d; //获取学历列表
          this.zhiweiList = e; //获取职位列表
          this.huankuanList = f; //获取还款列表
          this.isShowToast = false;
          this.$nextTick(
            function() {
              this.getUserInfoFun();
            }.bind(this)
          );
        })
        .catch(err => {
          this.isShowHint = !this.isShowHint;
          this.validationData = err.message;
        });
    },
    alertHYFun(val, index) {
      this.radio_hangye = val;
      this.radio_hangye_num = index;
      this.isShowPopupHangYe = false;
    },
    hangYeFun() {
      this.isShowPopupHangYe = true;
    },
    alertZWFun(val, index) {
      this.radio_zhiwei = val;
      this.radio_zhiwei_num = index;
      this.isShowPopupZhiWei = false;
    },
    zhiWeiFun() {
      this.isShowPopupZhiWei = true;
    },
    alertSRFun(val, index) {
      this.radio_shouru = val;
      this.radio_shouru_num = index;
      this.isShowPopupShouRu = false;
    },
    shouRuFun() {
      this.isShowPopupShouRu = true;
    },

    alertHYZKFun(val, index) {
      this.radio_hunyin = val;
      this.radio_hunyin_num = index;
      this.isShowPopupHunYin = false;
    },
    hunyinFun() {
      this.isShowPopupHunYin = true;
    },
    alertXLFun(val, index) {
      this.radio_xueli = val;
      this.radio_xueli_num = index;
      this.isShowPopupXueLi = false;
    },
    xueliFun() {
      this.isShowPopupXueLi = true;
    },
    alertHKFun(val, index) {
      this.radio_huankuan = val;
      this.radio_huankuan_num = index;
      this.isShowPopupHuanKuan = false;
    },
    huanKuanFun() {
      this.isShowPopupHuanKuan = true;
    }
  },
  watch: {
    // 监控城市联动
    addressArray: function() {
      if (this.addressArray.length == 3) {
        this.isShowPopupDanWei = false;
        this.addressNo = false;
        this.addressYes = true;
      } else {
        this.addressNo = true;
        this.addressYes = false;
      }
    },
    addressString: function() {
      if (this.addressString == "") {
        this.isShowPlaceholder = true;
      } else {
        this.isShowPlaceholder = false;
      }
    },
    addressHomeArray: function() {
      if (this.addressHomeArray.length == 3) {
        this.isShowPopupHome = false;
        this.addressHomeNo = false;
        this.addressHomeYes = true;
      } else {
        this.addressHomeNo = true;
        this.addressHomeYes = false;
      }
    },
    addressHomeString: function() {
      if (this.addressHomeString == "") {
        this.isShowHomePlaceholder = true;
      } else {
        this.isShowHomePlaceholder = false;
      }
    },
    validation: function() {
      var _this = this;
      if (this.validation == true) {
        setTimeout(function() {
          _this.validation = false;
        }, 2000);
      }
    }
  }
};
</script>

<style lang="less" src="./index.less" scoped></style>