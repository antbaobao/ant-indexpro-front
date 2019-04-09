import { getProindex } from '@/api/proindex'

export default {
  state: {
    proindex: [],
    getProindexLoading: false
  },
  mutations: {
    setProindex (state, proindex) {
      state.proindex = proindex
    },
    setGetProindexLoading (state, getProindexLoading) {
      state.getProindexLoading = getProindexLoading
    }
  },
  actions: {
    // 获取proindex数据
    getProindex ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('setGetProindexLoading', true)
          getProindex().then(res => {
            const data = res.data
            if (data.code === 200) {
              commit('setProindex', data.data)
            }
            commit('setGetProindexLoading', false)
            resolve(data)
          }).catch(err => {
            reject(err)
            commit('setGetProindexLoading', false)
          })
        } catch (error) {
          reject(error)
          commit('setGetProindexLoading', false)
        }
      })
    }
  }
}
