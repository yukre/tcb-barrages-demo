// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Cloudbase from '@cloudbase/vue-provider'
import config from '../cloudbaserc'
// eslint-disable-next-line no-unused-vars
import babelPolyfill from 'babel-polyfill'

Vue.config.productionTip = false

Vue.use(Cloudbase, {
  env: config.envId
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
