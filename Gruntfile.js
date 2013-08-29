// Node modules we'll use elsewhere
var exec = require('child_process').exec;
var async = require('async');

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

  // Haxe does all the building
  grunt.registerTask('build', [ 'haxe' ]);

  // Run the Haxe-built compiles serially,
  // logging their output via Grunt
  grunt.registerTask('run', 'Run the various Alias Vose builds', function() {
    var done = this.async();

    function run(command, fn) {
      var childProcess = exec(command);

      // Log output data from child process
      childProcess.stdout.on("data", function(data) {
        grunt.log.write(data);
      });

      // Inform async this job is complete
      childProcess.on("exit", fn);
    };

    async.eachSeries([
      'node build/js/Runner.js',
      'php build/php/Runner.php/index.php'
    ], run, done);
  });

  grunt.registerTask('default', [ 'build', 'run' ]);

};
