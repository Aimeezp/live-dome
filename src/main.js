// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.less'

Vue.config.productionTip = false
import VCharts from 'v-charts'
import ajax from "./utils/ajax";
import ajax2 from "./utils/ajax2";
Vue.use(ajax).use(ajax2).use(VCharts);
import './components/vant'

// require('@/assets/gt.js');
// // 绑定到原型
// Vue.prototype.$initGeet=initGeetest;


import * as custom from './utils/filter'

import './utils/fontSize'

import "./utils/crypto";



Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

import './premission'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
