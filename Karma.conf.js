module.exports = function(config) {
    config.set({
      preprocessors: {
        'src/app/components/countdowntimer/countdowntimer.html': ['ng-html2js']
      },

      frameworks: ['jasmine'],

      files: [
        'src/vendor/js/angular.min.js',
        'src/vendor/js/*.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/app/*.js',
        'src/app/**/*.js',
        'src/app/components/countdowntimer/countdowntimer.html'
      ],

      ngHtml2JsPreprocessor: {
        moduleName: 'tpl',
      },

      port: 8080,

      logLevel: config.LOG_INFO,

      autoWatch: true,

      browsers: ['Chrome'],
      
      singleRun: false
    });
  };