const router = require('koa-router')()
const fs = require('fs');
const sqlServer = require('../config/serverConfig');

router.post('/login', async function (ctx, next,) {
  const query = ctx.query;
  console.log("ctx:",ctx);
  let postData= await paresPostData(ctx)
  // const sql = "SELECT * FROM user WHERE email="+postData.email;
  const sql = "SELECT * FROM user WHERE email='790364833@qq.com'";
  sqlServer(sql,(err,result,fileds)=>{
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    ctx.body = result;
    console.log(result);
  })
})


router.get('/unLogin', async function name(params) {
  
})

function paresPostData(ctx){
  return new Promise((resolve,reject)=>{
    try{
      let postData=''
      ctx.req.addListener('data',(data)=>{
          postData+=data
      })
      ctx.req.on('end', ()=>{
          let postdata=parseData(postData)
          resolve(postdata)
      })
    }catch(err){
      reject(err)
    }
  })
}

function parseData(queryStr){
  let queryData={}
  let queryList=queryStr.split('&')
  for(let [index, queryItem] of queryList.entries()){
    let itemList= queryItem.split('=')
    queryData[itemList[0]]=decodeURIComponent(itemList[1])
  }
  return queryData
}

module.exports = router
