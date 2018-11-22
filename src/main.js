// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import layer from 'vue-layer'
import 'swiper/dist/css/swiper.css'
import './assets/css/common.css'
import './assets/js/common.js'
import apiUrl from './assets/js/api.js'
Vue.config.productionTip = false
import VueBus from 'vue-bus'

import preview from 'vue-photo-preview'
import '../node_modules/vue-photo-preview/dist/skin.css'
Vue.use(preview);

Vue.use(VueBus);
Vue.prototype.$http=axios;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.apiUrl = apiUrl.apiUrl;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
