import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => (
    runSequence(
        'clean',
        'copy',
        'images',
        'styles-dependencies',
        'styles',
        'eslint',
        'scripts-dependencies',
        'scripts',
        'markup',
        'connect',
        'watch'
    )
));
