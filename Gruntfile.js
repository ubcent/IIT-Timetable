module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    	concat: {
			dist: {
				src: [
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/mustache/mustache.min.js',
					'js/libs/*.js', 
					'js/global.js',
				],
				dest: 'js/build/timetable.js',
			}
		},
    	
    	uglify: {
			build: {
				src: 'js/build/timetable.js',
				dest: 'js/build/timetable.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/global.css': 'css/*.css'
				}
			}
		}

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'sass']);
};