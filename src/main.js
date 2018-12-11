// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer'

import Split from './components/Split/Split.vue'
import './filters'

Vue.config.productionTip = false
// 注册为全局组件标签
Vue.component('Split', Split)
Vue.component(Button.name,Button);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
