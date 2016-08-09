var Elixir = require('laravel-elixir');

var gulp = require('gulp');
var shell = require('gulp-shell');

var Task = elixir.Task;

// capital so as to not conflict with gulfile.js declaration of elixir?
Elixir.extend('speak', function(message) {
    new Task('speak', function() {
        return gulp.src('').pipe(shell('say ' + message));
    })
    .watch('./app/**')
    .ignore('./app/User.php'); // ignore this file from gulp watch!
});