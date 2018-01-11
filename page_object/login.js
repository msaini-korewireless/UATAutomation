var { SID_URL } = require('../const');

var LoginPage = function(){
  var usernameInput = element(by.id('ctl00_MainContent_uxLogin1_LoginView1_LoginControl_UserName'));
  var passwordInput = element(by.id('ctl00_MainContent_uxLogin1_LoginView1_LoginControl_Password'));
  var loginButton = element(by.id('ctl00_MainContent_uxLogin1_LoginView1_LoginControl_LoginButton'));
  
  this.get = () => {
    browser.waitForAngularEnabled(false);
    browser.get(SID_URL);
  };
  
  this.setUsername = (username) => {
    usernameInput.sendKeys(username);
  };
  
  this.setPassword = (password) => {
    passwordInput.sendKeys(password);
  };
  
  this.clickLogin = () => {
    loginButton.click();
  };
  
};

module.exports = new LoginPage();