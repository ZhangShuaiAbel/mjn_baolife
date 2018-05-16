

import Vue from 'vue';
import vueRouter from 'vue-router';
import App from '@/App.vue';
import store from '@/vuex';
import {fastclick} from '@/config/base';
import { http } from '@/http/index';
import router from '@/router/index';
import '@/lib/rem';

Vue.use(http);
Vue.use(vueRouter);
fastclick();

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

