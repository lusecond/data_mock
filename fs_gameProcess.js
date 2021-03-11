'use strict';

var fs = require('fs');
var os = require('os');
var Mock = require('mockjs')
var Random = Mock.Random;
var currentTimestamp = Random.now("T");

var update_user = require('./update_user');
var append_file = require('./append_file');
var output_format = require('./output_format');

var app_id = '30049'

var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('users.db');

gameProcess()

function gameProcess() {
	var user_num = 200;
	db.all("select * from users_"+app_id+" ORDER BY random() LIMIT "+user_num, function (err, rowArray) {

		if (rowArray) {
			rowArray.forEach(function (row) {
				run_mock_events(row)
					// console.log(row)
			});
		}
		
	});
}


function run_mock_events(row) {
	var user = row
	//每个用户执行1-3个登录循环
	for (var i=1; i<=Random.natural(1, 3); i++) {
    	user = event_1(user)
    	//每个登录循环执行5到10个随机事件
		for (var j=1; j<=Random.natural(5, 10); j++) {
		    // console.log("q" + user.last_update_time)
		    // user = event_2(user)
		    eval("user = event_"+Random.natural(3, 8)+"(user)")
		    // user = event_2(user)
		    // console.log("h" + user.last_update_time)
		}
	    user = event_998(user)
	    update_user(db, user);
	    // console.log(user)
	}

}


//进入游戏
function event_1(user) {

	//user数据更新
	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;
	// console.log(user.last_update_time)
	user.last_login_time = user.last_update_time
	// console.log(user.last_login_time)
	user.total_login = user.total_login + 1;


	//role_login 角色登录专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "role_login",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id": user.channel,
	    "#device_id": user.device_id,
	    "#os": "@pick(['1'])",
	    "#os_version": "@pick(['6.2'])",
	    "#device_type": "@pick(['华为'])",
	    "sum_amount": user.total_amount,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	return user;
}

//付费6元钻石礼包
function event_2(user) {

// 	//create_order 创建订单专属内容
// var log = Mock.mock({
//   "#account_id": user.account_id,
//   "#role_id": user.role_id,
//   "#app_id": app_id,
//   "#app_version": "@pick(['1.0.2'])",
//   "#data_version": "@pick(['1'])",
//   "#ip": user.ip,
//   "#type": "track",
//   "#record_id": '@upper("@guid")',
//   "#session_id": "",
//   "#event_time": currentTimestamp,
//   "#event_name": "create_order",
//   "properties": {
//     "#server_id": user.server,
//     "#channel_id":user.channel,
//     "#device_id": user.device_id,
//     "#os": "@pick(['1'])",
//     "#os_version": "@pick(['6.2'])",
//     "#device_type": "@pick(['华为'])",
//     "order_id": "",
//     "item_id": "",
//     "amount": "",
//     "currency": "",
//     "pay_frequency": "",
//     "sum_amount": user.total_amount,
//     "task_id": user.current_task_id,
//     "vip_level": user.current_vip_level,
//     "level": user.current_level,
//   }
// });

// return user;

}

//支付成功
function event_3(user) {

	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;
	user.current_diamond = user.current_diamond + 60;
	user.current_gold_coin = user.current_gold_coin + 600;
	user.current_card_debris = user.current_card_debris + 12;
	user.current_level = user.current_level + 1;
	user.total_pay_frequency = user.total_pay_frequency + 1;
	user.total_amount = user.total_amount + 600;

	//pay 付费成功专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "pay",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "#device_id": user.device_id,
	    "#os": "@pick(['1'])",
	    "#os_version": "@pick(['6.2'])",
	    "#device_type": "@pick(['华为'])",
	    "order_id": '@string("lower", 32)',
	    "item_id": "@pick(['1'])",
	    "amount": "600",
	    "pay_frequency": user.total_pay_frequency,
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))


	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "money_type": "diamond",
	    "change": "60",
	    "remain": user.current_diamond,
	    "reason": "支付成功",
	    "detail": "支付成功",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "money_type": "gold_coin",
	    "change": "600",
	    "remain": user.current_gold_coin,
	    "reason": "支付成功",
	    "detail": "支付成功",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//item_change 道具变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "item_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "item_id": "@pick(['1'])",
	    "change": "12",
	    "remain": user.current_card_debris,
	    "reason": "支付成功",
	    "detail": "支付成功",
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//level_up 角色升级专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "level_up",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "level": user.current_level - 1,
	    "new_level": user.current_level,
	    "vip_level": user.current_vip_level,
	  }
	});
	append_file('./log/event.json', output_format(log))


	return user;

}

//送鲜花
function event_4(user) {

	if (user.current_diamond < 5) {
		return user;
	}

	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;
	user.current_diamond = user.current_diamond - 5;

	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "-",
	    "money_type": "diamond",
	    "change": "5",
	    "remain": user.current_diamond,
	    "reason": "送鲜花",
	    "detail": "送鲜花",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))


	return user;

}

