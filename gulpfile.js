const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");

gulp.task("sass", function(){
  return gulp.src("./style/style.scss", {style: "compressed"})
	  .pipe(sass({
			includePaths: require('node-normalize-scss').includePaths
		}))
	  .pipe(gulp.dest("./build"))
	  .pipe(cleanCSS({
		    keepSpecialComments: 0
	  }))
	  .pipe(gulp.dest("./build"));
});

gulp.task('watch', function(){
	gulp.watch(['style/**/*.scss'], ['sass']);
});
