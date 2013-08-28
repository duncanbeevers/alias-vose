module.exports = function(grunt) {

  grunt.initConfig({
    haxe: {
      build: {
        main: 'Runner',
        classpath: [ '.' ],
        output: {
          js: {
            output: 'build/js/Runner.js'
          },
          php: {
            output: 'build/php/Runner.php',
            misc: [ '-D', 'noEmbedJS' ]
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-haxe');

  grunt.registerTask('build', [ 'haxe' ]);

  grunt.registerTask('run', 'Run the various Alias Vose builds', function() {
    var done = this.async(),
        exec = require('child_process').exec,
        async = require('async');

    function run(command, fn) {
      var childProcess = exec(command);
      childProcess.stdout.on("data", function(data) {
        console.log(data);
      });
      childProcess.on("exit", fn);
    };

    async.eachSeries([
      "node build/js/Runner.js",
      "php build/php/Runner.php/index.php"
    ], run, done);
  });

  grunt.registerTask('default', [ 'build' ]);

};
