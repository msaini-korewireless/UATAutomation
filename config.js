let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var params = require('./fixtures');
      
exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    print: function () {}
  },  
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }))
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{browserName: 'chrome', shardTestFiles: true, maxInstances: 5}],
  suites: {
    activation: './spec/activation/*.spec.js',
    activationVerfiy: './spec/verify_activation/*.spec.js',
    deactivation: './spec/deactivation/*.spec.js',
    deactivationVerfiy: './spec/verify_deactivation/*.spec.js'    
  },  
  params: params
}