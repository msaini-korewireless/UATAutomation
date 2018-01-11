var _protractor = require('protractor');

var testHelpers = function(){
  
  this.clickElement = (el) => {
    return new _protractor.promise.Promise(function (resolve) {
      var interval = setInterval(function () {
        el.click().then(function () {
          clearInterval(interval);
          setTimeout(function () {
            resolve(true);
          }, 500);
        }, function () {});
      }, 100);
    });
  }
};

module.exports = new testHelpers();