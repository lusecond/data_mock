'use strict';

var fs = require('fs');
var os = require('os');

function append_file(filename, data) {

	// fs.stat(filename, function (err, stat) {
	// 	if (err && err.errno == -2) {
	//         fs.appendFile(filename,'',function(err){
	// 		    console.log(err);//null
	// 		})
	//     }

	 //    fs.stat(filename, function (err, stat) {
		//     if (err) {
		//         console.log(err);
		//     } else {

		//     	if (stat.isFile()) {
		//     		if (typeof(data)=='string') {
		//     			var s = data;
		//     		} else if (Array.isArray(data)) {
		//     			var s = data.join(os.EOL);
		//     		}
		//     		console.log(stat.size)
		//     		if (stat.size == 0) {
		// 				var append = s;
		// 			} else {
		// 				var append = os.EOL + s;
		// 			}
		// 			fs.appendFile(filename, append, function (err) {
		// 			    if (err) {
		// 			        console.log(err);
		// 			    }
		// 			});
		//     	}

		//     }
		// });

	// });

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

