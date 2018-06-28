const pump = require('pump');
const browserify = require('browserify');
const vueify = require('vueify');
const source = require('vinyl-source-stream');
const gulp = require('gulp');

gulp.task('copy', () => {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('vueify', done => {
    pump([
        browserify('./src/index.js')
        .transform(vueify)
        .exclude(['fs'])
        .bundle(),
        source('index.js'),
        gulp.dest('dist')
    ], err => {
        if (err) {
            console.error(err);
        }
        done();
    });
});

gulp.task('build', ['vueify', 'copy']);