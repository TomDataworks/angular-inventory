var util = require('util');
 
describe("login navigation bar", function () {
var ptor;
beforeEach(function() {
// get protractor instance
ptor = protractor.getInstance();
});

it("should display the login username and password when the user is not logged in", function() {
ptor.get("/app/index.html#/products");
ptor.driver.executeScript("$.fx.off = true;");
var loginform;
loginform = ptor.findElement(protractor.By.id("loginform"));
expect(loginform.isDisplayed()).toEqual(true);
});

it("should allow the user to login", function() {
//ptor.get("/app/index.html#/products");
//ptor.driver.executeScript("$.fx.off = true;");
element(by.model("username")).sendKeys('arven');
element(by.model("password")).sendKeys('testing');
element(by.buttonText("Sign in")).click();
ptor.sleep(1000);
});

it("should display the logout form when the user is logged in", function() {
//ptor.get("/app/index.html#/products");
//ptor.driver.executeScript("$.fx.off = true;");
var logoutform;
logoutform = element(by.id("logoutform"));
expect(logoutform.isDisplayed()).toEqual(true);
});

it("should allow the user to logout", function() {
//ptor.get("/app/index.html#/products");
//ptor.driver.executeScript("$.fx.off = true;");
element(by.partialButtonText("logout")).click();
//ptor.sleep(1000);
});

it("should display the login form when the user is logged out again", function() {
//ptor.get("/app/index.html#/products");
//ptor.driver.executeScript("$.fx.off = true;");
var loginform;
loginform = ptor.findElement(protractor.By.id("loginform"));
expect(loginform.isDisplayed()).toEqual(true);
});

});
