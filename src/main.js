import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production';

// Для dev-режима
if (debug) {
    axios.defaults.baseURL = 'http://w-shop.lc';
}


Vue.use(Vuetify)
Vue.use(VueMaterial)
Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
