var util = require('util');
 
describe("lookup product interface", function () {
var ptor;
beforeEach(function() {
// get protractor instance
ptor = protractor.getInstance();
});

// This is stuff that should have been set up initially by the add_products_spec
// test, if it's the wrong number of elements something failed there.
it("should display the product listing with 4 elements", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(4);
});

// We want to make sure we are displaying product listings at all.
it("should display the product listing properly (1/4)", function() {
ptor.get("/app/index.html#/products/product-a");
ptor.driver.executeScript("$.fx.off = true;");
//ptor.sleep(1000);
var elements = element(by.model("product.fields.count"));
expect(elements.getAttribute('value')).toEqual('5');
});

it("should display the product listing properly (2/4)", function() {
ptor.get("/app/index.html#/products/product-b");
ptor.driver.executeScript("$.fx.off = true;");
//ptor.sleep(1000);
var elements = element(by.model("product.fields.count"));
expect(elements.getAttribute('value')).toEqual('280');
});

it("should display the product listing properly (3/4)", function() {
ptor.get("/app/index.html#/products/product-c");
ptor.driver.executeScript("$.fx.off = true;");
//ptor.sleep(1000);
var elements = element(by.model("product.fields.count"));
expect(elements.getAttribute('value')).toEqual('753');
});

// This is here because testing the first product listing might not fail in the
// case of the trailing slash bug and other issues which cause ALL query data to
// be returned.
it("should display the product listing properly (4/4)", function() {
ptor.get("/app/index.html#/products/product-d");
ptor.driver.executeScript("$.fx.off = true;");
//ptor.sleep(1000);
var elements = element(by.model("product.fields.count"));
expect(elements.getAttribute('value')).toEqual('1245');
});

});
