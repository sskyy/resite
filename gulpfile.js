var _ = require('lodash');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var mergeStream = require('merge-stream');
var source = require('vinyl-source-stream');
var spawn = require('child_process').spawn

gulp.task('css', function() {
    var merged = mergeStream();

    _.each({
        'website.less': 'website/style.css'
    }, function(out, input) {
        gutil.log('compiling', input, 'into', out);
        merged.add(gulp.src('theme/stylesheets/'+input)
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(rename(out))
            .pipe(gulp.dest('theme/assets/')));
    });

    return merged;
});

gulp.task('js', function() {
    return browserify('./theme/javascript/index.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./theme/assets/website'));
});

gulp.task('assets', function() {
    return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('theme/assets/website/fonts/fontawesome/'));
});


gulp.task('server', function(){
    var child = spawn('node',['./server.js','--baseDir','/roof/roof-website/'],{stdio:'inherit'})
})

gulp.task('build', function(){
    var child = spawn('gitbook',['build'],{stdio:'inherit'})
})


gulp.task('replace-css', function(){
    gulp.src('theme/assets/website/style.css')
        .pipe(gulp.dest('_book/gitbook'))
})

gulp.task('replace-js', function(){
    gulp.src('theme/assets/website/app.js')
      .pipe(gulp.dest('_book/gitbook'))
})

gulp.task('watch', function(){
    gulp.watch('theme/templates/**/*',['build'])
    gulp.watch('theme/stylesheets/**/*',['css','replace-css'])
    gulp.watch('theme/javascript/**/*',['js','replace-js'])
})



gulp.task('default', ['css', 'js', 'assets','build'], function() {

});

gulp.task('dev', ['server','watch'], function(){})

