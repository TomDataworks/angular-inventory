var util = require('util');
 
describe("update product interface", function () {
var ptor;
beforeEach(function() {
// get protractor instance
ptor = protractor.getInstance();
});

// We want to see if we can update a few product listings with new numbers.
it("should allow updating the first product entry count", function() {
ptor.get("/client/app/index.html#/products/product-a");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element(by.model("product.fields.count"));
// First check if the initial value is correct
expect(elements.getAttribute('value')).toEqual('5');
elements.clear().sendKeys('54321');
element(by.id("savebutton")).click();
});

it("should allow updating the second product entry count", function() {
ptor.get("/client/app/index.html#/products/product-b");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element(by.model("product.fields.count"));
// First check if the initial value is correct
expect(elements.getAttribute('value')).toEqual('280');
elements.clear().sendKeys('64321');
element(by.id("savebutton")).click();
});

// Now we want to check to make sure the numbers were updated
it("should have updated the first product entry count", function() {
ptor.get("/client/app/index.html#/products/product-a");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element(by.model("product.fields.count"));
// First check if the initial value is correct
expect(elements.getAttribute('value')).toEqual('54321');
});

it("should have updated the second product entry count", function() {
ptor.get("/client/app/index.html#/products/product-b");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element(by.model("product.fields.count"));
// First check if the initial value is correct
expect(elements.getAttribute('value')).toEqual('64321');
});


});
