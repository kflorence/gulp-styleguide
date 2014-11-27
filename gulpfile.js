var gulp = require("gulp");

gulp.task("templates:compile", function() {
  var data = require("gulp-data");
  var fm = require("front-matter");
  var handlebars = require("gulp-compile-handlebars");
  var handlebarsData = {};
  var handlebarsOptions = {
    batch: [
      "assets/templates",
      "source/templates"
    ]
  };
  var rename = require("gulp-rename");
  var renameOptions = {
    extname: ".html"
  };

  // Extract YAML front matter from files
  function frontMatter(file) {
    var content = fm(file.contents.toString());
    file.contents = new Buffer(content.body);
    return content.attributes;
  }

  return gulp.src("source/pages/**/*.handlebars")
    .pipe(data(frontMatter))
    .pipe(handlebars(handlebarsData, handlebarsOptions))
    .pipe(rename(renameOptions))
    .pipe(gulp.dest("public"));
});

gulp.task("default", ["templates:compile"]);
