// An example configuration file.
exports.config = {
// The address of a running selenium server.
seleniumAddress: 'http://localhost:4444/wd/hub',
 
// Capabilities to be passed to the webdriver instance.
capabilities: {
'browserName': 'chrome'
},
// URL of the app you want to test.
baseUrl: 'http://localhost:8000/',
 
// Spec patterns are relative to the location of the spec file. They may
// include glob patterns.
specs: [
'login_navigation_spec.js',
'lookup_product_spec.js'
],
 
// Options to be passed to Jasmine-node.
jasmineNodeOpts: {
showColors: true, // Use colors in the command line report.
isVerbose: true, // List all tests in the console
includeStackTrace: true
}
};
