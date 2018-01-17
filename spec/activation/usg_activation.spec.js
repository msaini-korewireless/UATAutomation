var LoginPage = require('../../page_object/login');
var WelcomePage = require('../../page_object/welcome');
var SearchResultsPage = require('../../page_object/search_result');
var HomePage = require('../../page_object/company/home');
var NewRequestPage = require('../../page_object/company/new_request');
var testHelpers = require('../../helpers/test_helpers');
var _ = require('lodash');
var { SID_USERNAME,
      SID_PASSWORD,
      COMPANY_NAME,
      CONFIRMATION_EMAIL,
      USG,
      STATES } = require('../../fixtures');

describe('USG Activation', function() {
  var EC = protractor.ExpectedConditions;
  
  it('should login', function() {
    LoginPage.get();  
    LoginPage.setUsername(SID_USERNAME);
    LoginPage.setPassword(SID_PASSWORD);
    LoginPage.clickLogin();    
  });
  
  it('should search company in welcome page', function() {
    WelcomePage.setSearchInput(COMPANY_NAME);
    WelcomePage.clickSearch();
  });
  
  it('should navigate to specified company', function() {
    SearchResultsPage.clickCompany();
  });
  
  it('should navigate to Activate now page', function() {
    HomePage.clickNewRequestTab();
    browser.wait(EC.visibilityOf(HomePage.activateNowLink))
    .then(function(){
      HomePage.clickActivateNow();      
    })    
  });
  
  it('should select USG service type', function() {
    NewRequestPage.serviceTypeDropdown.sendKeys(USG.NAME);    
    browser.wait(EC.elementToBeClickable(NewRequestPage.toStateDropdown))
    .then(function(){
      NewRequestPage.toStateDropdown.sendKeys(STATES.ACTIVE);
      NewRequestPage.proceedButton.click();      
    });    
  });
  
  it('should select sim from the grid', function() {
    NewRequestPage.firstSim.click();
    NewRequestPage.simListProceedButton.click();        
  });
  
  it('should select features', function() {
    var promises = [];
    NewRequestPage.dataPlanDropdown.sendKeys(USG.DATA_PLAN_CLASS);
    browser.wait(EC.elementToBeClickable(NewRequestPage.smsPlanDropdown))
    .then(function(){
      NewRequestPage.smsPlanDropdown.sendKeys(USG.SMS_PLAN_CLASS);
      return browser.wait(EC.visibilityOf(NewRequestPage.apnDropdown))
    })
    .then(function(){
      NewRequestPage.apnDropdown.sendKeys(USG.APN);
      NewRequestPage.simFeaturesProceedButton.click();
    })    
  })
  
  // it('should confirm the activation request', function() {
  //   browser.wait(EC.presenceOf(NewRequestPage.confirmationEmailRadio))
  //   .then(function(){
  //     NewRequestPage.confirmationEmailRadio.click();
  //     NewRequestPage.confirmationEmailText.sendKeys(CONFIRMATION_EMAIL);
  //     NewRequestPage.confirmationButton.click();
  //   })    
  // })
  // 
  // it('should navigate to activation page', function() {
  //   browser.wait(EC.presenceOf(NewRequestPage.trackingNumberLink))
  //   .then(function(){
  //     NewRequestPage.trackingNumberLink.click();
  //   })
  // })
  
  // it('should what?', function(){
  //   browser.sleep(50000);
  // })
   
  
});