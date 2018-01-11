var LoginPage = require('../page_object/login');
var WelcomePage = require('../page_object/welcome');
var SearchResultsPage = require('../page_object/search_result');
var HomePage = require('../page_object/company/home');
var NewRequestPage = require('../page_object/company/new_request');
var testHelpers = require('../helpers/test_helpers');
var _ = require('lodash');
var { SID_USERNAME,
      SID_PASSWORD,
      COMPANY_NAME,
      CONFIRMATION_EMAIL,
      TMOBILE,
      STATES } = require('../const');

describe('Tmobile Activation', function() {
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
    browser.wait(EC.visibilityOf(HomePage.activateNowLink), 5000);
    HomePage.clickActivateNow();;
  });
  
  it('should select T-Mobile service type', function() {
    NewRequestPage.serviceTypeDropdown.sendKeys(TMOBILE.NAME);    
    browser.wait(EC.elementToBeClickable(NewRequestPage.toStateDropdown), 5000);
    NewRequestPage.toStateDropdown.sendKeys(STATES.ACTIVE);
    NewRequestPage.proceedButton.click();
  });
  
  it('should select sim from the grid', function() {
    NewRequestPage.firstSim.click();
    NewRequestPage.simListProceedButton.click();        
  });
  
  it('should select features', function() {
    var promises = [];
    NewRequestPage.dataPlanDropdown.sendKeys(TMOBILE.DATA_PLAN_CLASS);    
    browser.wait(EC.elementToBeClickable(NewRequestPage.smsPlanDropdown));
    NewRequestPage.smsPlanDropdown.sendKeys(TMOBILE.SMS_PLAN_CLASS);    

    _.forEach(TMOBILE.APN, function(feature){
      switch (feature) {        
        case 'KTUSA Data - APN C1':
          browser.wait(EC.presenceOf(NewRequestPage.apnC1Feature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnC1Feature));            
            promises.push(promise);
            return promise
          })
          break;
        case 'KTUSA Data - APN C2':
          browser.wait(EC.presenceOf(NewRequestPage.apnC2Feature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnC2Feature));            
            promises.push(promise);
            return promise
          })
          break;
        case 'KTUSA Data - APN Grid':
          browser.wait(EC.presenceOf(NewRequestPage.apnGridFeature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnGridFeature));
            promises.push(promise);
            return promise;
          })
          break;
        case 'KTUSA Data - APN Slogic':
          browser.wait(EC.visibilityOf(NewRequestPage.apnSlogicFeature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnSlogicFeature));
            promises.push(promise);
            return promise;
          })
          break;
        case 'KTUSA Data - APN Smartdrive':
          browser.wait(EC.visibilityOf(NewRequestPage.apnSmartDriveFeature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnSmartDriveFeature));            
            promises.push(promise);
            return promise
          })
          break;
        case 'KTUSA Data IP - Dynamic':          
          browser.wait(EC.presenceOf(NewRequestPage.apnDynamicFeature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnDynamicFeature));
            promises.push(promise);
            return promise;      
          })
          break;
        case 'KTUSA Data IP - Private Static':
          browser.wait(EC.presenceOf(NewRequestPage.apnPrivateStaticFeature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnPrivateStaticFeature));            
            promises.push(promise);
            return promise;
          })
          break;
        case 'KTUSA Data IP - Public Static':
          browser.wait(EC.visibilityOf(NewRequestPage.apnPublicStaticFeature))
          .then(function(res){
            var promise = browser.wait(testHelpers.clickElement(NewRequestPage.apnPublicStaticFeature));
            promises.push(promise);
            return promise;
          })
          break;
        default:
          break;
      }
    })    
    // make sure all the configured plans are selected
    protractor.promise.all(promises)
    .then(function(){
      NewRequestPage.simFeaturesProceedButton.click();
    })    
  })
  
  it('should confirm the activation request', function() {
    browser.wait(EC.presenceOf(NewRequestPage.confirmationEmailRadio))
    .then(function(){
      NewRequestPage.confirmationEmailRadio.click();
      NewRequestPage.confirmationEmailText.sendKeys(CONFIRMATION_EMAIL);
      NewRequestPage.confirmationButton.click();
    })    
  })
  
  it('should navigate to activation page', function() {
    browser.wait(EC.presenceOf(NewRequestPage.trackingNumberLink))
    .then(function(){
      NewRequestPage.trackingNumberLink.click();
    })
  })
  
  it('should what?', function(){
    browser.sleep(50000);
  })
   
  
});