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

function update_user(db, row) {
	var app_id = '30002'
	var user = row;
	// db.run("UPDATE users_"+app_id+" SET device_id = $device_id, channel = $channel, server = $server, role_name = $role_name, ip = $ip, current_level = $current_level, current_vip_level = $current_vip_level, total_revenue = $total_revenue, total_login = $total_login, current_rank = $current_rank, current_power = $current_power, current_scene = $current_scene, occupation = $occupation, last_login_time = $last_login_time, last_order_time = $last_order_time, current_ingots = $current_ingots, current_money = $current_money, last_update_time = $last_update_time WHERE id = $id", 
	// {
	// 	$device_id: user.device_id,$channel: user.channel,$server: user.server,$role_name: user.role_name,
	// 	$ip: user.ip,$current_level: user.current_level,$current_vip_level: user.current_vip_level,
	// 	$total_revenue: user.total_revenue,$total_login: user.total_login,$current_rank: user.current_rank,
	// 	$current_power: user.current_power,$current_scene: user.current_scene,$occupation: user.occupation,
	// 	$last_login_time: user.last_login_time,$last_order_time: user.last_order_time,
	// 	$current_ingots: user.current_ingots,$current_money: user.current_money,$last_update_time: currentTimestamp,$id: user.id
	// });
	
	// db.run("UPDATE users_"+app_id+" SET device_id = $device_id, channel = $channel, server = $server, role_name = $role_name, ip = $ip, current_level = $current_level, current_vip_level = $current_vip_level, total_revenue = $total_revenue, total_login = $total_login, current_rank = $current_rank, current_power = $current_power, current_scene = $current_scene, occupation = $occupation, last_login_time = $last_login_time, last_order_time = $last_order_time, current_ingots = $current_ingots, current_money = $current_money, last_update_time = $last_update_time WHERE id = $id", 
	// {
	// 	$device_id: user.device_id,$channel: user.channel,$server: user.server,$role_name: user.role_name,
	// 	$ip: user.ip,$current_level: user.current_level,$current_vip_level: user.current_vip_level,
	// 	$total_revenue: user.total_revenue,$total_login: user.total_login,$current_rank: user.current_rank,
	// 	$current_power: user.current_power,$current_scene: user.current_scene,$occupation: user.occupation,
	// 	$last_login_time: user.last_login_time,$last_order_time: user.last_order_time,
	// 	$current_ingots: user.current_ingots,$current_money: user.current_money,$last_update_time: currentTimestamp,$id: user.id
	// });

	db.run("UPDATE users_"+app_id+" SET current_level = $current_level,current_vip_level = $current_vip_level,total_amount = $total_amount,total_login = $total_login,stage = $stage,current_rank = $current_rank,current_power = $current_power,current_scene = $current_scene,current_diamond = $current_diamond,current_gold_coin = $current_gold_coin,current_card_debris = $current_card_debris,last_update_time = $last_update_time,last_login_time = $last_login_time,last_order_time = $last_order_time WHERE id = $id", 
	{
		$current_level: user.current_level,
		$current_vip_level: user.current_vip_level,
		$total_amount: user.total_amount,
		$total_login: user.total_login,
		$stage: user.stage,
		$current_rank: user.current_rank,
		$current_power: user.current_power,
		$current_scene: user.current_scene,
		$current_diamond: user.current_diamond,
		$current_gold_coin: user.current_gold_coin,
		$current_card_debris: user.current_card_debris,
		$last_update_time: user.last_update_time,
		$last_login_time: user.last_login_time,
		$last_order_time: user.last_order_time,
		$id: user.id
	});

}

module.exports = update_user;