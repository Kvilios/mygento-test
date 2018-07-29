'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require("browser-sync"),
    reload = browserSync.reload;
var path = {
    htdocs: {
        css: 'htdocs/css/',
        fonts: 'htdocs/fonts/',
        html: 'htdocs/',
        img: 'htdocs/img/',
        js: 'htdocs/js/'
    },
    clean: './htdocs',
    src: {
        fonts: 'src/fonts/**/*.*',
        html: 'src/html/index.html',
        img: 'src/img/**/*.*',
        js: 'src/js/script.js',
        scss: 'src/scss/style.scss'
    },
    watch: {
        fonts: 'src/fonts/**/*.*',
        html: 'src/html/**/*.html',
        img: 'src/img/**/*.*',
        js: 'src/js/**/*.js',
        scss: 'src/scss/**/*.scss'
    }
};
var config = {
    server: {
        baseDir: "./htdocs"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Mygento-Test"
};

gulp.task('html:htdocs', function () {
    gulp.src(path.src.html)
        .pipe(plugins.rigger())
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.htdocs.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:htdocs', function () {
    gulp.src(path.src.js)
        .pipe(plugins.rigger())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(path.htdocs.js))
        .pipe(reload({stream: true}));
});

gulp.task('css:htdocs', function () {
    gulp.src(path.src.scss)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        })) //Скомпилируем
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(path.htdocs.css))
        .pipe(reload({stream: true}));
});

gulp.task('img:htdocs', function () {
    gulp.src(path.src.img)
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.htdocs.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:htdocs', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.htdocs.fonts))
});

gulp.task('watch', function() {
    gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:htdocs');
    });
    gulp.watch([path.watch.scss], function(event, cb) {
        gulp.start('css:htdocs');
    });
    gulp.watch([path.watch.js], function(event, cb) {
        gulp.start('js:htdocs');
    });
    gulp.watch([path.watch.img], function(event, cb) {
        gulp.start('img:htdocs');
    });
    gulp.watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:htdocs');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    plugins.rimraf(path.clean, cb);
});

gulp.task('build', [
    'css:htdocs',
    'fonts:htdocs',
    'html:htdocs',
    'js:htdocs',
    'img:htdocs'
]);

gulp.task('default', ['clean', 'build', 'webserver', 'watch']);