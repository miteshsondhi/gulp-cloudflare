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

gulp.task("purgeCache", function(callback) {
    var options = {
        token: cloudflareAuthKey,
        email: cloudflareEmail,
        zone: cloudflareZone
    };
    cloudflare(options);
    callback();
});
```

## API

### cloudflare(options)

#### options.token
Type: `String`  
cloudflare Auth-Key
Required: true
#### options.email
Type: `String`  
Required: true
#### options.zone
Type: `String`  
Required: true
#### options.skip
Type: `Boolean`  
Required: false


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
