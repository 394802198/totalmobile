'use strict';

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Empties folders to start fresh
        clean: ['.tmp', '<%= config.dist %>'],

        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html']
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            dist: ['imagemin'],
            copyimgs: ['copy:imgs']

        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/imgs',
                    src: [
                        '{,*/}*.{gif,jpg,png}'
                    ], //{,*/}*.{gif,jpeg,jpg,png} **/*.{gif,jpeg,jpg,png}
                    dest: '<%= config.dist %>/imgs'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: ['*.{ico,png,txt}', '**/*.html'],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= config.dist %>'
                }]
            },
            imgs: {
                expand: true,
                cwd: '<%= config.app %>/imgs',
                src: '**',
                dest: '<%= config.dist %>/imgs/'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/js/{,*/}*.js',
                        '<%= config.dist %>/css/{,*/}*.css',
                        '<%= config.dist %>/imgs/{,*/}*.*',
                        '<%= config.dist %>/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/imgs',
                    '<%= config.dist %>/css'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css']
        }

    });

    grunt.registerTask('default', [
        'clean', 'wiredep', 'useminPrepare', 'concurrent:dist', 'concat', 'cssmin', 'uglify', 'copy:dist', 'rev', 'usemin'
    ]);
};
