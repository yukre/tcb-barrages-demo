const cloud = require('@cloudbase/node-sdk')

exports.main = async (event, context) => {
  console.time()

  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV
  })

  const db = app.database()
  const DB_COLLECTION = 'barrages'
  const MAX_CONUT = 100
  const MAX_LIMIT = 100

  // 先取出集合记录总数
  const countResult = await db.collection(DB_COLLECTION).count()
  const total = countResult.total > MAX_CONUT ? MAX_CONUT : countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)

  console.log('total count: ' + total + ' batch time: ' + batchTimes)

  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection(DB_COLLECTION).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    console.timeEnd()

    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg
    }
  })
}
