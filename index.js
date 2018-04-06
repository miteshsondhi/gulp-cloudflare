var request = require("request");
var log = require("fancy-log");
var colors = require("ansi-colors");

var PLUGIN = "gulp-cloudflare";

module.exports = function(options) {
	"use strict";
	if (!options) {
		log(colors.red(PLUGIN + " " + "config file is not defined"));
		return;
	}
	if (!options.token || !options.email || !options.zone) {
		log(options);
		log(colors.red(PLUGIN + " " + "These options are not valid."));
		return;
	}
	if (options.skip) {
		return;
	}

	var cloudflareOptions = {
		url:
			"https://api.cloudflare.com/client/v4/zones/" +
			options.zone +
			"/purge_cache",
		method: "DELETE",
		headers: {
			"X-Auth-Email": options.email,
			"X-Auth-Key": options.token,
			"Content-Type": "application/json"
		},
		json: { purge_everything: true } // jshint ignore:line
	};

	request(cloudflareOptions, function CloudFlareResponse(err, res) {
		if (err) {
			log(colors.red(PLUGIN + " " + err.message));
			return;
		}
		if (!res && !res.statusCode) {
			log(colors.red(PLUGIN + " " + "Clodflare server not responding:("));
			return;
		}
		if (res.statusCode !== 200 || res.body.result === "error") {
			var errorMessage = "Unable to purge cache.";
			if (res.body && res.body.msg) {
				errorMessage = res.body.msg;
			}
			log(colors.red(PLUGIN + " " + errorMessage));
		}
		if (res.body.success === true) {
			var message = "— Successfully purged cache. \n"; // + JSON.stringify(res.body);
			log(colors.green(PLUGIN + " " + message));
		}
	});
};
