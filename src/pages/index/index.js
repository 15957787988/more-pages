import Vue from 'vue'
import VConsole from 'vconsole'
import App from './App.vue'

Vue.config.productionTip = false
new VConsole()

new Vue({
  render: h => h(App)
}).$mount('#app')
