var util = require('util');
 
describe("delete product interface", function () {
var ptor;
beforeEach(function() {
// get protractor instance
ptor = protractor.getInstance();
});

// Test for initial conditions
it("should display the product listing with 4 elements", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(4);
});

it("should allow the removal of an item (1/4)", function() {
ptor.get("/app/index.html#/products/product-a");
ptor.driver.executeScript("$.fx.off = true;");
element(by.id("removebutton")).click();
});

// Test to see if we have wiped out a listing...
it("should display the product listing with 3 elements", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(3);
});

it("should allow the removal of an item (2/4)", function() {
ptor.get("/app/index.html#/products/product-b");
ptor.driver.executeScript("$.fx.off = true;");
element(by.id("removebutton")).click();
});

// Test to see if we have wiped out a listing...
it("should display the product listing with 2 elements", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(2);
});

it("should allow the removal of an item (3/4)", function() {
ptor.get("/app/index.html#/products/product-c");
ptor.driver.executeScript("$.fx.off = true;");
element(by.id("removebutton")).click();
});

// Test to see if we have wiped out a listing...
it("should display the product listing with 1 elements", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(1);
});

it("should allow the removal of an item (4/4)", function() {
ptor.get("/app/index.html#/products/product-d");
ptor.driver.executeScript("$.fx.off = true;");
element(by.id("removebutton")).click();
});

// Test to see if we have wiped out a listing...
it("should display the product listing with no elements", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(0);
});


});
