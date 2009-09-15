SENTIENTBIT.FileBundle = function(files, callback) {
	
// private variables

	var bundle = [],
		bundleCallback,
		bundleStatus = "waiting";
	
// private methods
		
	function init() {
		bundle = files;
		bundleCallback = callback;
		updateBundleStatus(); // check right away to see if the files are already loaded.
		
		for (file in bundle) {
			bundle[file].statusUpdatedEvent.subscribe(updateBundleStatus);
		}
	};
	
	/**
	 *	Each time a statusUpdatedEvent is fired from a file within this bundle,
	 *	the bundle will check though each file to see if the are all 'success'
	 *	If so, then fire the callback.
	 */
	function updateBundleStatus() {
		var successCount = 0;
		for (var i=0; i<bundle.length; i++) {
			if (bundle[i].getStatus() == "success") {
				successCount++;
			} else if (bundle[i].getStatus() == "fail") {
				alert("file failed!");
			}
		}
		if (successCount == bundle.length) {
			bundleStatus = "success";
			bundleCallback();
		}
	};
	
// privileged methods
		
	this.getBundle = function() { return bundle; };
	this.getStatus = function() { return bundleStatus; };
	
// make it go
	init();
};