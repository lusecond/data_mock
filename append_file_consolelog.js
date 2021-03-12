'use strict';

var fs = require('fs');
var os = require('os');

function append_file(filename, data) {

	console.log(data);

}

module.exports = append_file_consolelog;

// node run.js | cronolog /data/luwn/fs_data_mock/log/%Y%m%d%H0003_event.json