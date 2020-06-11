import Vue from 'vue'
import App from './App.vue'
import { Row,Col } from 'ant-design-vue'

Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
