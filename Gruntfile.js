var bowerJsFiles = [
	'bower_components/angular/angular.js'
	];

var allJsFiles = [
	'bower_components/angular/angular.js', 'client/dev/**/*.js'
];

var bowerCssFiles = [
	'bower_components/bootstrap/dist/css/bootstrap.css'
];	

var allCssFiles = [
	'bower_components/bootstrap/dist/css/bootstrap.css', 'client/dev/**/*.css'
];

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			gruntfile: {
				// **/ means search up to any number of directories
				files: ['Gruntfile.js'],
				tasks: [
					'jshint:gruntfile',
					'sails-linker:dev-bower-JS',
					'sails-linker:dev-local-JS'
				],
				options: {
					spawn: false,
				}
			},
			server: {
				files: ['server/**/*.js'],
				tasks: ['jshint:server'],
				options: {
					spawn: false,
				}
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'server/**/*.js'],
			gruntfile: ['Gruntfile.js'],
			server: ['server/**/*.js']
		},
		'sails-linker': {
			'dev-bower-JS': {
				options: {
					startTag: '<!-- START BOWER JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="/lib%s"></script>',
					appRoot: 'bower_components'
				},
				files: {
					'client/dev/index.html': bowerJsFiles
				}
			},
			'dev-local-JS': {
				options: {
					startTag: '<!-- START LOCAL JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="/js%s"></script>',
					appRoot: 'client/dev'
				},
				files: {
					'client/dev/index.html': ['client/dev/**/*.js']
				}
			},
			'dev-bower-CSS': {
				options: {
					startTag: '<!-- START BOWER CSS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="/lib%s"></link>',
					appRoot: 'bower_components'
				},
				files: {
					'client/dev/index.html': bowerCssFiles
				}
			},
			'dev-local-CSS': {
				options: {
				startTag: '<!-- START LOCAL CSS INJECT -->',
				endTag: '<!-- END INJECT -->',
				fileTmpl: '<link rel="stylesheet" type="text/css" href="%s"></link>',
				appRoot: 'client/dev'
				},
				files: {
					'client/dev/index.html': ['client/dev/**/*.css']
				}
			}
		},
		uglify: {
			prod: {
				files: {
					'client/prod/js/threePages.min.js': allJsFiles
				}
			}
		},
		cssmin: {
			prod: {
				files: {
					'client/prod/styles/threePages.min.css': allCssFiles
				}
			}
		},
		copy: {
			prod: {
				files: [
					{expand: true, cwd: 'client/dev', src: ["images/**", 'views/**', 'index.html'], dest: "client/prod/"}
				] 
			}
		}
	});

	// equivalent to require in grunt
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-sails-linker');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dev', ['sails-linker:dev-bower-JS', 'sails-linker:dev-local-JS', 'sails-linker:dev-bower-CSS','sails-linker:dev-local-CSS',
 'watch']);
	grunt.registerTask('prod', ['uglify', 'cssmin', 'copy']);
};