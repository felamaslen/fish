import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import env from 'gulp-env';
import less from 'gulp-less';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import gutil from 'gutil';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import proxy from 'http-proxy-middleware';
import url from 'url';

import webpackConfigDev from './webpack/webpack.development.config';
import webpackConfig from './webpack/webpack.staging.config';

import backend from './src/js/srv';
import { PORT_PROD, PORT_DEVSERVER } from './src/js/srv/config';

// use eslint for consistent code
gulp.task('lint', () => {
  return gulp.src('src/js/**')
  .pipe(eslint({
    'plugins': ['react']
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

// LESS stylesheet preprocessor
gulp.task('less', () => {
  const lessOptions = {
    paths: [path.join(__dirname, 'src', 'less')]
  };

  return gulp.src(['src/css/**/*.css', 'src/less/**/*.less'])
  .pipe(gulpif(/\.less$/, less(lessOptions)))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('src/html/css'))
});

// watch LESS files for changes
gulp.task('watch', () => {
  gulp.watch('src/less/**/*.less', ['less']);
});

// the webpack task is used for the production server
// (webpack-dev-server is used for the development server)
gulp.task('webpack', callback => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('build', ['lint', 'less']);

gulp.task('devServerOnly', () => {
  env({
    vars: {
      DEVSERVER: true
    }
  });

  const app = express();

  // serve the api
  backend(app);

  // serve the mobile app as a proxied webpack dev server for hot reloading
  const proxyFilter = (pathName, req) => !pathName.match(/^\/api/);
  const devServerProxy = proxy(proxyFilter, {
    target: url.parse('http://localhost:' + PORT_DEVSERVER + '/'),
  });
  app.use('/', devServerProxy);

  const frontend = new WebpackDevServer(webpack(webpackConfigDev), {
    contentBase: 'src/html',
    publicPath: '/',
    hot: true,
    quiet: false,
    noInfo: false,
    disableHostCheck: true
  });

  frontend.listen(PORT_DEVSERVER, 'localhost', () => {});
  // morgan logs requests to the console
  app.use(morgan('dev'));
  app.listen(PORT_PROD);

  console.log('Server/client listening on ports', PORT_PROD, ',', PORT_DEVSERVER);
});

gulp.task('devServer', ['build', 'watch', 'devServerOnly']);

gulp.task('productionServerOnly', () => {
  const app = express();

  // serve the api
  backend(app);

  // serve the mobile app statically
  app.use('/', express.static('src/html'));

  app.listen(PORT_PROD);
  console.log('Server listening on port', PORT_PROD);
});

gulp.task('productionServer', ['build', 'webpack', 'productionServerOnly']);

gulp.task('default', ['devServer']);

