analytics=[];
window.analytics = analytics;
var localAnalytics = [];
// Define a method that will asynchronously load analytics.js from our CDN.
localAnalytics.load = function(apiKey) {
	// Create an async script element for analytics.js.
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;
	script.src = ('https:' === document.location.protocol ? 'https://' : 'http://') +
	'd2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/' + apiKey + '/analytics.min.js';

	// Find the first script element on the page and insert our script next to it.
	var firstScript = document.getElementsByTagName('script')[0];
	firstScript.parentNode.insertBefore(script, firstScript);

	// Define a factory that generates wrapper methods to push arrays of
	// arguments onto our `analytics` queue, where the first element of the arrays
	// is always the name of the analytics.js method itself (eg. `track`).
	var methodFactory = function (type) {
		return function () {
			localAnalytics.push([type].concat(Array.prototype.slice.call(arguments, 0)));
		};
	};

	// Loop through analytics.js' methods and generate a wrapper method for each.
	var methods = ['identify', 'track', 'trackLink', 'trackForm', 'trackClick',
	'trackSubmit', 'pageview', 'ab', 'alias', 'ready', 'page'];
	for (var i = 0; i < methods.length; i++) {
		localAnalytics[methods[i]] = methodFactory(methods[i]);
	}
	analytics=localAnalytics;
};
analytics=localAnalytics;
window.analytics = analytics;
