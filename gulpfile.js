var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var bowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var karma = require('karma').Server;

gulp.task('libs', ['lib-js', 'lib-css']);
gulp.task('lib-js', function () {
    return gulp.src(bowerFiles("**/*.js"))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
});
gulp.task('lib-css', function () {
    return gulp.src(bowerFiles("**/*.css"))
        .pipe(concat('vendor.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/assets/styles'));
});
gulp.task('scss', function () {
    return gulp.src('./app/assets/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/assets/styles'));
});

gulp.task('svg', function () {
   return gulp.src('./app/assets/**/*.svg')
       .pipe(gulp.dest('./dist/assets'));
});

gulp.task('config', function () {
    return gulp.src('app/config.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('index', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['config'], function () {
    return gulp.src('./app/**/*.js')
        .pipe(ngAnnotate())
        .pipe(concat('scripts.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('templates', function () {
    return gulp.src('./app/**/*.tpl.html')
        .pipe(templateCache('templates.js', {
            module: 'app',
            standalone: false,
            transformUrl: function (url) {
                return url.replace(/^.+\\(.+)$/, '$1')
            }
        }))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('lint', function () {
    return gulp.src(['./app/**/*.js', './tests/spec/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('test', ['config'], function (done) {
    new karma({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new karma({
        configFile: __dirname + '/tests/karma.conf.js',
    }, done).start();
});

gulp.task('default', ['templates', 'libs', 'scss', 'scripts', 'index', 'svg']);
gulp.task('travis', ['lint', 'test']);