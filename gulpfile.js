const gulp = require('gulp');

const gulpIf = require('gulp-if');
const css = require('gulp-cssmin');
const uglify = require('gulp-uglify');

const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const scsslint = require('gulp-scss-lint');
const cache = require('gulp-cached');
const sass = require('gulp-sass');


gulp.task('components', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap-sass/assets/javascript/bootstrap.js'
    ]).pipe(concat('components.js'))
        .pipe(gulpIf(true, uglify({mangle: false})))
        .pipe(gulp.dest('public/js'));
});

const jsPath = './src/assets/js/*.js';
gulp.task('js', ['components'], function () {
    return gulp.src(jsPath).pipe(concat('source.js'))
        .pipe(gulpIf(true, uglify({mangle: false})))
        .pipe(gulp.dest('public/js'));
});


const sassPath = './src/assets/sass/*.scss';
gulp.task('scss-lint', function () {
    return gulp.src(sassPath)
        .pipe(cache('scsslint'))
        .pipe(scsslint());
});


gulp.task('scss', ['scss-lint'], function () {
    gulp.src(sassPath)
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulpIf(true, css()))
        .pipe(gulp.dest('./public/css'));
});


gulp.task('scss-watch', function () {
    gulp.watch(sassPath, ['scss']);
});


gulp.task('scss-lint', function () {
    gulp.watch(sassPath, ['scss-lint']);
});


gulp.task('default', ['scss-lint', 'scss', 'js', 'components', 'scss-watch']);
