import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import WebpackConfig from './webpack.config';

const srcPath = {
  js: './docs/assets/src/js',
  css: './docs/assets/src/sass',
};

const distPath = {
  js: './docs/assets/dist/js',
  css: './docs/assets/dist/css',
};


// javascripts -----------------------------------------------------------
gulp.task(
  'js_clean',
  () => del.sync([distPath.js]),
);

gulp.task(
  'webpack:dev',
  () => gulp.src(`${srcPath.js}/**/*.js`)
    .pipe(gulpWebpack(WebpackConfig, webpack))
    .pipe(gulp.dest(distPath.js)),
);


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

gulp.task('dev_build', ['sass', 'webpack:dev']);
gulp.task('watch', ['style_watch', 'webpack:dev']);