//合成卡牌
function event_5(user) {

	if (user.current_gold_coin < 500) {
		return user;
	}

	if (user.current_card_debris < 20) {
		return user;
	}

	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;
	user.current_gold_coin = user.current_gold_coin - 500;
	user.current_card_debris = user.current_card_debris - 20;

	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "-",
	    "money_type": "gold_coin",
	    "change": "500",
	    "remain": user.current_gold_coin,
	    "reason": "合成卡牌",
	    "detail": "合成卡牌",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//item_change 道具变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "item_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "-",
	    "item_id": "@pick(['1'])",
	    "change": "20",
	    "remain": user.current_card_debris,
	    "reason": "合成卡牌",
	    "detail": "合成卡牌",
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	return user;

}

//参与活动
function event_6(user) {

	if (user.current_diamond < 5) {
		return user;
	}

	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;
	user.current_diamond = user.current_diamond - 5;

	//activity_attend 参加活动专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "activity_attend",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "activity_type": "日常随机活动",
	    "activity_id": "@pick(['1','2','3'])",
	    "sum_amount": user.total_amount,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

		//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "-",
	    "money_type": "diamond",
	    "change": "5",
	    "remain": user.current_diamond,
	    "reason": "参与活动",
	    "detail": "参与活动",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	return user;

}

//遭遇暗雷
//战斗结束
function event_7(user) {

	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;
	user.current_card_debris = user.current_card_debris + 1;
	user.current_gold_coin = user.current_gold_coin + 100;

	//battle_start 开始战斗专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "battle_start",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "battle_type": "暗雷",
	    "battle_id": "2",
	    "boss_battle": "F",
	    "first_try": "F",
	    "sum_amount": user.total_amount,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//battle_result 战斗结算专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "battle_result",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "battle_type": "暗雷",
	    "battle_id": "2",
	    "boss_battle": "F",
	    "first_try": "F",
	    "battle_start_time": currentTimestamp,
	    "result": "@pick(['满星通关','1星过关','战败'])",
	    "sum_amount": user.total_amount,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "money_type": "gold_coin",
	    "change": "100",
	    "remain": user.current_gold_coin,
	    "reason": "战斗结束",
	    "detail": "战斗结束",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//item_change 道具变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "item_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "item_id": "2",
	    "change": "1",
	    "remain": user.current_card_debris,
	    "reason": "战斗结束",
	    "detail": "战斗结束",
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	return user;

}


