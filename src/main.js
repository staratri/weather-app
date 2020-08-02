import Vue from 'vue'
import App from './App.vue'
import './styles/index.scss'
import VueCarousel from 'vue-carousel'
import store from './store'
Vue.use(VueCarousel)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
