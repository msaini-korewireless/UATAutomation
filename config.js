var request = require('sync-request');
let base64 = require('base-64');

let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var params = require('./fixtures');
var TR = require('./TestRail.js')
var testrailTests = {};
var tr = new TR()
      
//run it by protractor config.js --params.PlanID 22378
exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    print: function () {}
  }, 

  params: params, 

  onPrepare: function () {
    /*jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      },
      summary: {
        displayDuration: false
      }
    }))*/

    if(browser.params.PlanId==0)
    {
      throw new Error("User did not specify planID");
    }
    console.log("Using planId: "+browser.params.PlanId)
    jasmine.getEnv().addReporter(myReporter);
    getTestIds(browser.params.PlanId);

  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {browserName: 'chrome'},
  suites: {
    activation: './spec/activation/tmo_activation.spec.js',
    deactivation: './spec/deactivation/*.spec.js',
    //activation: './spec/activation/*.spec.js',
    //activationVerfiy: './spec/verify_activation/*.spec.js',
    //deactivation: './spec/deactivation/*.spec.js',
    //deactivationVerfiy: './spec/verify_deactivation/*.spec.js'    
  },
}

var myReporter = {

  suiteStarted: function(result){
    var automatedId=result.fullName.split("-")[0].trim();
    var testId=testrailTests[automatedId];
    var statusId=1; 

    tr.automatedId = automatedId;
    tr.testId = testId;
    tr.statusId = statusId;
    tr.comment = [];
  },

  specDone: function(result) {   
    if(result.status=='failed')
    {
      tr.statusId=5;
    }

    tr.comment.push({"step":result.description})
    tr.comment.push(result.failedExpectations)
  },
  suiteDone:function(result){    
    console.log("suite done");
    try {    
      if(tr.testId>0)
      {
        console.log('post result for testid '+tr.testId)
        postResult();
      }
      else {
        console.log('we are not posting result for test id '+tr.testId)
      }
    }
    catch(error) {
      console.log("error",error)
    } 
  }
}

function postResult() {  
  var res = request('POST', 'https://korewireless.testrail.com/index.php?/api/v2/add_result/'+tr.testId, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+base64.encode('qa_connectivity@korewireless.com' + ":" + 'password')
    },
    body: JSON.stringify({status_id:tr.statusId,comment:JSON.stringify(tr.comment)})  
  });  
  //console.log(JSON.parse(res.getBody('utf8')));
}

function getTestIds(planId) {
  var runIds = [];

  var res = request('GET', 'https://korewireless.testrail.com/index.php?/api/v2/get_Plan/'+planId, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+base64.encode('qa_connectivity@korewireless.com' + ":" + 'password')
    }
  });  
  var body =JSON.parse(res.getBody('utf8'));
  body.entries.forEach(function(entry){
    entry.runs.forEach(function(run){
      runIds.push(run.id);
    })
  });  
  
  runIds.forEach(function(runId)
  {
    res = request('GET', 'https://korewireless.testrail.com/index.php?/api/v2/get_tests/'+runId, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic '+base64.encode('qa_connectivity@korewireless.com' + ":" + 'password')
      }
    });  
    var body =JSON.parse(res.getBody('utf8'));

    body.forEach(function(test){
      testrailTests[test.custom_automated_test_id]=test.id;
    })
  })
}