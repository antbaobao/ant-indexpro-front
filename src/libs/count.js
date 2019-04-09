export const countChange = (price, beforePrice) => {
  beforePrice = Number(beforePrice)
  price = Number(price)
  let changeValue = 0
  let changePercentage = 0
  if (!beforePrice) {
    changePercentage = (price - beforePrice) / 1
  } else {
    changePercentage = ((price - beforePrice) / beforePrice) * 100
  }
  changeValue = price - beforePrice
  return { changePercentage, changeValue }
}
/**
 * isPriceIndex 判断是综合指数还是价格指数，isPriceIndex是返回字段种pairs，
 * pairs 存在则是priceIndex 否则是compositeIndex
 * @param price
 * @param isPriceIndex
 * @return {*}
 */
export const countPrice = (price, isPriceIndex, countLength = 4) => {
  if (isNaN(price) || !price) {
    return 0
  }
  if (!isPriceIndex) { // 综合指数保留两位
    return Number(price).toFixed(2)
  } else { // 价格指数截取小数点后四位
    let res = 0
    if (price.split('.').length > 1) {
      res = Number([ price.split('.')[ 0 ], price.split('.')[ 1 ].slice(0, countLength) ].join('.'))
    } else {
      res = Number(price.split('.')[ 0 ])
    }
    if (Math.abs(res) === 0) {
      return countPrice(price, isPriceIndex, countLength + 1)
    } else {
      return res
    }
  }
}
