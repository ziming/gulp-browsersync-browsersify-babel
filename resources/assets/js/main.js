// by starting with ./ we are telling browserify that we are referring to a local file
// not an npm module
var notification = require('./Notification');

notification('Hello Everybody!');