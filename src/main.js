import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fetchDefaults from 'fetch-defaults'
import axios from 'axios'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'inter-ui/inter-hinted.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/custom.css'

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false
var mixin = {
  data: function () {
    return {
      fetchopts: {
        credentials: 'include',
      }
    }
  }
}

new Vue({
  router,
  mixins: [mixin],
  render: h => h(App)
}).$mount('#app')