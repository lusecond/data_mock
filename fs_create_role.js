'use strict';

// 使用 Mock
var Mock = require('mockjs')
var Random = Mock.Random;

var append_file = require('./append_file');
var output_format = require('./output_format');

var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('users.db');

var user_num = 200;
var max_role_num_pre_user = 2;

var app_id = '30049'

db.serialize(function() {
	
	// db.run("CREATE TABLE IF NOT EXISTS users_"+app_id+" ( id INTEGER PRIMARY KEY AUTOINCREMENT,real_account_id TEXT,account_id TEXT,distinct_id TEXT,device_id TEXT,register_ip TEXT,role_id TEXT,register_time TEXT,channel TEXT,server TEXT,role_name TEXT,ip TEXT,current_level INTEGER,current_vip_level INTEGER,total_revenue INTEGER,total_login INTEGER,current_rank INTEGER,current_power INTEGER,current_scene INTEGER,occupation TEXT,last_login_time INTEGER,last_order_time INTEGER,current_ingots INTEGER,current_money INTEGER,last_update_time INTEGER)");
	db.run("CREATE TABLE IF NOT EXISTS users_"+app_id+" (	id INTEGER PRIMARY KEY AUTOINCREMENT,	account_id TEXT,	role_id TEXT,	device_id TEXT,	register_ip TEXT,	register_time TEXT,	channel TEXT,	server TEXT,	role_name TEXT,	ip TEXT,	current_level INTEGER,	current_vip_level INTEGER,	total_amount INTEGER,	total_login INTEGER,	stage INTEGER,	current_rank INTEGER,	current_power INTEGER,	current_scene INTEGER,	current_diamond INTEGER,	current_gold_coin INTEGER,	current_card_debris INTEGER,	last_update_time INTEGER,	last_login_time INTEGER,	last_order_time INTEGER,  total_pay_frequency  INTEGER, current_task_id  INTEGER, 	battle_first_try_1 TEXT, battle_first_try_2 TEXT, battle_first_try_3 TEXT, task_frequency INTEGER)");

	// var stmt = db.prepare("INSERT INTO users_"+app_id+" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	var stmt = db.prepare("INSERT INTO users_"+app_id+" VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
	for (var i = 0; i < user_num; i++) {
		
		var account_id = Random.string("lower", 32)

		for (var j = 0; j < Random.natural(1, max_role_num_pre_user); j++) {

			var device_id = Random.string("lower", 32)
			var role_id = Random.string("lower", 32)

			var user = Mock.mock({
				//角色（静态数据）
				"role_static":{
					"real_account_id":account_id,
					"account_id":account_id,
					"distinct_id":app_id + '_' + device_id,
					"role_id":role_id,
					"register_time":'@now("yyyy-MM-dd HH:mm:ss.SS")',
				},
				//角色（准静态数据）
				"role_quasistatic":{
					"device_id":device_id,
					"channel":app_id + "@pick(['10', '11', '12'])",
					"server":"@pick(['10', '11', '12'])",//合服引起的变化
					"role_name":'@cword(3, 5)',
					"occupation":"@pick(['战士', '法师', '道士'])",//职业  转职会触发变化
				},
				//角色（动态数据）
				"role_dynamic":{
					"ip":'@ip()',
					"current_level":0,//当前等级
					"current_vip_level":0,//当前VIP等级
					"total_amount":0,//累计付费金额
					"total_login":0,//累计登录次数
					"current_rank":0,//当前转数
					"current_power":0,//当前战力
					"current_scene":0,//当前场景
					"last_login_time":0,//最后登录时间
					"last_order_time":0,//最后付费时间
					"current_ingots":0,//当前元宝
					"current_money":0,//当前灵石

					"stage":0,
					"current_diamond":0,
					"current_gold_coin":0,
					"current_card_debris":0,
					"total_pay_frequency":0,//累计付费次数
					"current_task_id":"@pick(['2', '3', '4', '5'])",

					"battle_first_try_1":"T",
					"battle_first_try_2":"T",
					"battle_first_try_3":"T",

					"task_frequency":0,
				},
				"role_manage":{
					"last_update_time":'@now("T")',
				},
			})

		}

		user = event_0(user)
		user_0()

		// stmt.run(null,user.role_static.real_account_id,user.role_static.account_id,user.role_static.distinct_id,user.role_quasistatic.device_id,user.role_dynamic.ip,user.role_static.role_id,user.role_static.register_time,user.role_quasistatic.channel,user.role_quasistatic.server,user.role_quasistatic.role_name,user.role_dynamic.ip,user.role_dynamic.current_level,user.role_dynamic.current_vip_level,user.role_dynamic.total_revenue,user.role_dynamic.total_login,user.role_dynamic.current_rank,user.role_dynamic.current_power,user.role_dynamic.current_scene,user.role_quasistatic.occupation,user.role_dynamic.last_login_time,user.role_dynamic.last_order_time,user.role_dynamic.current_ingots,user.role_dynamic.current_money,parseInt(user.role_manage.last_update_time));
		stmt.run(null,user.role_static.account_id,user.role_static.role_id,user.role_quasistatic.device_id,user.role_dynamic.ip,user.role_static.register_time,user.role_quasistatic.channel,user.role_quasistatic.server,user.role_quasistatic.role_name,user.role_dynamic.ip,user.role_dynamic.current_level,user.role_dynamic.current_vip_level,user.role_dynamic.total_amount,user.role_dynamic.total_login,user.role_dynamic.stage,user.role_dynamic.current_rank,user.role_dynamic.current_power,user.role_dynamic.current_scene,user.role_dynamic.current_diamond,user.role_dynamic.current_gold_coin,user.role_dynamic.current_card_debris,parseInt(user.role_manage.last_update_time),user.role_dynamic.last_login_time,user.role_dynamic.last_order_time,user.role_dynamic.total_pay_frequency,user.role_dynamic.current_task_id,user.role_dynamic.battle_first_try_1,user.role_dynamic.battle_first_try_2,user.role_dynamic.battle_first_try_3,user.role_dynamic.task_frequency);

	}

	stmt.finalize();

});

// var app_id = '30001'
// db.all("select * from users_"+app_id, function (err, row) {
// 	console.log(row)
// });

db.close();


//注册
function event_0(user) {

	var log = Mock.mock({
	  "#account_id": user.role_static.account_id,
	  "#role_id": user.role_static.role_id,
	  "#app_id": app_id,
	  "#app_version": "@pick(['1.0.2'])",
	  "#data_version": "@pick(['1'])",
	  "#ip": user.role_dynamic.ip,
	  "#type": "track",
	  "#record_id": '@upper("@guid")',
	  "#session_id": '@upper("@guid")',
	  "#event_time": Random.now("T"),
	  "#event_name": "create_role",
	  "properties": {
	    "#server_id": user.role_quasistatic.server,
	    "#channel_id": user.role_quasistatic.channel,
	    "#device_id": user.role_quasistatic.device_id,
	  }
	});
	append_file('./log/event.json', output_format(log))

	return user;
}

function user_0() {

}


