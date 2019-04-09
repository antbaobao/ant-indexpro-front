import axios from 'axios'
import queryString from 'query-string'
import config from '@/config'

axios.defaults.timeout = 0
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const HTTP_HEADER = {
  'Content-Type': 'application/json'
}

class _request {
  async get (url, params) {
    url = params ? `${url}?${queryString.stringify(params)}` : `${url}`
    let config = {
      url: `${baseUrl}${url}`,
      method: 'get',
      headers: { ...HTTP_HEADER }
    }
    const result = await axios(config)
    return result
  }
}

const request = new _request()
export default request
