var gulp = require('gulp');
var gulpConcat = require('gulp-concat');

gulp.task('compress', function() {
    console.info('Compressing scripts');
    var source = [
        'src/dugun-search-filter.module.js',
        'src/dugun-search-filter.filter.js',
    ];

    return gulp.src(source)
        .pipe(gulpConcat('dugun-search-filter.js'))
        .pipe(gulp.dest('dist/'));
});
