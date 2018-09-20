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
      TMOBILE,
      STATES } = require('../../fixtures');

describe('TelematicsOrderSimsCCKoreTUsaR-Tmobile Activation', function() {
  var EC = protractor.ExpectedConditions;
  
  it('should login tmo', function() {
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
  
  it('should navigate to Deactivate now page', function() {
    HomePage.clickNewRequestTab();
    browser.wait(EC.visibilityOf(HomePage.deactivateLink), 5000);
    HomePage.clickDeactivateLink();
  });
  
  it('should select T-Mobile service type', function() {
    NewRequestPage.serviceTypeDropdown.sendKeys(TMOBILE.NAME);    
    browser.wait(EC.elementToBeClickable(NewRequestPage.fromStateDropdown), 5000);
    NewRequestPage.fromStateDropdown.sendKeys(STATES.ACTIVE);
    NewRequestPage.proceedButton.click();
  });
  
  it('should select sim from the grid', function() {
    NewRequestPage.firstSim.click();
    NewRequestPage.simListProceedButton.click();        
  });

  // it('should confirm the deactivation request', function() {
  //   browser.wait(EC.presenceOf(NewRequestPage.confirmationEmailRadio))
  //   .then(function(){
  //     NewRequestPage.confirmationEmailRadio.click();
  //     NewRequestPage.confirmationEmailText.sendKeys(CONFIRMATION_EMAIL);
  //     NewRequestPage.acknowledgeRadio.click();
  //     NewRequestPage.confirmationButton.click();
  //   })    
  // })
  // 
  // it('should navigate to deactivation page', function() {
  //   browser.wait(EC.presenceOf(NewRequestPage.trackingNumberLink))
  //   .then(function(){
  //     NewRequestPage.trackingNumberLink.click();
  //   })
  // })
   
});