module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    'public/stylesheet.css': 'grunt-compiled/sass/styles.sass'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [{
                    cwd: 'grunt-compiled/jade/',
                    src: ['*.jade', '!includes/*.jade'],
                    dest: 'public',
                    ext: '.html',
                    expand: true
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: '*',
                    base: './public',
                    livereload: true
                }
            }
        },
        watch: {
            jade: {
                files: 'grunt-compiled/jade/**/*.jade',
                tasks: 'jade'
            },
            sass: {
                files: 'grunt-compiled/sass/**/*.{sass, scss}',
                tasks: 'sass'
            },
            uglify: {
                files: 'grunt-compiled/js/**/*.js',
                tasks: 'uglify'
            },
            serve: {
                files: 'public/**',
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'jade', 'connect', 'watch']);
    grunt.registerTask('compile', ['sass', 'jade']);

};
