module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '../',
        frameworks: ['wiredep', 'jasmine'],
        files: [
            'app/**/*.js',
            'tests/spec/**/*.js'
        ],
        autoWatch: true,
        singleRun: false,
        plugins: ['karma-wiredep', 'karma-coverage', 'karma-jasmine', 'karma-phantomjs-launcher'],
        browsers: ['PhantomJS'],
        reporters: ['progress', 'coverage'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/**/*.js': ['coverage']
        },
        wiredep: {
            dependencies: true,    // default: true
            devDependencies: true
        },

        // optionally, configure the reporter
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'coverage/'
                },
                {
                    type: 'lcovonly',
                    subdir: '.'
                },
                {
                    type: 'json',
                    subdir: '.'
                }
            ]

        }
    });
};