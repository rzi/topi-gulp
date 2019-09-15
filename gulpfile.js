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
    .src("./dev-assets/style.scss")
    .pipe(gulpSass())
    .pipe(gulp.dest("./prod-assets"));
});

gulp.task("html", function() {
  return gulp
    .src("./dev-assets/**/*.html")
    .pipe(plumber(errorHandler))
    .pipe(gulp.dest("./prod-assets"));
});

// gulp.task('watch', function(){
//     gulp.watch('./dev-assets/**/*.scss', gulp.series('buildcss'));
// });

gulp.task(
  "serve",
  gulp.series("buildcss", "html", function() {
    browserSync.init({
      server: "./prod-assets",
      open: true // set to false to disable browser autostart
    });
    gulp.watch("./dev-assets/**/*.scss", gulp.series("buildcss"));
    gulp.watch("./dev-assets/**/*.html", gulp.series("html"));
    //   gulp.watch("src/js/*.js", gulp.series("js"));
    //   gulp.watch("src/assets/**/*", gulp.series("assets"));
    gulp.watch("dev-assets/**/*").on("change", browserSync.reload);
  })
);
gulp.task("build", gulp.series("buildcss", "html"));
//gulp.task("default", gulp.series("serve"));
