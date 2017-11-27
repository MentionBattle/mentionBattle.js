var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var bowerFiles = require('main-bower-files');
var debug = require('gulp-debug');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var ngConstant = require('gulp-ng-constant');

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
    return gulp.src('./app/assets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('config', function () {
    return gulp.src('app/config.json')
        .pipe(ngConstant({
            name: 'config',
            wrap: true,
            wrapHeader: "(function () { 'use strict';",
            wrapFooter: "})();"
        }))
        // Writes config.js to dist/ folder
        .pipe(gulp.dest('app/src/constants'));
});

gulp.task('index', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['config'], function () {
    return gulp.src('./app/**/*.js')
        .pipe(debug())
        .pipe(ngAnnotate())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('templates', function () {
    return gulp.src('./app/**/*.tpl.html')
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('default', ['templates', 'libs', 'scss', 'scripts', 'index']);