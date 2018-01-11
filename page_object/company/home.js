var HomePage = function(){
  this.newRequestTab = element(by.linkText('New Requests'));
  this.activateNowLink = element(by.linkText('Activate Now'));
  
  this.clickNewRequestTab = () => this.newRequestTab.click();
  this.clickActivateNow = () => this.activateNowLink.click();
  
}

module.exports = new HomePage();