import { getCircleData } from '@/api/circle'

export default {
  state: {
    circleData: []
  },
  mutations: {
    setCircleData (state, circleData) {
      state.circleData = circleData
    }
  },
  actions: {
    // 获取proindex数据
    getCircleData ({ state, commit }, { indexName, circle }) {
      return new Promise((resolve, reject) => {
        try {
          getCircleData({ indexName, circle }).then(res => {
            const data = res.data
            if (data.code === 200) {
              commit('setCircleData', data.data)
            }
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
