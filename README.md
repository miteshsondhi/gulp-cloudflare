# gulp-cloudflare
> cloudflare plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-cloudflare` as a development dependency:

```shell
npm install --save-dev gulp-cloudflare
```

Then, add it to your `gulpfile.js`:

```javascript
var cloudflare = require("gulp-cloudflare");

gulp.task('purge-cdn-cache', function() {
	var options = {
		token  : 'token',
		email  : 'email',
		domain : 'domain'
	};

	cloudflare(options);
})
```

## API

### cloudflare(options)

#### options.token
Type: `String`  
Required: true
#### options.email
Type: `String`  
Required: true
#### options.domain
Type: `String`  
Required: true
#### options.skip
Type: `Boolean`  
Required: false
#### options.action
Type: `String`  
Required: false
Default: `fpurge_ts`
Possible Values: `fpurge_ts`, `devmode`



This package will only purge the cache from cloudflare. If you want to purge the cache in production mode. Then use https://www.npmjs.com/package/yargs.

```shell
gulp --type production
```

```javascript
var cloudflare = require("gulp-cloudflare");
var argv = require('yargs').argv;

gulp.task('purge-cdn-cache', function() {
	var options = {
		token  : 'token',
		email  : 'email',
		domain : 'domain',
		action : 'fpurge_ts',
		skip   : argv.type !== 'production'
	};

	cloudflare(options);
})
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-cloudflare
[npm-image]: https://badge.fury.io/js/gulp-cloudflare.png

[travis-url]: http://travis-ci.org/miteshsondhi/gulp-cloudflare
[travis-image]: https://secure.travis-ci.org/miteshsondhi/gulp-cloudflare.png?branch=master

[coveralls-url]: https://coveralls.io/r/miteshsondhi/gulp-cloudflare
[coveralls-image]: https://coveralls.io/repos/miteshsondhi/gulp-cloudflare/badge.png

[depstat-url]: https://david-dm.org/miteshsondhi/gulp-cloudflare
[depstat-image]: https://david-dm.org/miteshsondhi/gulp-cloudflare.png
