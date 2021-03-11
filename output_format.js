'use strict';

function output_format(data, format='write') {
	if (format == 'look') {
		return JSON.stringify(data, null, 4)
	} else {
		return JSON.stringify(data)
	}
}

module.exports = output_format;