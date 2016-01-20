var gulp = require('gulp');
var gutil = require('gulp-util');
//var bower = require('bower');
var sass = require('gulp-sass');
//var sh = require('shelljs');

var sourcemaps = require('gulp-sourcemaps');
//var templateCache = require('gulp-angular-templatecache');

var paths = {
    sass: ['./src/assets/scss/**/*.scss'],
};

gulp.task('sass', function(done) {
    gulp.src('./src/assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

