module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      app: {
        src: ['src/client/app/js/*.js'],
        dest: 'dist/client/app/js/app.js'
      },
      lib: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/bootstrap/dist/js/bootstrap.js',
              'bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
              'bower_components/angular/angular.js',
              'bower_components/angular-route/angular-route.js',
              'bower_components/angular-cookies/angular-cookies.js',
              'bower_components/angular-resource/angular-resource.js',
              'bower_components/autofill-event/src/autofill-event.js'],
        dest: 'dist/client/app/js/lib.js'
      }
    },
    uglify: {
      app: {
        files: {'dist/client/app/js/app.min.js': ['dist/client/app/js/app.js']}
      },
      lib: {
        files: {'dist/client/app/js/lib.min.js': ['dist/client/app/js/lib.js']}
      }
    },
    copy: {
      app: {
        files: [
          { expand: true, src: 'src/client/app/*', dest: 'dist/client/app/', filter: 'isFile', flatten: true },
          { expand: true, cwd: 'src/client/app/', src: 'partials/*', dest: 'dist/client/app/' }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: ['bower_components/foundation/scss']
        },
        files: {
          'dist/client/app/css/app.css': 'src/client/app/sass/app.sass',
          'dist/client/app/css/theme.css': 'src/client/app/sass/theme.sass'
        }
      },
      deploy: {
        options: {
          includePaths: ['bower_components/foundation/scss'],
          outputStyle: 'compressed'
        },
        files: {
          'dist/client/app/css/app.min.css': 'src/client/app/sass/app.sass',
          'dist/client/app/css/theme.min.css': 'src/client/app/sass/theme.sass'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/client/app/css/stylesheets.css': [
            'bower_components/html5-boilerplate/css/normalize.css',
            'bower_components/html5-boilerplate/css/main.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css',
          ]
        }
      },
      minify: {
        expand: true,
        cwd: 'dist/client/app/css',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/client/app/css',
        ext: '.min.css'
      }
    },
    protractor_webdriver: {
      app: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },
    protractor: {
        options: {
            configFile: "node_modules/protractor/referenceConf.js",
            keepAlive: true,
            noColor: false,
            args: {
            }
        },
        apptarget: {
            options: {
                configFile: "e2e/e2e.conf.js",
                args: {}
            }
        }
    }
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "copy" task.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-sass');
  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load the "protractor webdriver" plugin
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  // Load the plugin that provides the "protractor" task.
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'copy', 'sass', 'cssmin']);
  grunt.registerTask('test', ['protractor_webdriver', 'protractor']);
};
