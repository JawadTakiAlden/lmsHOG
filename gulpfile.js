const gulp = require('gulp');
const git = require('gulp-git');
const { exec } = require('child_process');
gulp.task('git-pull', function(done) {
    git.pull('https://github.com/JawadTakiAlden/lmsHOG.git', 'main', function(err) {
        if (err) return done(err);
        done();
    });
});

gulp.task('build', gulp.series('git-pull', function(done) {
    exec('npm run build', function(err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        done(err);
    });
}));

gulp.task('default', gulp.series('build'));
