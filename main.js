// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/common.styl'

import showTip from './utils/tips.js'
window._showTip = showTip;

import utils from './utils/utils.js'
window._utils = utils

import Vue from 'vue'
import App from './App'

// 引入淘宝移动端适配库
import 'lib-flexible'

import Icon from 'vue-svg-icon/Icon.vue'
Vue.component('icon', Icon)
import tHead from './components/head.vue'
Vue.component('tHead', tHead)

import store from './store/index.js'

import router from './utils/routerEntry.js'


Vue.config.productionTip = false;
// 定义全局组件
Vue.use(tHead);

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    _utils.getUserInfo.call(this);
  }
})
