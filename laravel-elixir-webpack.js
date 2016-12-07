var gulp = require('gulp');
var Elixir = require('laravel-elixir');
var gulpWebpack = require('webpack-stream');

var $ = Elixir.Plugins;
var config = Elixir.config;

Elixir.extend('webpack', function (src, output, baseDir, options) { // mix.webpack(src, null,'./public/build/bundle.js')
	var paths = preGulpPaths(src, output, baseDir);
	
	Elixir.onWatch(function() {
		gulp.start('webpack');
	});

	return new Elixir.Task('webpack', function() {
		// gulp.src()

		this.log(paths.src, output);
		gulpTask(paths, options);

	}); 
});

function gulpTask(paths, options) {
	return gulp.src(paths.src.path)
		.pipe(gulpWebpack(options || {
			watch: Elixir.isWatching(),
			module: {
        		loaders: [
            		{ test: /\.js$/, loader: 'buble'}
        		]
    		}
		}, require('webpack')))
		.on('error', function(e) {
			new Elixir.Notification('Webpack Compilation Failed!');

			this.emit('end');
		})
		.pipe($.rename('rename.js'))
		.pipe($.if(config.production, $uglify(config.js.uglify.options)))
		.pipe(gulp.dest(paths.output.baseDir))
		.pipe(new Elixir.Notification('Webpack Compiled!'));
}

function prepGulpPaths(src, output, baseDir) {
	return new Elixir.GulpPaths()
		.src(src, baseDir || config.get('assets.js.folder'))
		.output(output || config.get('public.js.outputFolder'), 'bundle.js');
}