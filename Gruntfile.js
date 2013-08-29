'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var fruitConfig = {
    src: 'source',
    app: 'views',
    mockup: 'public'
  };

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    fruit: fruitConfig,
    watch: {
      stylus: {
        files: ['<%= fruit.src %>/css/{,*/}*.styl'],
        tasks: ['stylus:development'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      coffee: {
        files: ['<%= fruit.src %>/js/{,*/}*.coffee'],
        tasks: ['coffee:development'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      development: {
        options: {
          nospawn: true,
          livereload: true
        },
        files: [
          '<%= fruit.views %>/{,*/}*.html',
          '<%= fruit.mockup %>/{,*/}*.css',
          '<%= fruit.mockup %>/{,*/}*.js',
          '<%= fruit.mockup %>/{,*/}*.{png,jpg,jpeg,gif}'
        ],
        tasks: []
      }
    },
    stylus: {
      development: {
        options: {
          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
          compress: false,
          linenos: true
        },
        files: {
          '<%= fruit.mockup %>/css/style.css': '<%= fruit.src %>/css/*.styl' // compile and concat into single file
        }
      },
      production: {
        options: {
          urlfunc: 'embedurl'
        },
        files: {
          '<%= fruit.mockup %>/css/style.css': '<%= fruit.src %>/css/*.styl'
        }
      }
    },
    coffee: {
      development: {
        options: {
          sourceMap: true,
          bare: true
        },
        files: [{
          expand: true,
          cwd: '<%= fruit.src %>/js',
          src: '*.public.coffee',
          dest: '<%= fruit.mockup %>/js',
          ext: '.js'
        }, {
          expand: true,
          cwd: '<%= fruit.src %>/js',
          src: '*.server.coffee',
          dest: '.',
          ext: '.js'
        }]
      },
      production: {
        options: {
          bare: true,
          join: true
        },
        files: [{
          expand: true,
          cwd: '<%= fruit.src %>/js',
          src: '*.public.coffee',
          dest: '<%= fruit.mockup %>/js',
          ext: '.js'
        }, {
          expand: true,
          cwd: '<%= fruit.src %>/js',
          src: '*.server.coffee',
          dest: '.',
          ext: '.js'
        }]
      }
    },
    clean: {
      production: {
        src: ['<%= fruit.mockup %>/js/*.map', '*.map']
      }
    }
  });

  grunt.registerTask('build', [
    'stylus:production',
    'coffee:production',
    'clean:production'
  ]);
  grunt.registerTask('b', ['build'])

  grunt.registerTask('server', [
    'stylus:development',
    'coffee:development',
    'watch'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

};
