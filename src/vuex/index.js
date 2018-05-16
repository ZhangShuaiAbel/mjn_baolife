import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations/index';
import actions from './actions/index';
Vue.use(Vuex);

/**
 * @state: 共享数据
 * @getters: 共享数据计算属性
 * @mutations: 同步提交
 * @actions: 异步提交
*/
// 创建 store 实例
const Store = new Vuex.Store({
    state: { 
        count: 1,
        resultData: [
            {
                "name": "演示用",
                "url": "news://bnlob.sk/wfcgbbhx",
                "email": "a.nzxv@lqyccripg.中国互联.网络",
                "address": "重庆 重庆市 长寿区",
                "string": "★★★",
                "number": 86,
                "boolean": true,
            },
            {
                "name": "演示用",
                "url": "wais://jklnyyyvk.fj/kklaanu",
                "email": "i.mtjmwumig@skvgdm.be",
                "address": "海南省 三亚市 -",
                "string": "★★★★★★",
                "number": 66,
                "boolean": true,
            }
        ],
        detailsInfo: {}
    },
    getters: { 
        calcNumber: ( state ) => {
            let val = state.count + 10;
            return val;
        }
    },
    mutations: mutations(this.state), 
    actions: actions() 
  })

  export default Store
