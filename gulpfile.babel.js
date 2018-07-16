import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';

const srcPath = {
  js: './docs/assets/src/js',
  css: './docs/assets/src/sass',
};

const distPath = {
  js: './docs/assets/dist/js',
  css: './docs/assets/dist/css',
};


// css -------------------------------------------------------------------
gulp.task(
  'css_clean',
  () => del.sync([distPath.css]),
);

gulp.task(
  'sass',
  ['css_clean'],
  () => gulp.src([`${srcPath.css}/**/*.scss`, `${srcPath.css}/**/*.sass`])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(distPath.css)),
);


// watch -----------------------------------------------------------------
gulp.task('style_watch', () => {
  gulp.watch([`${srcPath.css}/**/*.scss`, `${srcPath.css}/**/*.sass`], ['sass']);
});
