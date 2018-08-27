  const gulp    = require('gulp'),
      ts = require('gulp-typescript'),
      babel = require('gulp-babel'),
      newer = require('gulp-newer'),
      nodemon = require('gulp-nodemon');
   
  // var tsProject = ts.createProject({
  //     declaration: true
  // });
   
  var NODE_ENV = process.env.NODE_ENV || '';

console.log(NODE_ENV);

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function() {
  return gulp.src('src/**/*.ts')
      .pipe(newer('src/**'))
      .pipe(tsProject())
      .on('error', (e) => console.log(e)) 
      .pipe(babel({ presets: ['env'] }))
      .pipe(gulp.dest('build'));
});

gulp.task('nodemon', () => nodemon({ script: 'build/index.js' }) );


// gulp.task('css:build', function () {

//   //  if(NODE_ENV !== 'dev') {
//   //     var cssB = gulp.src(paths.build.css + "/*.css")
//   //        .pipe(csso())
//   //        .pipe(concat('style.css'))
//   //        .pipe(gulp.dest("."))
//   //        .pipe(reload({stream: true}));
//   //  } else {
//   //     var cssB = gulp.src(paths.build.css + "/*.css")
//   //        //.pipe(newer(paths.build.css))

//   //        .pipe(sourcemaps.init())
//   //           .pipe(concat('style.css'))
//   //        .pipe(sourcemaps.write('../../../'))
//   //        .pipe(gulp.dest("."))
//   //        .pipe(reload({stream: true}));
//   //  }

//    return cssB;

// });c


gulp.task('watcher', function(){
  gulp.watch('src/**/*.ts', gulp.series(['scripts']));
  gulp.watch('src/**/*.ts', gulp.series(['nodemon']));
});

gulp.task('default', gulp.parallel(['watcher']) );
