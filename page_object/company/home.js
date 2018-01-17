var HomePage = function(){
  this.newRequestTab = element(by.linkText('New Requests'));
  this.activateNowLink = element(by.linkText('Activate Now'));
  this.deactivateLink = element(by.linkText('Deactivate'));
  
  this.clickNewRequestTab = () => this.newRequestTab.click();
  this.clickActivateNow = () => this.activateNowLink.click();
  this.clickDeactivateLink = () => this.deactivateLink.click();
}

module.exports = new HomePage();