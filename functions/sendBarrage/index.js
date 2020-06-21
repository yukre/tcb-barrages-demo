const cloud = require('@cloudbase/node-sdk')

exports.main = async (barrage, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV
  })

  var db = app.database()

  db.collection('barrages').add(barrage).then(res => {
    console.log(res)
  })
}