//进入副本
//副本设置M个关卡，挑战某关卡
//关卡挑战结束
//副本通关
function event_8(user) {

	// console.log(user.last_update_time)
	user.last_update_time = user.last_update_time + 1000;

	//task_get 领取任务专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "task_get",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "task_type": "副本任务",
	    "task_id": user.current_task_id,
	    "task_frequency": user.task_frequency,
	    "sum_amount": user.total_amount,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))


	for (var i=1; i<=Random.natural(1, 3); i++) {

		//battle_start 开始战斗专属内容
		var log = Mock.mock({
		  "#account_id": user.account_id,
		  "#role_id": user.role_id,
		  "#app_id": app_id,
		  "#app_version": "@pick(['1.0.2'])",
		  "#data_version": "@pick(['1'])",
		  "#ip": user.ip,
		  "#type": "track",
		  "#record_id": '@upper("@guid")',
		  "#session_id": "",
		  "#event_time": currentTimestamp,
		  "#event_name": "battle_start",
		  "properties": {
		    "#server_id": user.server,
		    "#channel_id":user.channel,
		    "battle_type": "副本关卡",
		    "battle_id": "3",
		    "boss_battle": "F",
		    "first_try": user["battle_first_try_" + i],
		    "sum_amount": user.total_amount,
		    "vip_level": user.current_vip_level,
		    "level": user.current_level,
		  }
		});
		append_file('./log/event.json', output_format(log))

		//battle_result 战斗结算专属内容
		var log = Mock.mock({
		  "#account_id": user.account_id,
		  "#role_id": user.role_id,
		  "#app_id": app_id,
		  "#app_version": "@pick(['1.0.2'])",
		  "#data_version": "@pick(['1'])",
		  "#ip": user.ip,
		  "#type": "track",
		  "#record_id": '@upper("@guid")',
		  "#session_id": "",
		  "#event_time": currentTimestamp,
		  "#event_name": "battle_result",
		  "properties": {
		    "#server_id": user.server,
		    "#channel_id":user.channel,
		    "battle_type": "副本关卡",
		    "battle_id": "3",
		    "boss_battle": "F",
		    "first_try": user["battle_first_try_" + i],
		    "battle_start_time": currentTimestamp,
		    "result": "@pick(['满星通关','1星过关','战败'])",
		    "sum_amount": user.total_amount,
		    "vip_level": user.current_vip_level,
		    "level": user.current_level,
		  }
		});
		append_file('./log/event.json', output_format(log))

		//money_change 虚拟币变更专属内容
		var log = Mock.mock({
		  "#account_id": user.account_id,
		  "#role_id": user.role_id,
		  "#app_id": app_id,
		  "#app_version": "@pick(['1.0.2'])",
		  "#data_version": "@pick(['1'])",
		  "#ip": user.ip,
		  "#type": "track",
		  "#record_id": '@upper("@guid")',
		  "#session_id": "",
		  "#event_time": currentTimestamp,
		  "#event_name": "money_change",
		  "properties": {
		    "#server_id": user.server,
		    "#channel_id":user.channel,
		    "change_type": "+",
		    "money_type": "gold_coin",
		    "change": "100",
		    "remain": user.current_gold_coin + 100,
		    "reason": "关卡挑战结束",
		    "detail": "关卡挑战结束",
		    "consume_num": "1",
		    "sum_amount": user.total_amount,
		    "task_id": user.current_task_id,
		    "vip_level": user.current_vip_level,
		    "level": user.current_level,
		  }
		});
		append_file('./log/event.json', output_format(log))

		//item_change 道具变更专属内容
		var log = Mock.mock({
		  "#account_id": user.account_id,
		  "#role_id": user.role_id,
		  "#app_id": app_id,
		  "#app_version": "@pick(['1.0.2'])",
		  "#data_version": "@pick(['1'])",
		  "#ip": user.ip,
		  "#type": "track",
		  "#record_id": '@upper("@guid")',
		  "#session_id": "",
		  "#event_time": currentTimestamp,
		  "#event_name": "item_change",
		  "properties": {
		    "#server_id": user.server,
		    "#channel_id":user.channel,
		    "change_type": "+",
		    "item_id": "2",
		    "change": "1",
		    "remain": user.current_card_debris + 1,
		    "reason": "关卡挑战结束",
		    "detail": "关卡挑战结束",
		    "vip_level": user.current_vip_level,
		    "level": user.current_level,
		  }
		});
		append_file('./log/event.json', output_format(log))

		if (user["battle_first_try_" + i] == "T") {
			user["battle_first_try_" + i] = "F"
		}

	}

	//task_result 任务结算专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "task_result",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "task_type": "副本任务",
	    "task_id": user.current_task_id,
	    "task_start_time": currentTimestamp,
	    "complete": "T",
	    "task_frequency": user.task_frequency + 1,
	    "sum_amount": user.total_amount,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "money_type": "diamond",
	    "change": "6",
	    "remain": user.current_diamond + 6,
	    "reason": "副本通关",
	    "detail": "副本通关",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//money_change 虚拟币变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "money_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "money_type": "gold_coin",
	    "change": "100",
	    "remain": user.current_gold_coin + 100,
	    "reason": "副本通关",
	    "detail": "副本通关",
	    "consume_num": "1",
	    "sum_amount": user.total_amount,
	    "task_id": user.current_task_id,
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//item_change 道具变更专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "item_change",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "change_type": "+",
	    "item_id": "2",
	    "change": "6",
	    "remain": user.current_card_debris + 6,
	    "reason": "副本通关",
	    "detail": "副本通关",
	    "vip_level": user.current_vip_level,
	    "level": user.current_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	//level_up 角色升级专属内容
	var log = Mock.mock({
	  "#account_id": user.account_id,
	  "#role_id": user.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": "",
	  "#event_time": currentTimestamp,
	  "#event_name": "level_up",
	  "properties": {
	    "#server_id": user.server,
	    "#channel_id":user.channel,
	    "level": user.current_level,
	    "new_level": user.current_level + 2,
	    "vip_level": user.current_vip_level,
	  }
	});
	append_file('./log/event.json', output_format(log))

	user.task_frequency = user.task_frequency + 1;

	return user;

}


//切换角色
function event_998(user) {

	for (var i=1; i<=Random.natural(0, 1); i++) {

		// console.log(user.last_update_time)
		user.last_update_time = user.last_update_time + 1000;
		//role_logout 角色登出专属内容
		var log = Mock.mock({
		  "#account_id": user.account_id,
		  "#role_id": user.role_id,
		  "#app_id": app_id,
		  "#app_version": "@pick(['1.0.2'])",
		  "#data_version": "@pick(['1'])",
		  "#ip": user.ip,
		  "#type": "track",
		  "#record_id": '@upper("@guid")',
		  "#session_id": "",
		  "#event_time": currentTimestamp,
		  "#event_name": "role_logout",
		  "properties": {
		    "#server_id": user.server,
		    "#channel_id":user.channel,
		    "pay_frequency": user.total_pay_frequency,
		    "sum_amount": user.total_amount,
		    "task_id": user.current_task_id,
		    "vip_level": user.current_vip_level,
		    "level": user.current_level,
		  }
		});
		append_file('./log/event.json', output_format(log))

	}
	
	return user;

}

