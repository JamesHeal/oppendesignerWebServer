const router = require('koa-router')()
const fs = require('fs');
const alipaySdk = require('../config/alipayConfig');
const sqlServer = require('../config/serverConfig');

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  const query = ctx.query;
})

router.get('/queryBuy',async (ctx, next)=>{
  const query = ctx.query;
  
  await alipaySdk.exec('alipay.trade.query',{
    bizContent:{
      outTradeNo:query.outTradeNo,
    }
  }).then(async (res)=>{
    if(res.tradeStatus === "TRADE_SUCCESS"){
      const sql = "UPDATE user SET "+ 
      "account_level="+sqlServer.connection.escape("年会员")+
      ",account_status="+sqlServer.connection.escape("正常")+
      ",account_valid_date="+sqlServer.connection.escape(new Date(query.account_valid_date))+
      " WHERE user_id="+query.userId;
      await sqlServer.query(sql).then((value)=>{
        ctx.body = {
          code: 2000,
          message: 'success',
          data:null
        };
      }).catch((err)=>{
        ctx.body = {
          code: 5001,
          message: "server error",
          data:err
        };
      });
    }else{
      ctx.body = {
        code: 1001,
        message: "purchace continue",
        data:null
      };
    }
  });
})

router.get('/buy', async function (ctx, next) {
  const query = ctx.query;
  await alipaySdk.exec('alipay.trade.precreate',{
    bizContent:{
      outTradeNo:query.outTradeNo,
      totalAmount:query.price,
      subject:'Oppendesigner Vip'
    }
  }).then((res)=>{
    ctx.body = res;
  });
  
})

module.exports = router
