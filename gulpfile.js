const gulp = require('gulp');

gulp.task('copy', () => {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('vueify', () => {
    const browserify = require('browserify');
    const vueify = require('vueify');
    const source = require('vinyl-source-stream');

    browserify('./src/index.js')
    .transform(vueify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['vueify', 'copy']);