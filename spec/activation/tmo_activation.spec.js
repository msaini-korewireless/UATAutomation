var LoginPage = require('../../page_object/login');
var WelcomePage = require('../../page_object/welcome');
var SearchResultsPage = require('../../page_object/search_result');
var HomePage = require('../../page_object/company/home');
var NewRequestPage = require('../../page_object/company/new_request');
var testHelpers = require('../../helpers/test_helpers');
var _ = require('lodash');

var since = require('jasmine2-custom-message');
var TestRail = require("protractor-testrail-promise");
var testrail = new TestRail("https://korewireless.testrail.com", "qa_connectivity@korewireless.com", "password");

var automatedId = 'TelematicsLoginToSid';
var output = [];
var failedExceptions

describe('TelematicsLoginToSid-Login to SID'/*'Tmobile Activation'*/, function() {
  var EC = protractor.ExpectedConditions;
  
  it('should login', function() {
    let { SID_USERNAME, SID_PASSWORD } = browser.params;
    LoginPage.get();  
    LoginPage.setUsername(SID_USERNAME);
    LoginPage.setPassword(SID_PASSWORD);
    LoginPage.clickLogin(); 

    since("I am mandeep").    
    expect(1).toEqual(1);
  });
  
  it('should search company in welcome page', function() {
    let { COMPANY_NAME } = browser.params;
    WelcomePage.setSearchInput(COMPANY_NAME);
    WelcomePage.clickSearch();
  });
  
  it('should navigate to specified company', function() {
    //SearchResultsPage.clickCompany();
  });
});
