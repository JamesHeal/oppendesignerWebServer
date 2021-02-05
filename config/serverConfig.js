const mySql = require('mysql');
// const sqlServer = mySql.createConnection({
//   host:'rm-bp10s9gmlydy06443qo.mysql.rds.aliyuncs.com',
//   port:3306,
//   user:'heal',
//   password:'Yi8320592',
//   database : 'test_01'
// });
// const sqlServer = mySql.createPool({
//   host:'rm-bp10s9gmlydy06443qo.mysql.rds.aliyuncs.com',
//   port:3306,
//   user:'heal',
//   password:'Yi8320592',
//   database : 'test_01'
// });
const sqlServer = mySql.createPool({
  host:'rm-bp1t28z6751kk67y4vo.mysql.rds.aliyuncs.com',
  port:3306,
  user:'zhangliuliu',
  password:'Abcd1234',
  database : 'oppendesigner'
});
// sqlServer.connect((sqlErr)=>{
//   console.error("SqlErr",sqlErr);
// });
// const sql = "SELECT * FROM user WHERE email='790364833@qq.com'";
// sqlServer.query(sql,(err,result,fileds)=>{
//   if(err){
//     console.log('[SELECT ERROR] - ',err.message);
//     return;
//   }
//   console.log(result);
// })

const query = function name(sql) {
  return new Promise((resolve,reject)=>{
    sqlServer.getConnection((err,connection)=>{
      if(err){
        reject(err);
      }else{
        connection.query(sql,(qErr,result,fieldInfo)=>{
          connection.release();
          if (qErr) {
            reject(qErr)
          }else{
            resolve({
              sqlResult:result,
              fieldInfo:fieldInfo
            });
          }
        })
      }
    })
  }) 
}

// module.exports.query = query;
// module.exports.connection = sqlServer;
module.exports = {
  query,
  connection: sqlServer
};