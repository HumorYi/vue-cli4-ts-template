import Vue from 'vue'
import Message from '@/utils/message'

Vue.config.productionTip = false
Vue.prototype.$message = new Message()