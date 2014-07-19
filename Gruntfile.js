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
        src: ['src/client/app/bower_components/angular/angular.js',
              'src/client/app/bower_components/angular-route/angular-route.js',
              'src/client/app/bower_components/angular-cookies/angular-cookies.js',
              'src/client/app/bower_components/angular-resource/angular-resource.js',
              'src/client/app/bower_components/autofill-event/src/autofill-event.js'],
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

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'copy', 'sass']);

};
