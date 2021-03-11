'use strict';

// 使用 Mock
var Mock = require('mockjs')
var Random = Mock.Random;

var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('users.db');

var Mock = require('mockjs')
var Random = Mock.Random;
var currentTimestamp = Random.now("T");
var app_id = '30002'

db.serialize(function() {
	
	// var stmt = db.prepare("UPDATE users_"+app_id+" SET device_id = $device_id, channel = $channel, server = $server, role_name = $role_name, ip = $ip, current_level = $current_level, current_vip_level = $current_vip_level, total_revenue = $total_revenue, total_login = $total_login, current_rank = $current_rank, current_power = $current_power, current_scene = $current_scene, occupation = $occupation, last_login_time = $last_login_time, last_order_time = $last_order_time, current_ingots = $current_ingots, last_update_time = $last_update_time WHERE id = $id");
	// 随机获取N个用户
	db.all("select * from users_"+app_id+" ", function (err, rowArray) {//ORDER BY random() LIMIT 3
	// db.all("select * from users_"+app_id+" where id = 1", function (err, rowArray) {

		if (rowArray) {
			rowArray.forEach(function (row) {

					console.log(row)

			});
			
		}
		
	});

});

