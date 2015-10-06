const gulp = require('gulp');

const gulpIf = require('gulp-if');
const minify = require('gulp-cssmin');
const uglify = require('gulp-uglify');

const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const scsslint = require('gulp-scss-lint');
const cache = require('gulp-cached');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const sassPath = './src/assets/stylesheet/*.scss';
const sassPathComponents = './src/assets/stylesheet/components/components.scss';
const jsPath = './src/assets/js/*.js';

const isDebugMode = true;
const production = process.env.PRODUCTION === 'production' || isDebugMode;

gulp.task('components', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap-stylesheet/assets/javascript/bootstrap.js'
    ]).pipe(concat('components.js'))
        .pipe(gulpIf(production, uglify({mangle: false})))
        .pipe(gulp.dest('public/js'));
});

gulp.task('js', ['components'], function () {
    return gulp.src(jsPath).pipe(concat('source.js'))
        .pipe(gulpIf(production, uglify({mangle: false})))
        .pipe(gulp.dest('public/js'));
});


gulp.task('scss-lint', function () {
    return gulp.src(sassPath)
        .pipe(cache('scsslint'))
        .pipe(scsslint());
});

gulp.task('scss-components', function () {
    gulp.src(sassPathComponents)
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulpIf(production, minify()))
        .pipe(gulp.dest('./public/css'));
});


gulp.task('scss', ['scss-components'], function () {
    gulp.src(sassPath)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulpIf(production, minify()))
        .pipe(gulp.dest('./public/css'));
});


gulp.task('watch:scss', function () {
    gulp.watch(sassPath, ['scss']);
});


gulp.task('watch:scss-lint', function () {
    gulp.watch(sassPath, ['scss-lint']);
});


gulp.task('default', ['scss-components', 'scss', 'js', 'components', 'watch:scss']);
