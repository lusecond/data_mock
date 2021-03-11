'use strict';


var Mock = require('mockjs')
var Random = Mock.Random;
const proc = require('child_process');


var schedule = require('node-schedule');

function scheduleRecurrenceRule(){

	var rule = new schedule.RecurrenceRule();
	rule.second = 0;

	schedule.scheduleJob(rule, function(){
		var minute = Random.now("mm");
		// console.log(minute);

		if (minute == '00') {
			// console.log(1);
			// console.log(minute);
			proc.execSync('node fs_create_role.js');
		}

		if (minute%10 == 0) {
			// console.log(2);
			// console.log(minute);
			proc.execSync('node fs_gameProcess.js');
		}

		if (minute == '00') {
			// console.log(3);
			// console.log(minute);
			proc.execSync('mv ./log/event.json ./log/`date +"%Y%m%d%H%M%S""_"`event.json && touch ./log/event.json');
		}

	});

}

scheduleRecurrenceRule();












