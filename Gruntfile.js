module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Read the package file for this project
    pkg: grunt.file.readJSON('package.json'),
    // Concatenate all our scripts for application, as well as all deps into two
    // javascript files
    concat: {
      app: {
        src: ['src/client/app/js/*.js'],
        dest: 'dist/app/js/app.js'
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
        dest: 'dist/app/js/lib.js'
      }
    },
    // Uglification of our app requires a more strict syntax for defining all
    // Angular modules, controllers, etc. However, it's nice to know we can do
    // that, and all Angular code is compatible now.
    uglify: {
      app: {
        files: {'dist/app/js/app.min.js': ['dist/app/js/app.js']}
      },
      lib: {
        files: {'dist/app/js/lib.min.js': ['dist/app/js/lib.js']}
      }
    },
    // We are just copying the single page HTML and the partials over to the
    // distribution directory.
    copy: {
      app: {
        files: [
          { expand: true, src: 'src/client/app/*', dest: 'dist/app/', filter: 'isFile', flatten: true },
          { expand: true, cwd: 'src/client/app/', src: 'partials/*', dest: 'dist/app/' }
        ]
      }
    },
    // Compile the SASS stylesheets to CSS
    sass: {
      dev: {
        options: {
          includePaths: ['bower_components/foundation/scss']
        },
        files: {
          'dist/app/css/app.css': 'src/client/app/sass/app.sass',
          'dist/app/css/theme.css': 'src/client/app/sass/theme.sass'
        }
      },
      // Minify the stylesheets for release
      deploy: {
        options: {
          includePaths: ['bower_components/foundation/scss'],
          outputStyle: 'compressed'
        },
        files: {
          'dist/app/css/app.min.css': 'src/client/app/sass/app.sass',
          'dist/app/css/theme.min.css': 'src/client/app/sass/theme.sass'
        }
      }
    },
    // Minify the dependency stylesheets for release
    cssmin: {
      // First combine them all
      combine: {
        files: {
          'dist/app/css/stylesheets.css': [
            'bower_components/html5-boilerplate/css/normalize.css',
            'bower_components/html5-boilerplate/css/main.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css',
          ]
        }
      },
      // Then compress them
      minify: {
        expand: true,
        cwd: 'dist/app/css',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/app/css',
        ext: '.min.css'
      }
    },
    // The protractor webdriver is required to start the Selenium automated
    // browser testing system
    protractor_webdriver: {
      app: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    },
    // Protractor is called to actually perform the end to end tests
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
                configFile: "tests/e2e/e2e.conf.js",
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
  // Testing task(s).
  grunt.registerTask('test', ['protractor_webdriver', 'protractor']);
};
