/**
 * 对res做统一的处理
 * @param res
 * @param cb
 */
const handleRes = (message, res, cb = () => {}) => {
  if (res.code === 1002) {
    message.error('Request error')
  } else if (res.code === 1005) {
    message.error('Parameter error')
  } else {
    cb()
  }
}
export default handleRes
