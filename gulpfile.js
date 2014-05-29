// Include gulp
gulp = require( 'gulp' );

// Include plugins
var jshint = require( 'gulp-jshint' ),
    sass = require( 'gulp-sass' ),
    concat = require( 'gulp-concat' ),
    uglify = require( 'gulp-uglify' ),
    rename = require( 'gulp-rename'),
    neat = require( 'node-neat' ).includePaths;

// Lint task
gulp.task( 'lint', function() {
  return gulp.src( 'js/*.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ));
});

// Compile sass
gulp.task( 'sass', function() {
  return gulp.src('scss/main.scss')
    .pipe( sass({
      includePaths: ['sass'].concat( neat )
    }))
    .pipe( gulp.dest( 'css' ) );
});

// Concatenate & minify JS
gulp.task( 'scripts', function() {
    return gulp.src( 'js/*.js' )
      .pipe( concat( 'all.js' ) )
      .pipe( gulp.dest( 'dist' ) )
      .pipe( rename( 'all.min.js' ) )
      .pipe( uglify() )
      .pipe( gulp.dest( 'dist' ) );
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch( 'js/*.js', ['lint', 'scripts'] );
  gulp.watch( 'scss/*.scss', ['sass'] );
});

// Default Task
gulp.task( 'default', ['lint', 'sass', 'scripts', 'watch'] );