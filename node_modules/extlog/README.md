ExtLog
======

Easy, clear and colored logging with node.js
------

Extlog is a module for node.js available via npm. Install it using:

	npm install extlog

How does it work?
-----

First you have to require the library:

	ExtLog = require("extlog");

Then you can create instances:

	var logHttp = new ExtLog("http", "cyan");
	var logDB = new ExtLog("database", "green");
	var logFS = new ExtLog("fs", "magenta");
	
You create instances to know who is logging. So the code that handles the http server will log using logHttp, etc. ExtLog takes 2 arguments: the name and the color (red, green, yellow, blue, magenta, cyan, black or white). The name must be less than 9 characters.

In your code you can log:

	logHttp.info("Hello World");
	logDB.debug("Logging a string:", "A string...");
	logFS.warning("Or a JSON object:", {a:true, b:"string", c:null, d:91});

There are 5 different levels: debug, info, warning, error and fatal. The functions have 1 required argument and 1 optional.

You can also use counters:
	
	countRequests = logHttp.getCounter("Requests per second", 1000) // 1000ms = 1 second
	countRequests.add();
	countRequests.add();
	countRequests.add();
	
	setTimeout(function() {
		countRequests.add();
	}, 2000);
	
The counter will log the number of times add() is called in the time (in this example 1 second). It won't log if add() isn't called in the second.

It'll look like this:

![Screenshot 1](https://raw.github.com/ivogabe/extLog/master/screenshots/screen1.png "Screenshot 1")

or

![Screenshot 2](https://raw.github.com/ivogabe/extLog/master/screenshots/screen2.png "Screenshot 2")

Using typescript?
------
There is a definition file included, so you can use this in your TypeScript project.

	/// <reference path="node_modules/extlog/console.d.ts" />
	import ExtLog = require("ExtLog");
	
	var logDB : ExtLog = new ExtLog("database", "green");

More options
------
You can hide messages. For example, you only want to see the warnings, errors, and fatal errors.

	ExtLog.setMinLevel("warning");
	
setMinLevel takes one argument, a string. Enter the minimum level. This level and the levels above will be visible in the console. The levels are debug, info, counter, warning, error and fatal.

You can also set a minimum level for one instance, e.g. only for the database:

	logDB.setMinLevel("warning");

This way you can also get only logs from one instance:

	ExtLog.setMinLevel("fatal");
	logDB.setMinLevel("debug");

Remember to call setMinLevel before logging!

The default logging function is console.log, but you can change it:

	ExtLog.nativeFunction = function(str) {} // a global log function
	logDB.nativeFunction = function(str) {} // a log function only for the database.

License
------
ExtLog is licensed under the MIT license.

Copyright (C) 2013 Ivo Gabe de Wolff

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
