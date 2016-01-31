var gulp = require('gulp');
var source = require('vinyl-source-stream');
//var bower = require('bower');
var sass = require('gulp-sass');
//var sh = require('shelljs');

var notify = require('gulp-notify');
var watchify = require('watchify');

var sourcemaps = require('gulp-sourcemaps');
//var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var cssnano = require('gulp-cssnano');

const sassLint = require('gulp-sass-lint');



const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');


//var browserSync = require('browser-sync');
//var reload = browserSync.reload;
var bs = require("browser-sync").create();

var paths = {
    sass: ['src/assets/scss/**/*.scss'],
    images: ['src/assets/images/**/*.*'],
    fonts: ['node_modules/font-awesome/fonts/**/*.*'],
    php: ['**/*.php','!vendor','!test']
};

/*
 Browser Sync
 */
gulp.task('browser-sync', function() {
    bs.init({
        // we need to disable clicks and forms for when we test multiple rooms
        proxy: "http://192.168.99.100:3001/",
        port: 3010,
        //middleware : [ historyApiFallback() ],
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
            .pipe(bs.stream());
        //.pipe(reload({stream:true}))
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        rebundle();
    });

    // run it once the first time buildScript is called
    return rebundle();
}

gulp.task('scripts', function() {
    return buildScript('main.js', false); // this will once run once because we set watch to false
});
gulp.task('php', function() {
    bs.reload();
});

gulp.task('sass-lint', function() {
    return gulp.src(paths.sass)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('styles',['sass-lint'],function(done) {
    // move over fonts
    /*
     gulp.src('src/fonts/**.*')
     .pipe(gulp.dest('assets/css/fonts'));
     */

    // Compiles CSS
    return gulp.src('./src/assets/scss/main.scss')
        .pipe(
            sass({
                includePaths: [
                    'node_modules',
                    //'node_modules/font-awesome/scss'
                ]
            })
                .on('error', handleErrors)
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest('./assets/css/'))
        //.pipe(reload({stream:true}))
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./assets/css/'))
        //.pipe(reload({stream:true}))
        .pipe(bs.stream())
        .pipe(notify({
            title: 'Styles Compiled',
            message: 'Updated main styles, reloading.'
        }));
    //.on('end', done);
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('./assets/fonts/'));
});

/*
 Images
 */
gulp.task('images',function(){
    return gulp.src(paths.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./assets/images'))
        .pipe(bs.stream())
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['styles']);
    gulp.watch(paths.php, ['php']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
});

gulp.task('assets',['images','styles','scripts', 'fonts'], function(cb) {
    // nothing really.
    cb();
});

gulp.task('default', ['assets', 'browser-sync'], function() {
    gulp.watch(paths.sass, ['styles']); // gulp watch for sass changes
    gulp.watch(paths.php, ['php']); // gulp watch for php changes
    gulp.watch(paths.images, ['images']); // gulp watch for php changes
    //gulp.watch(['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'], ['html']); // gulp watch for html changes
    return buildScript('main.js', true); // browserify watch for JS changes
});

