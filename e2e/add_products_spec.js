var util = require('util');
 
describe("add product interface", function () {
var ptor;
beforeEach(function() {
// get protractor instance
ptor = protractor.getInstance();
});

it("should not allow the addition of an item", function() {
ptor.get("/client/app/index.html#/product/add");
ptor.driver.executeScript("$.fx.off = true;");
element(by.model("product.fields.itemId")).clear().sendKeys('product-a');
element(by.model("product.fields.count")).clear().sendKeys('5');
element(by.model("product.fields.name")).clear().sendKeys('Product A');
element(by.model("product.fields.short")).clear().sendKeys('Enter a short description');
element(by.model("product.fields.desc")).clear().sendKeys('Enter a longer description');
element(by.id("savebutton")).click();
});

// Test for initial conditions, we were not logged in so nothing should have been added
it("should display the product listing with no elements, as we were not logged in", function() {
ptor.get("/client/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(0);
});

// Make sure we are logged in
it("needs to be logged in", function() {
//ptor.get("/client/app/index.html#/products");
//ptor.driver.executeScript("$.fx.off = true;");
// We need to clean up existing stuff in these fields
element(by.model("username")).clear().sendKeys('arven');
element(by.model("password")).clear().sendKeys('testing');
element(by.buttonText("Sign in")).click();
ptor.sleep(1000);
});

// Test for initial conditions
it("should display the product listing with no elements", function() {
ptor.get("/client/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(0);
});

it("should allow the addition of an item (1/4)", function() {
ptor.get("/client/app/index.html#/product/add");
ptor.driver.executeScript("$.fx.off = true;");
element(by.model("product.fields.itemId")).clear().sendKeys('product-a');
element(by.model("product.fields.count")).clear().sendKeys('5');
element(by.model("product.fields.name")).clear().sendKeys('Product A');
element(by.model("product.fields.short")).clear().sendKeys('Enter a short description');
element(by.model("product.fields.desc")).clear().sendKeys('Enter a longer description');
element(by.id("savebutton")).click();
});

// Test for item creation
it("should display the product listing with 1 element", function() {
ptor.get("/client/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(1);
});

it("should allow the addition of an item (2/4)", function() {
ptor.get("/client/app/index.html#/product/add");
ptor.driver.executeScript("$.fx.off = true;");
element(by.model("product.fields.itemId")).clear().sendKeys('product-b');
element(by.model("product.fields.count")).clear().sendKeys('280');
element(by.model("product.fields.name")).clear().sendKeys('Product B');
element(by.model("product.fields.short")).clear().sendKeys('Enter a short description');
element(by.model("product.fields.desc")).clear().sendKeys('Enter a longer description');
element(by.id("savebutton")).click();
});

// Test for item creation
it("should display the product listing with 2 elements", function() {
ptor.get("/client/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(2);
});

it("should allow the addition of an item (3/4)", function() {
ptor.get("/client/app/index.html#/product/add");
ptor.driver.executeScript("$.fx.off = true;");
element(by.model("product.fields.itemId")).clear().sendKeys('product-c');
element(by.model("product.fields.count")).clear().sendKeys('753');
element(by.model("product.fields.name")).clear().sendKeys('Product C');
element(by.model("product.fields.short")).clear().sendKeys('Enter a short description');
element(by.model("product.fields.desc")).clear().sendKeys('Enter a longer description');
element(by.id("savebutton")).click();
});

// Test for item creation
it("should display the product listing with 3 elements", function() {
ptor.get("/client/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(3);
});

it("should allow the addition of an item (4/4)", function() {
ptor.get("/client/app/index.html#/product/add");
ptor.driver.executeScript("$.fx.off = true;");
element(by.model("product.fields.itemId")).clear().sendKeys('product-d');
element(by.model("product.fields.count")).clear().sendKeys('1245');
element(by.model("product.fields.name")).clear().sendKeys('Product D');
element(by.model("product.fields.short")).clear().sendKeys('Enter a short description');
element(by.model("product.fields.desc")).clear().sendKeys('Enter a longer description');
element(by.id("savebutton")).click();
});

// Test for item creation
it("should display the product listing with 4 elements", function() {
ptor.get("/client/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var elements = element.all(by.repeater("product in products | filter:query"));
expect(elements.count()).toEqual(4);
});

});
