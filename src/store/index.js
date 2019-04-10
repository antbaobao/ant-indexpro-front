import Vue from 'vue'
import Vuex from 'vuex'

import proindex from './module/proindex'
import circle from './module/circle'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    proindex,
    circle
  }
})
