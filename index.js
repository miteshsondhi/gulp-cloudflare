var request = require("request");
var log = require("fancy-log");
var colors = require("ansi-colors");

var API_URL = "https://www.cloudflare.com/api_json.html";
var PLUGIN = "gulp-cloudflare";

module.exports = function(options) {
	"use strict";
	if (!options) {
		log(colors.red(PLUGIN + " " + "config file is not defined"));
		return;
	}
	if (!options.token || !options.email || !options.domain) {
		log(colors.red(PLUGIN + " " + "These options are not valid."));
		return;
	}
	if (options.skip) {
		return;
	}
	var allowedActions = ["fpurge_ts", "devmode"];
	var _contains = function(a, str) {
		for (var i = 0; i < a.length; i = i + 1) {
			if (a[i] === str) {
				return true;
			}
		}
		return false;
	};
	if (options.action && !_contains(allowedActions, options.action)) {
		log(
			colors.red(
				PLUGIN +
					" " +
					options.action +
					"is not a supported cloudflare action."
			)
		);
		log(
			colors.yellow(
				PLUGIN +
					" " +
					"supported actions : " +
					allowedActions.join(", ")
			)
		);
		return;
	}

	var params = {
		a: options.action || "fpurge_ts",
		tkn: options.token,
		email: options.email,
		z: options.domain,
		v: 1
	};

	request.post(
		{
			url: API_URL,
			form: params,
			json: true
		},
		function CloudFlareResponse(err, res) {
			if (err) {
				log(colors.red(PLUGIN + " " + err.message));
				return;
			}
			if (!res && !res.statusCode) {
				log(
					colors.red(
						PLUGIN + " " + "Clodflare server not responding:("
					)
				);
				return;
			}
			if (res.statusCode !== 200 || res.body.result === "error") {
				var errorMessage = "Not able to purge cache.";
				if (res.body && res.body.msg) {
					errorMessage = res.body.msg;
				}
				log(colors.red(PLUGIN + " " + errorMessage));
			}
		}
	);
};
