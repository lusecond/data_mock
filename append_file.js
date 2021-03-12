'use strict';

var fs = require('fs');
var os = require('os');

function append_file(filename, data) {

	if (typeof(data)=='string') {
		var s = data;
	} else if (Array.isArray(data)) {
		var s = data.join(os.EOL);
	}
	var append = os.EOL + s;
	fs.appendFile(filename, append, function (err) {
	    if (err) {
	        console.log(err);
	    }
	});
    
}

module.exports = append_file;

