import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './i18n'
import ElementUI from 'element-ui'
import 'ant-design-vue/dist/antd.css'
import { Drawer, Button, Icon } from 'ant-design-vue'

import 'element-ui/lib/theme-chalk/index.css'
// import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
// Vue.component('v-chart', ECharts)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(Drawer.name, Drawer)
Vue.component(Button.name, Button)
Vue.component(Icon.name, Icon)

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount(document.querySelector('#app'))
