const router = require('koa-router')()
// const AlipaySdk = require('alipay-sdk');
const AlipaySdk = require('alipay-sdk').default;
const fs = require('fs');


const APPID = "2021001192670208";
const APP_SECRET_KEY = "MIIEpAIBAAKCAQEAjo+azDfb6kkyTPzI//+HYnlq400EgUQHQ6C42dwxvV14nvmcq0J1X/7x/I9KNO1GZGg8zQYI/hrR+oRTGwCC1uEP1pOj94Kg+vMGa6yuUl/rwZuDxbthZP+gSaVBaNH4gyoeGNfLMkBfXA9B+ZLu7pK/lSfMpvtmOHIAqj/GspOo4MQmvCH9GpBGaveyxkQ5TcsokHj0+inTTY6qSfNHVXkE2LxpT+axXn9U81mMRPSfHkAsSsdFT5zdn8c1Gpp+mU6XX8HyIwEOkbLSRMU5LljcI24YPrLxjn3rocYSHCK99O2IG3BMLSJKyE2l5gnodV52s2YNs3DBdAS4x9AKLwIDAQABAoIBAGg5UtmkqPGzC8Q/Nw/5l9gFnoCJKRb8TjdCBIK6Od8QvAO1x7VpQ/inofCcLYteQQ1dK75UgDSOFR+KqFtgV0eTiQm+LKziYqC1FeeYemWc3PZRpNfls0GspVnSKGzivUXff9t3wIV/jHf4a6pzopzmyovYagVWXJg9uIC/WZvpwoggSSYxLL4Qn8j6yxrufXqE2XB/TL5cdU8grZOwpG85lyNGt8KK3DhjW9Wi5E8wMs6+n9YSeplye06HPTshZ/gWhhS9fNSJVCGlIxQ6BD+yYW8VhrTp3meYhSfHXii9kgLI/u36i6p0rg+58Q+zkcUbzWqHOHcfVrtS1EH8KdkCgYEAxvKqf04hCAE+zzSj3hrk4odEUIaqC5VnEWY/fdw2YMy4ZzEDud1B0lLg7wO8KYtfJPNt/ckJLbKavOVnc1bt0RGHXu1yD/DPq0QO0G+3Z5v141VeURG3k4pkVAmpJjbUYGB0nvc/2zWK9R+vnIlZxcUbodEFTQDQyV2dE84xFL0CgYEAt3FpQ3WUEomjHlPw0vzjPWbF095wvABKIp6mTx5w5TswDEGfWpls+VDQJVVmloOuSktMheH+zaO+1BkxlBcbkPmDK8Fld2DaRvFT8YoYpXo43OVXZECzLRDvLj0tZ66jRzI4MpYss/wPuICXv7y4VaLLKUUn/81jnBv5gXYGh1sCgYEAxbTSCsExwiq6qF+/mTFQ1G1oTj4FLo3CZ2AdKI5226uWdbYX5dUjXEhQkDY9/2spmibv34yxOmCLtbykGdMBcwrgZE3DVGQTfDeeITVkJeqvaMOlfxsEO/MD0R/ooLlMRJqWSoObSdTjysU6V22HcSp4U07M3cE5u2L0foIh9GECgYEAorDPhYei0ioFY+FYRRcJRix+qN+vpdyv4zJHFwZNY8/xVf1hIc3OavL0Fxg9iqGwkq1jaZ28CI7/sEXDxa4Uwae4YLb9kTlxfNeM9jvejevuwGIZ9oy3G/HX3m9ddIXaw0rTsnGjpeCX5K8PZnouFazyd2ChD+oNPKdGyj1tnt8CgYB99CcYK53p93H4n9y9VYFpp1WNu+2eY1sN96IhpMkDQnjWviBLI70NGNfpvroTsaD+a01KkGhz/el6M+ig2qXN9F8T0B+CJcORDhwwXJU1x1FWCU0SQNBYxHiOYjR4xdr19igItS2PM7ue60OEaVjPanOBvUCcfRDMtBHqyO/Lsw==";
const PAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArJ2qQUX3hORuxPIlvn6Amsjx9eEcGcWeV7WBll91CR5eWSjNAPyqAf6uO0g4z9h4jh1wgUtS8iQB2tEcEDWXZtdZ8n8zhJZpElHvdKWVXuDn+M9C9U4lOqalbad/XvvhNcjXWZKbuyMKsB9FhG7F2c0JbkepNUTFlmBIsuoBYGPmpOzHFFOa5yx8e0bZXb8mMgCBgazPvE8EPxA/n6uaR6gNL5LJ5uphFlUeqWYcZIcMsjrWSIAnOJrDD5SRIqr6fF9DN9s+5WJ/+BcbR8byK0lWjinMRbZtMOLKc/8N+v1MmBAprXqep/UtrY0hCW1kJQxXH3zwQ8MHhn2Hcxwe3QIDAQAB";
// const privateKey = fs.readFileSync('./private_key.pem', 'ascii');

const alipaySdk = new AlipaySdk({
  // 参考下方 SDK 配置
  appId: APPID,
  // privateKey: APP_SECRET_KEY,
  privateKey: APP_SECRET_KEY,
  alipayPublicKey:PAY_PUBLIC_KEY,
});

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  const query = ctx.query;
})

router.get('/queryBuy',async function (ctx, next) {
  const query = ctx.query;
  await alipaySdk.exec('alipay.trade.query',{
    bizContent:{
      outTradeNo:query.outTradeNo,
    }
  }).then((res)=>{
    ctx.body = res;
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
