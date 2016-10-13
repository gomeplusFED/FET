import chalk from 'chalk';
var format = require('util').format;

var prefix = '   FET';
var sep = chalk.gray('·');

exports.log = function() {
	var msg = format.apply(format, arguments);
	console.log(chalk.white(prefix), sep, msg);
};

exports.fatal = function(message) {
	if (message instanceof Error) message = message.message.trim();
	var msg = format.apply(format, arguments);
	console.error(chalk.red(prefix), sep, msg);
};

exports.success = function() {
	var msg = format.apply(format, arguments);
	console.log(chalk.green(prefix), sep, msg);
};
