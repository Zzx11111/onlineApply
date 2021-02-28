/***
 * @name 工具函数
 */
const jwt = require('jsonwebtoken');// 生成token入口
const config = require('../config/config')
const findMembers = function (instance, {
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null)
      return []

    let names = Reflect.ownKeys(instance)
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })

    return [...names, ..._find(instance.__proto__)]
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true
      }
    }
    if (prefix)
      if (value.startsWith(prefix))
        return true
    if (specifiedType)
      if (instance[value] instanceof specifiedType)
        return true
  }

  return _find(instance)
}
// 颁发token令牌： uid：用户id号，scope：用户权限
const generateToken = function(uid,scope){
  const token = jwt.sign({
    uid,
    scope
  },config.security.secretKey,{
    expiresIn:config.security.expiresIn
  })
  return token
}

/**
 * 判断两个地点的距离
 * @param {} lat1 
 * @param {*} lng1 
 * @param {*} lat2 
 * @param {*} lng2 
 */
const GetDistance = function( lat1,  lng1,  lat2,  lng2){
  var radLat1 = lat1*Math.PI / 180.0;
  var radLat2 = lat2*Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  //console.log(s)
  s = s *6378.137 ;// EARTH_RADIUS;
  //console.log(s)
  s = Math.round(s * 10000) / 10000;
  //console.log(s)
  return s;
}

module.exports = {
  findMembers,
  generateToken,
  GetDistance
}

