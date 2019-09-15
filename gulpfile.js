var gulp = require("gulp");
var gulpSass = require("gulp-sass");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");

const errorHandler = err => {
  notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString()
  })(err);
};

gulp.task("buildcss", function() {
  return gulp
    .src("./dev-assets/css/style.scss")
    .pipe(gulpSass())
    .pipe(gulp.dest("./prod-assets/css"));
});

gulp.task("html", function() {
  return gulp
    .src("./dev-assets/**/*.html")
    .pipe(plumber(errorHandler))
    .pipe(gulp.dest("./prod-assets"));
});

gulp.task("js", function() {
  return (
    gulp
      .src("./dev-assets/js/**/*.js")
      .pipe(plumber(errorHandler))
      // .pipe(webpackStream(webpackConfig), webpack)
      // .pipe(uglify())
      // .on('error', errorHandler)
      .pipe(gulp.dest("./prod-assets/js"))
  );
});
gulp.task("img", function() {
  return gulp
    .src("./dev-assets/img/**/*")
    .pipe(gulp.dest("./prod-assets/img/"));
});

gulp.task("normalize", function() {
  return gulp
    .src("./dev-assets/css/normalize.css")
    .pipe(gulp.dest("./prod-assets/css/"));
});
gulp.task("php", function() {
  return gulp.src("./dev-assets/**/*.php").pipe(gulp.dest("./prod-assets/"));
});

// gulp.task('watch', function(){
//     gulp.watch('./dev-assets/**/*.scss', gulp.series('buildcss'));
// });

gulp.task(
  "serve",
  gulp.series("buildcss", "html", "js", "img", "php" ,"normalize" , function() {
    browserSync.init({
      server: "./prod-assets",
      open: true // set to false to disable browser autostart
    });
    gulp.watch("./dev-assets/css/**/*.scss", gulp.series("buildcss"));
    gulp.watch("./dev-assets/**/*.html", gulp.series("html"));
    gulp.watch("./dev-assets/js/**/*.js", gulp.series("js"));
    gulp.watch("./dev-assets/img/**/*.png", gulp.series("img"));
    gulp.watch("./dev-assets/**/*.php", gulp.series("php"));
    //   gulp.watch("src/assets/**/*", gulp.series("assets"));
    gulp.watch("dev-assets/**/*").on("change", browserSync.reload);
  })
);
gulp.task("build", gulp.series("buildcss", "html", "js", "img", "php","normalize"));
gulp.task("default", gulp.series("serve"));
