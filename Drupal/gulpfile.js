var
	gulp 			= require('gulp'),
	rename			= require('gulp-rename'), 				// Rename files
	sourcemaps		= require('gulp-sourcemaps'),			// Generate SourceMaps
	less			= require('gulp-less'),					// Compile LESS to CSS
	minifyCss		= require('gulp-minify-css'),			// Minify CSS
	uglify			= require('gulp-uglify'),				// Minify/Obfuscation JS
	concat 			= require('gulp-concat'),				// Concatenate several files
	autoprefixer	= require('gulp-autoprefixer'),			// Autoprefixer
	size 			= require('gulp-filesize'),				// File Size
	plumber 		= require('gulp-plumber'); 				// Don't stop if errors
	livereload 		= require('gulp-livereload');			// Livereload

// ==================   LESS TASK  ================
gulp.task('less', function()
{
	return gulp.src('./drupal/sites/all/themes/mybootstrap/less/style.less')		// use style.less as input
		//.pipe(plumber()) 															// Don't stop if errors
		.pipe(sourcemaps.init())
		.pipe(less())																			// Compile less to css
		.pipe(autoprefixer({														// Autoprefixer
            browsers: ['last 50 versions'],
            cascade: true
        }))
		//.pipe(minifyCss())
		.pipe(sourcemaps.write('../maps'))											// Write the map file to ../maps				// Minify generated CSS
		.pipe(gulp.dest('./drupal/sites/all/themes/mybootstrap/css/'))				// Compile to css
		//.pipe(size('*css')); 																// [gulp] Size example.ccs: 265.32 kB
		.pipe(livereload());
});

// ====================	WATCH TASK ======================
gulp.task('watch', function()
{
	livereload.listen();
	gulp.watch(['./drupal/sites/all/themes/mybootstrap/less/*.less', './drupal/sites/all/themes/mybootstrap/custom-bootstrap/less/*.less'], ['less']);
});


// ==================== DEFAULT TASK ===========================
gulp.task('default', ['watch']);
