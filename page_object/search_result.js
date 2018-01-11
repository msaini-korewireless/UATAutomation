var { COMPANY_NAME  } = require('../const');

var SearchResultsPage = function() {
  var resultLink = element(by.linkText(COMPANY_NAME));
  
  this.clickCompany = () => {
    resultLink.click();
  }
  
}

module.exports = new SearchResultsPage();
