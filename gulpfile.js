'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-clean-css'),
    del = require('del'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/*.js',
        style: 'src/style/main.scss',
        css: 'src/style/*.css',
        img: 'src/images/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        css: 'src/style/*.css',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*'
    },
    clean: './build'
};

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('scripts', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));

});

gulp.task('styles', function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('css', function () {
    gulp.src(path.src.css)
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(imagemin([
		    imagemin.jpegtran({
                progressive: true
            }),
		    imagemin.optipng({
                optimizationLevel: 5
            }),
		    imagemin.svgo({
                plugins: [
                    {
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
       			]
            })
		]))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('clean', function () {
    return del.sync(path.clean);
});

gulp.task('build', ['clean', 'html', 'scripts', 'styles', 'css', 'fonts', 'images']);

gulp.task('watch', function () {
    gulp.watch(path.watch.style, ['styles']);
    gulp.watch(path.watch.style, ['css']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.img, ['images']);
    gulp.watch(path.watch.js, ['scripts']);
});

gulp.task('default', ['build', 'watch']);
