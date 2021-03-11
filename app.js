'use strict';

// 使用 Mock
var Mock = require('mockjs')
var data = 

Mock.mock({
  "abc|2-4": {
    "110000": "北京市",
    "120000": "天津市",
    "130000": "河北省",
    "140000": "山西省"
  }
})

// 输出结果
// console.log(JSON.stringify(data, null, 4))

//事件数据样例
console.log(JSON.stringify(Mock.mock({
  "#account_id": "ABCDEFG-123-abc",
  "#distinct_id": "F53A58ED-E5DA-4F18-B082-7E1228746E88",
  "#type": "track",
  "#ip": "192.168.171.111",
  "#uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "#time": "2017-12-18 14:37:28.527",
  "#event_name": "test",//仅事件数据有
  "properties": {
    "argString": "abc",
    "argNum": 123,
    "argBool": true
  }
}), null, 4))


//用户属性样例
console.log(JSON.stringify(Mock.mock({
  "#account_id": "ABCDEFG-123-abc",
  "#distinct_id": "F53A58ED-E5DA-4F18-B082-7E1228746E88",
  "#type": "user_set",//"user_setOnce"、"user_add"、"user_unset"、"user_append"、"user_del"
  "#ip": "192.168.171.111",
  "#uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "#time": "2017-12-18 14:37:28.527",
  "properties": {
    "userArgString": "abc",
    "userArgNum": 123,
    "userArgBool": true
  }
}), null, 4))

