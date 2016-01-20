var gulp = require('gulp');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
//var bower = require('bower');
var sass = require('gulp-sass');
//var sh = require('shelljs');

var notify = require('gulp-notify');

var sourcemaps = require('gulp-sourcemaps');
//var templateCache = require('gulp-angular-templatecache');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
    sass: ['./src/assets/scss/**/*.scss'],
};

/*
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
*/
/*
 Browser Sync
 */
gulp.task('browser-sync', function() {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : {},
        port: 8080,
        middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}
function buildScript(file, watch) {

    var props = {
        entries: ['./src/assets/js/' + file],
        debug : true,
        //transform:  [babelify.configure({stage : 0 })]
        transform:  [
            babelify.configure({
                presets : ['stage-0', 'es2015']
            })
        ]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props)) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulp.dest('./assets/js'))
            // If you also want to uglify it
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(gulp.dest('./assets/js'))
            .pipe(reload({stream:true}))
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
        gutil.log('Rebundle...');
    });

    // run it once the first time buildScript is called
    return rebundle();
}

gulp.task('scripts', function() {
    return buildScript('main.js', false); // this will once run once because we set watch to false
});

gulp.task('sass',function(done) {
    // move over fonts
    /*
     gulp.src('src/fonts/**.*')
     .pipe(gulp.dest('assets/css/fonts'));
     */

    // Compiles CSS
    gulp.src('./src/assets/scss/main.scss')
        .pipe(sass({
            includePaths: [
                'node_modules/bootstrap/scss'
            ]
        }))
        //.pipe(autoprefixer())
        .pipe(gulp.dest('./assets/css/'))
        .on('end', done);
        //.pipe(reload({stream:true}))
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

