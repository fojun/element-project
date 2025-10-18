/**在工具类util.js中定义通用方法
 *  table合并行通用 */
// eslint-disable-next-line space-before-function-paren
export function mergeTableRow(config) {
  let data = config.data
  const {
    mergeColNames, // 需要合并的列
    firstMergeColNames, // 受影响的列
    firstMerge // 以哪列为基础进行合并(基准列)
  } = config
  if (!mergeColNames || mergeColNames.length === 0) {
    return data
  }
  mergeColNames.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      // 区分需要合并行的key值
      const rowVal = v[firstMerge] + '-' + v[m]
      // 需要合并行的第二行以及之后行会走if
      // m === firstMerge 判断需要合并的列是否是基准列，如果是则只满足前面的条件，如果不是则需满足前面+后面的条件
      if (mList[rowVal] && mList[rowVal].newIndex === index && (m === firstMerge ? true : data[index][firstMerge + '-span'].rowspan === 0)) {
        // 判断受影响的列是否是需要合并的列
        const flag = firstMergeColNames.filter((f) => {
          return f === m
        }).length !== 0
        // 判断需要合并的列是否是基准列
        const mcFlag = mergeColNames.filter((mc) => {
          return mc === firstMerge
        }).length === 0
        // 判断基准列只有一行的时候，直接赋值rowspan和colspan为1
        if ((mcFlag && flag) || (flag && data[index][firstMerge + '-span'] && data[index][firstMerge + '-span'].rowspan === 1)) {
          v[m + '-span'] = {
            rowspan: 1,
            colspan: 1
          }
        } else {
          // 判断基准列或其他需要合并列有多行时，第一行rowspan++
          data[mList[rowVal]['index']][m + '-span'].rowspan++
          // 需要合并行除了第一行之后其他行设置rowspan和colspan为0
          v[m + '-span'] = {
            rowspan: 0,
            colspan: 0
          }
          mList[rowVal]['num']++
          mList[rowVal]['newIndex']++
        }
      } else { // 需要合并列第一行走else
        mList[rowVal] = {
          num: 1,
          index: index,
          newIndex: index + 1
        }
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}
