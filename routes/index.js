const router = require('koa-router')()
const sqlServer = require('../config/serverConfig');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/getUserInfoById', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `SELECT * FROM user WHERE user_id='${query.userId}'`
  await sqlServer.query(sql).then((value)=>{
    ctx.body = {
      code: 2000,
      message: 'success',
      data:value.sqlResult[0]
    };
  }).catch((err)=>{
    ctx.body = {
      code: 5001,
      message: "server error",
      data:err
    };
  })
})

router.get('/getUserInfoByEmail', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `SELECT * FROM user WHERE email='${query.email}'`
  await sqlServer.query(sql).then((value)=>{
    ctx.body = {
      code: 2000,
      message: 'success',
      data:value.sqlResult[0]
    };
  }).catch((err)=>{
    ctx.body = {
      code: 5001,
      message: "server error",
      data:err
    };
  })
})

router.get('/getOppendesigner', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `SELECT * FROM oppendesigner`;
  await sqlServer.query(sql).then((value)=>{
    ctx.body = {
      code: 2000,
      message: 'success',
      data:value.sqlResult
    };
  }).catch((err)=>{
    ctx.body = {
      code: 5001,
      message: "server error",
      data:err
    };
  })
})

router.post('/uploadOppendesigner', async (ctx,next)=>{
  let postData= JSON.parse(ctx.request.body);
  const sql = `UPDATE oppendesigner SET opp_file_add='${postData.opp_file_add}', dynamo_edition='${postData.dynamo_edition}', opp_edition='${postData.opp_edition}' WHERE id = ${postData.id}`;
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
  })
})

router.get('/deleteOppendesigner', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `DELETE FROM oppendesigner where id=${query.id}`
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
  })
})

router.get('/addOppendesigner', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `INSERT INTO oppendesigner (dynamo_edition,opp_edition,opp_file_add) VALUES ('default','default','default')`
  await sqlServer.query(sql).then((value)=>{
    ctx.body = {
      code: 2000,
      message: 'success',
      data:value.sqlResult.insertId
    };
  }).catch((err)=>{
    ctx.body = {
      code: 5001,
      message: "server error",
      data:err
    };
  })
})



router.get('/changeMacAddress', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `UPDATE user SET mac_add='${query.mac_add}' WHERE user_id = ${query.userId}`;
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
  })
})

router.get('/getPaymentInfo', async (ctx,next)=>{
  const query = ctx.query;
  const sql = `SELECT * FROM payment_info`;
  await sqlServer.query(sql).then((value)=>{
    ctx.body = {
      code: 2000,
      message: 'success',
      data:value.sqlResult[0]
    };
  }).catch((err)=>{
    ctx.body = {
      code: 5001,
      message: "server error",
      data:err
    };
  })
})

router.get('/getServerNow', async (ctx,next)=>{
  const now  = new Date();
  ctx.body = {
    code: 2000,
    message: 'success',
    data: now.toLocaleString()
  };
})

router.post('/resetPassword', async (ctx,next)=>{
  let postData= ctx.request.body
  const sql = `UPDATE user SET password = '${postData.passWord}' WHERE user_id = ${postData.userId}`;
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
  })
})

router.post('/register', async (ctx,next)=>{
  let postData= ctx.request.body;
  const findDuplicate = `SELECT * FROM user WHERE email='${postData.email}'`;
  await sqlServer.query(findDuplicate).then(async (value)=>{
    if(value.sqlResult.length > 0){
      ctx.body = {
        code: 4001,
        message: 'email hae exsit',
        data:null
      };
    }else {
      const sql = "INSERT INTO user "+
      "(email,password,phone,id_number,region,province,city,unit,taxpayer_id_number,unit_address,account_level,account_status,account_valid_date,mac_add,occupation) "+
      "VALUES ("+
      sqlServer.connection.escape(postData.email)+","+
      sqlServer.connection.escape(postData.password)+","+
      sqlServer.connection.escape(postData.phone)+","+
      sqlServer.connection.escape(postData.id_number)+","+
      sqlServer.connection.escape(postData.region)+","+
      sqlServer.connection.escape(postData.province)+","+
      sqlServer.connection.escape(postData.city)+","+
      sqlServer.connection.escape(postData.unit)+","+
      sqlServer.connection.escape(postData.taxpayer_id)+","+
      sqlServer.connection.escape(postData.unit_address)+","+
      sqlServer.connection.escape(postData.account_level)+","+
      sqlServer.connection.escape(postData.account_status)+","+
      sqlServer.connection.escape(new Date(postData.account_valid_date))+","+
      sqlServer.connection.escape(postData.mac_add)+","+
      sqlServer.connection.escape(postData.occupation)+
      ")"
      await sqlServer.query(sql).then((value)=>{
        ctx.body = {
          code: 2000,
          message: 'success',
          data:value.sqlResult.insertId
        };
      }).catch((err)=>{
        ctx.body = {
          code: 5001,
          message: "server error",
          data:err
        };
      })
    }
  })
  
})

router.post('/saveUserInfo', async (ctx,next)=>{
  let postData= ctx.request.body;
  const sql = "UPDATE user SET "+ 
  "phone="+sqlServer.connection.escape(postData.phone)+
  ",unit="+sqlServer.connection.escape(postData.unit)+
  ",id_number="+sqlServer.connection.escape(postData.id_number)+
  ",occupation="+sqlServer.connection.escape(postData.occupation)+
  ",unit_address="+sqlServer.connection.escape(postData.unit_address)+
  ",taxpayer_id_number="+sqlServer.connection.escape(postData.taxpayer_id_number)+
  " WHERE email="+sqlServer.connection.escape(postData.email);
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
  })
})

router.post('/login', async function (ctx, next,) {
  const query = ctx.query;
  let postData= ctx.request.body
  const sql = `SELECT * FROM user WHERE email='${postData.email}'`;
  await sqlServer.query(sql).then((value)=>{
    if (value.sqlResult.length === 0) {
      ctx.body = {
        code: 4001,
        message: "email dont't exist",
        data:null
      }
    }else if (value.sqlResult[0].password === postData.passWord) {
      const loginTimeSql = `UPDATE user SET last_login = ${sqlServer.connection.escape(new Date())} WHERE user_id = '${value.sqlResult[0]['user_id']}'`
      sqlServer.query(loginTimeSql).then((value)=>{
        console.log('loginTimeSql',value);
      }).catch((err)=>{
        console.log('loginTimeSql',err);
      })
      ctx.body = {
        code: 2000,
        message: 'success',
        data:value.sqlResult[0].user_id
      };
    }else{
      ctx.body = {
        code: 2000,
        message: 'password error',
        data:null
      };
    }
  }).catch((err)=>{
    ctx.body = {
      code: 5001,
      message: "server error",
      data:err
    };
  })
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
