var bowerJsFiles = [
	'bower_components/angular/angular.js'
	];
var bowerCssFiles = [
	'bower_components/bootstrap/dist/css/bootstrap.css'
];

var allDevJsFiles = [
	'bower_components/angular/angular.js', 'client/dev/**/*.js'
];
var allDevCssFiles = [
	'bower_components/bootstrap/dist/css/bootstrap.css', 'client/dev/**/*.css'
];


module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			// gruntfile is a sub-task of watch
			gruntfile: {
				// '**/' means search up to any number of directories
				files: ['Gruntfile.js'],
				// perform jshint on Gruntfile.js
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
				// perform jshint on all the .js files under server
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
		// sails-linker injects html tags 
		'sails-linker': {
			'dev-bower-JS': {
				options: {
					startTag: '<!-- START BOWER JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					// '/lib' is bower_components
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
					fileTmpl: '<script src="%s"></script>',
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
			},


			'prod-local-JS': {
				options: {
					startTag: '<!-- START LOCAL JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="%s"></script>',
					appRoot: 'client/prod'
				},
				files: {
					'client/prod/index.html': ['client/prod/scripts/threePages.min.js']
				}
			},
			'prod-local-CSS': {
				options: {
					startTag: '<!-- START LOCAL CSS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="%s"></link>',
					appRoot: 'client/prod'
				},
				files: {
					'client/prod/index.html': ['client/prod/styles/threePages.min.css']
				}
			},
			'prod-bower-JS': {
				options: {
					startTag: '<!-- START BOWER JS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<script src="/lib%s"></script>',
					appRoot: 'bower_components'
				},
				files: {
					'client/prod/index.html': []
				}
			},
			'prod-bower-CSS': {
				options: {
					startTag: '<!-- START BOWER CSS INJECT -->',
					endTag: '<!-- END INJECT -->',
					fileTmpl: '<link rel="stylesheet" type="text/css" href="/lib%s"></link>',
					appRoot: 'bower_components'
				},
				files: {
					'client/prod/index.html': []
				}
			},
		},
		uglify: {
			prod: {
				files: {
					'client/prod/scripts/threePages.min.js': allDevJsFiles
				}
			}
		},
		cssmin: {
			prod: {
				files: {
					'client/prod/styles/threePages.min.css': allDevCssFiles
				}
			}
		},
		copy: {
			prod: {
				files: [
				//cwd: common working directory
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
	grunt.registerTask('prod', ['uglify', 'cssmin', 'copy', 'sails-linker:prod-local-JS', 'sails-linker:prod-local-CSS', 'sails-linker:prod-bower-JS', 'sails-linker:prod-bower-CSS']);
};