'use strict';


var Mock = require('mockjs')
var Random = Mock.Random;
const proc = require('child_process');


var schedule = require('node-schedule');

function myExec(cmd) {
    return proc.spawnSync("/bin/sh", ["-c", cmd], {cwd: '/data/luwn/fs_data_mock'});
}

function scheduleRecurrenceRule(){

	var rule = new schedule.RecurrenceRule();
	rule.second = 0;

	schedule.scheduleJob(rule, function(){
		var minute = Random.now("mm");

		if (minute == '00') {
			var c = myExec("/usr/local/node-v15/bin/node fs_create_role.js | /usr/sbin/cronolog /data/luwn/fs_data_mock/log/%Y%m%d%H0001_event.json");
			console.log(c.stdout.toString('utf8'))
		}

		if (minute%10 == 0) {
			var c = myExec("/usr/local/node-v15/bin/node fs_gameProcess.js | /usr/sbin/cronolog /data/luwn/fs_data_mock/log/%Y%m%d%H0001_event.json");
			console.log(c.stdout.toString('utf8'))
		}

	});

}

scheduleRecurrenceRule();
