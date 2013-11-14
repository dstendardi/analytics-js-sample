var assert = require('assert')
    , webdriver = require('selenium-webdriver')
    , fs = require('fs');


describe('Google Search', function () {

    beforeEach(function(cb){
        fs.unlink('/tmp/analyticLogs', function (err) {
            console.log(err || 'successfully deleted /tmp/analyticLogs');
            cb();
        });
    });

    it('should work', function (cb) {

        var driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        var promise = driver.get('http://localhost:3000');
        promise.then(function() {
            return driver.findElement(webdriver.By.linkText('go to b'))
                .click();
        }).then(function() {
            return driver.findElement(webdriver.By.linkText('go to c'))
                .click();
        }).then(function() {
            return driver.findElement(webdriver.By.css('h1')).getText();
        }).then(function(value) {
            assert.equal(value, 'Well done !');
            driver.quit();
        }).then(function() {
            fs.readFile('/tmp/analyticLogs', "utf-8", function (err, data) {
                if (err) throw err;
                assert.equal(data, ["a", "b", "c"].join("\n")+"\n");
                cb();
            });
        });
    });
});