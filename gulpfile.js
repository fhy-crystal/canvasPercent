var gulp = require('gulp'),
	sass = require('gulp-sass'), // 需要先用cnpm安装node-sass
	uglify = require('gulp-uglify'),
	html = require('gulp-htmlmin'),
	clean = require('gulp-clean'),
	assetRev = require('gulp-asset-rev'); // 添加版本号，需要在原文件中修改

gulp.task('clean', function() {
	return gulp.src('publish')
	.pipe(clean());
})


gulp.task('sassTocss', function() {
	return gulp.src('./css/main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(assetRev())
		.pipe(gulp.dest('publish/css'))
})

gulp.task('js', function() {
	return gulp.src(['./js/main.js', './js/method.js'])
		.pipe(uglify())
		.pipe(assetRev())
		.pipe(gulp.dest('publish/js'))
})

gulp.task('htmlmin', function() {
	return gulp.src('index.html')
		.pipe(html({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(assetRev())
		.pipe(gulp.dest('publish'));
})

gulp.task('default', ['clean'], function() {
	gulp.run('js', 'sassTocss', 'htmlmin');

	gulp.watch('./css/main.scss', function() {
		gulp.run('sassTocss');
	})

	gulp.watch('./js/*.js', function() {
		gulp.run('js');
	})
})