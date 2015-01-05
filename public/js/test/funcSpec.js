describe('Arnold clark Technical test', function() {
    it('should be able to find a car by stock reference and registration', function() {
         browser.get('http://localhost:9000');
         element(by.model('stockRef')).sendKeys('ARNCI-U-27455');
         element(by.model('registration')).sendKeys('CA04LPK');
         element(by.id('findCar')).click();

         browser.wait(function () {
            return element(by.css('.thumbnail-image:first-child')).isPresent().then(function (isPresent) {
                return isPresent;
            });
        });
        expect(element(by.css('.thumbnail-image:first-child')).isPresent()).toBe(true); 
    });
});