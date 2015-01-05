/**
 * Grunt build management script
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        // Concat JS sources
        concat: {
            options: {
                banner: "'use strict';\n",
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                src: ['public/js/ac.main.js', 'public/js/**/*.js', '!public/js/test/**/*.js'],
                dest: 'public/js/build/ac.main.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            app: {
                options: {
                    curly: false,
                    globals: {
                        angular: true
                    }
                },
                files: {
                    src: ['public/js/**/*.js', '!public/js/build/ac.main.js']
                }
            },
            tests: {
                options: {
                    curly: false,
                    globals: {
                        browser: true,
                        describe: true,
                        it: true,
                        element: true,
                        by: true
                    }
                },
                files: {
                    src: ['public/js/test/**/*.js']
                }
            }
        },
        // End to end tests
        protractor: {
            test: {
                configFile: './public/js/test/conf/protractor.conf.js',
                keepAlive: false
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-protractor-runner');
};
