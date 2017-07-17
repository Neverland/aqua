/**
 * @file gulpfile
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/7/14
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('scripts', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts']);
