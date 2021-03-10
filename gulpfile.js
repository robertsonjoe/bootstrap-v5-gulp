const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const auotprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src('./sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(auotprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('start', gulp.series('sass', () => {
  browserSync.init({
    server: './',
  });

  gulp.watch('sass/*.scss', gulp.series('sass'));
  gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('start'));
