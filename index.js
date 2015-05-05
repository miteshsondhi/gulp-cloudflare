var request = require("request");
var gutil = require("gulp-util");

var API_URL = "https://www.cloudflare.com/api_json.html";
var PLUGIN = "gulp-cloudflare";

module.exports = function (options) {
	"use strict";
	if(!options) {
		gutil.log(PLUGIN, gutil.colors.red("config file is not defined"));
		return;
	}
	if(!options.token || !options.email || !options.domain) {
		gutil.log(PLUGIN, gutil.colors.red("These options are not valid."));
		return;
	}
	if(options.skip) {
		return;
	}
	var allowedActions = ["fpurge_ts", "devmode"];
	var _contains = function (a, str) {
	    for (var i = 0; i < a.length; i = i + 1) {
	        if (a[i] === str) {
	            return true;
	        }
	    }
	    return false;
	};
	if(options.action && !_contains(allowedActions, options.action)) {
		gutil.log(PLUGIN, gutil.colors.red(options.action + "is not a supported cloudflare action."));
		gutil.log(PLUGIN, gutil.colors.yellow("supported actions : " + allowedActions.join(", ") ));
		return;
	}

	var params = {
		a     : options.action || "fpurge_ts",
		tkn   : options.token,
		email : options.email,
		z     : options.domain,
		v     : 1
	};

	request.post({
		url  : API_URL,
		form : params,
		json : true
	}, function CloudFlareResponse(err, res) {
		if(err) {
			gutil.log(PLUGIN, gutil.colors.red(err.message));
			return;
		}
		if(!res && !res.statusCode) {
			gutil.log(PLUGIN, gutil.colors.red("Clodflare server not responding:("));
			return;
		}
		if(res.statusCode !== 200 || res.body.result === "error") {
			var errorMessage = "Not able to purge cache.";
			if(res.body && res.body.msg) {
				errorMessage = res.body.msg;
			}
			gutil.log(PLUGIN, gutil.colors.red(errorMessage));
		}
	});
};
