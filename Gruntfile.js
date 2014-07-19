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
          { expand: true, src: 'src/client/app/*', dest: 'dist/client/app/', filter: 'isFile', flatten: true }
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'copy']);

};
