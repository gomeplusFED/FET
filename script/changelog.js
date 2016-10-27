// auto generate changelog
var fs = require('fs');
var execSync = require('child_process').execSync;

var fetch = require('node-fetch');
var chalk = require('chalk');

fs.writeFileSync('./CHANGELOG.md', '# FET Changelog \n\n');

function formatTime(date) {
	let newDate = new Date(date);
	var year = newDate.getFullYear();
	var month = newDate.getMonth() + 1;
	var day = newDate.getDate();

	var hour = newDate.getHours();
	var minute = newDate.getMinutes();
	var second = newDate.getSeconds();
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}

fetch('https://api.github.com/repos/gomeplusFED/FET/releases')
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		res.forEach((item) => {
			let tagName = item.tag_name;
			let time = item.created_at;
			let body = item.body.replace(/###/g, '#####');
			fs.appendFileSync('./CHANGELOG.md', `### ${tagName}  \n\`${formatTime(time)}\`  \n<hr>  \n${body}  \n\n`);
		});
		execSync('git commit -am "update CHANGELOG.md" && git push origin master');
		console.log(chalk.green('succeed.'));
	});
