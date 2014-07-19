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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};
