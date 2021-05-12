module.exports = {
  //dev 开发环境  prod 生成环境
  enviroment:'prod',
  wx:{
    appid:'',
    secret:'',
    //appid和secret用自己微信的
  },
  //生成令牌参数
  security:{
    secretKey:'abcdefg',
    expiresIn:60*60*10000
  }
}
