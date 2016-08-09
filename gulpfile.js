var elixir = require('laravel-elixir');

// This line disable source maps, so you wont see the sourcemap comments that "link" to ur 'coffee, ES6, scss files'
// exlixir.config.sourcemaps = false;

var gulp = require('gulp');
var shell = require('gulp-shell');

// Here is to try define gulp-shell speak task! on commandline can try gulp speak to hear
// hello world
/*
gulp.task('speak', function() {
    var message = 'Hello World';

    return gulp.src('').pipe(shell('say ' + message));
});
*/

// Now this is the laravel elixir extension, an improvement over the commented gulp task slightly above this.
var Task = elixir.Task;

elixir.extend('speak', function(message) {
    new Task('speak', function() {
        return gulp.src('').pipe(shell('say ' + message));
    })
    .watch('./app/**')
    .ignore('./app/User.php'); // ignore this file from gulp watch!
});

// Alternatively you can put the above code in a seperate file
// and require it like this, start with ./ so node know is not grab from npm?
// require('./elixir-extensions');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    // mix.sass(['app.scss', 'front.scss']); // combine both file, compile and transform into app.css

    // if never provide filename in 2nd argument but only the path, then it is like app.scss -> app.css, front.scss -> front.css
    mix.sass('app.scss')
        // .version can accept an array as well, .scss will go to .css and javascript related files goes to .js in public folder.
        // intelligent enough
        // cachebusting technique so file will be something like app-hash453.css
        .version('/public/css/app.css'); 


        mix.sass('front.scss', './public/css/front.css')
        .coffee('module.coffee')
        .babel('file.js');

    // browserify test
    mix.browserify('main.js');

    // to get minification run gulp --production

    // Config.js file allow you to edit exilir configurations if you need it

    // you would see that source mappings files are created too, in browser when you inspect, it shows you the scss, coffee, ES6 files
    // instead!! much clearer don't you think?
    // So don't remove the comment at the bottom of those .css and .js files
    // example: //# sourceMappingURL=file.js.map <- that is the comment

    // Concatenate Scripts. By default go public/js/all.js I think, if you got ES6 code then mix.babel()
    // there is no error checking, it just concatenate
    mix.scripts([
        'one.js',
        'two.js',
        'three.js'
    ]);

    // similarly, if you want concatenate plain css file then mix.styles() or mix.sass() if you are using SASS

    // Now you can run PHPUnit with gulp too!
    // mix.phpUnit();

    // skipping phpSpec as having some issues with it on Windows, will learn that next time
    // mix.phpSpec();

    // in commandline you can try gulp tdd too, is like gulp watch but for running your PHPUnit tests in this case

    // Check out the cool browserSync!

    // this option if you use Laravel Homestead
    // mix.browserSync();

    // otherwise do this instead passing the right proxy value
    mix.browserSync({
        proxy: 'laravel-frontend.dev'
    });

    // By going to http://localhost:3001/ , you get to see BrowserSync config menu!

    // an optional 2nd argument as the path to watch for changes then call task speak if there are changes
    // but notice the limitations, what if we want to call it twice or customize the speak message
    // That where extensions come in? So let's create our own extensions to elixir
    // mix.task('speak', './app/**');
    
    // calling the extension we created with a message
    mix.speak('Hello World');
});
