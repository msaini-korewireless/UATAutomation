var WelcomePage = function() {
  var searchInput = element(by.id('ctl00_uxQuickSearch1_QuickSearchQuery'));
  var searchDropdown = element(by.id('ctl00_uxQuickSearch1_QuickSearchList'));
  var searchButton = element(by.id('ctl00_uxQuickSearch1_QuickSearchLaunch'));
  
  this.get = () => {
    
  };
  
  this.setSearchInput = (search) => {
    searchInput.sendKeys(search)
  };
  
  this.clickSearch = () => {
    searchButton.click();
  };
};

module.exports = new WelcomePage();