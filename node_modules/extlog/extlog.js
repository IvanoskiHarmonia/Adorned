var color = {
	"reset": "\u001b[0m",
	"bold": "\u001b[1m",
	
	"foreground": {
		"black": "\u001b[30m",
		"red": "\u001b[31m",
		"green": "\u001b[32m",
		"yellow": "\u001b[33m",
		"blue": "\u001b[34m",
		"magenta": "\u001b[35m",
		"cyan": "\u001b[36m",
		"white": "\u001b[37m",
		"default": "\u001b[39m"
	},
	"background": {
		"black": "\u001b[40m",
		"red": "\u001b[41m",
		"green": "\u001b[42m",
		"yellow": "\u001b[43m",
		"blue": "\u001b[44m",
		"magenta": "\u001b[45m",
		"cyan": "\u001b[46m",
		"white": "\u001b[47m",
		"default": "\u001b[49m"
	}
}

var levels = {
	debug: {
		short: "DBUG",
		color: color.foreground.cyan,
		order: 0
	},
	info: {
		short: "INFO",
		color: color.foreground.green,
		order: 1
	},
	counter: {
		short: "#CNT",
		color: color.foreground.yellow,
		order: 2
	},
	warning: {
		short: "WARN",
		color: color.foreground.magenta,
		order: 3
	},
	error: {
		short: "ERR!",
		color: color.foreground.red,
		order: 4
	},
	fatal: {
		short: "####",
		color: color.foreground.red,
		order: 5
	}
};
var lastTime = null;
var month = [
	"Jan.",
	"Feb.",
	"Mar.",
	"Apr.",
	"May ",
	"Jun.",
	"Jul.",
	"Aug.",
	"Sep.",
	"Oct.",
	"Nov.",
	"Dec."
];
function log(logger, level, title, msg) {
	if (typeof level == "string") {
		level = levels[level];
	}
	
	if (level.order < (logger.minLevel != null ? logger.minLevel : ExtLog.minLevel)) {
		return false; 
	}
	
	var time = new Date();
	
	consoleLine(logger, level, title, time);
	if (msg) {
		if (typeof msg == "string") {
			consoleLine(logger, level, msg, time, true);
		} else if (typeof msg == "function") {
			consoleLine(logger, level, msg.toString(), time, true);
		} else { // JSON
			var json = JSON.stringify(msg, undefined, 4);
			json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
				var clr = color.foreground.green; // number
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						clr = color.foreground.magenta; // key
					} else {
						clr = color.foreground.green; // string
					}
				} else if (/true|false/.test(match)) {
					clr = color.foreground.blue; // boolean
				} else if (/null/.test(match)) {
					clr = color.foreground.blue; // null
				}
				return clr+match+color.reset;
			});
			consoleLine(logger, level, json, time, true);
			
		}
	}
}
function consoleLine(logger, level, str, time, isMsg) {
	if (str.match(/\r\n|\r|\n/)) {
		var arr = str.split(/\r\n|\r|\n/g);
		for (var i in arr) {
			consoleLine(logger, level, arr[i], time, isMsg);
		}
		return true;
	}
	
	var day = time.getDate();
	if (day < 10) day = "0"+day;
	var hour = time.getHours();
	if (hour < 10) hour = "0"+hour;
	var minutes = time.getMinutes();
	if (minutes < 10) minutes = "0"+minutes;
	var seconds = time.getSeconds();
	if (seconds < 10) seconds = "0"+seconds;
	
	(logger.nativeFunction || ExtLog.nativeFunction || console.log)(
				color.reset + month[time.getMonth()] + day+" "+time.getFullYear()+" "+hour+":"+minutes+":"+seconds+" "
				+ color.reset + color.background[logger.color] + color.foreground.white + " "
				+ color.reset + color.background.black + color.foreground.white// + color.bold
				+ logger.nameLog
				+ color.reset + " "
				+ color.background.black + level.color + /*color.bold + */ (isMsg ? '····' : level.short)
				+ color.reset + " " + str);
}

var ExtLog = function(name, color) {
	this.name = name;
	this.color = color;
	this.nativeFunction = null;
	this.nameLog = this.name.substring(0,8);
	this.nameLog = (new Array(9 - this.nameLog.length)).join(" ") + this.nameLog;
	this.minLevel = null;
}
ExtLog.minLevel = null;

ExtLog.prototype.debug = function(title, msg) {
	log(this, "debug", title, msg);
}
ExtLog.prototype.info = function(title, msg) {
	log(this, "info", title, msg);
}
ExtLog.prototype.warning = function(title, msg) {
	log(this, "warning", title, msg);
}
ExtLog.prototype.error = function(title, msg) {
	log(this, "error", title, msg);
}
ExtLog.prototype.fatal = function(title, msg) {
	log(this, "fatal", title, msg);
}
ExtLog.prototype.counter = function(title, msg) {
	log(this, "counter", title, msg);
}
ExtLog.prototype.setMinLevel = function(level) {
	if (level == null) {
		this.minLevel = null;
		return true;
	}
	switch (typeof level) {
		case "string":
			level = levels[level];
		case "object":
			level = level.order;
		case "number":
			this.minLevel = level;
	}
}
ExtLog.prototype.getCounter = function(title, time) {
	return new Counter(this, title, time);
}

ExtLog.minLevel = 0;
ExtLog.setMinLevel = function(level) {
	if (level == null) {
		ExtLog.minLevel = 0;
		return true;
	}
	switch (typeof level) {
		case "string":
			level = levels[level];
		case "Object":
			level = level.order;
		case "number":
			ExtLog.minLevel = level;
	}
}

var Counter = function(logger, title, time) {
	this.logger = logger;
	this.title = title;
	this.count = 0;
	this.time = time;
	
	this.interval = null;
	
	this.startTime = new Date().getTime();
}
Counter.prototype.setInterval = function() {
	if (this.interval) clearTimeout(this.interval);
	
	var intervalTime = this.time - (new Date().getTime() - this.startTime) % this.time;
	
	var _this = this;
	this.interval = setTimeout(function() {
		if (_this.count != 0) {
			_this.logger.counter(_this.title + " " + color.bold + color.foreground.cyan + _this.count + color.reset);
		}
		_this.count = 0;
		_this.interval = null;
	}, intervalTime);
}
Counter.prototype.add = function() {
	this.count++;
	
	if (!this.interval) {
		this.setInterval();
	}
}

ExtLog.color = color;
ExtLog.levels = levels;
module.exports = ExtLog;