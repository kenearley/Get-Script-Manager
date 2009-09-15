SENTIENTBIT = {};

SENTIENTBIT.getScriptManager = function() {

// private variables

	var masterList = [];
	var bundleArray = [];
	
// private methods
	
	/**
	 *	Create a file bundle.
	 *	While creating bundle, add each file to masterList.
	 */
	function bundleFiles(fileNames, callback) {
		var array = [];
		for (name in fileNames) {
			var newFile = new SENTIENTBIT.File(fileNames[name]);	// Creating a new File object
			var newFile  = addFileToMasterList(newFile); // newFile is replaced with file object in masterList if it's in the masterList.
			array.push(newFile);
		}
		var bundle = new SENTIENTBIT.FileBundle(array, callback);
		// !To Do: Subscribe onto the bundle a listener(statusUpdated) for the file that is being added.
		bundleArray.push(bundle);
	};
	
	/**
	 *	Add file to master list if it's not already on the list.
	 *	If the file is already in the master list, it returns the masterList file object instead of the newly created one.
	 *	If the file doesn't exist, it returns the newFile.
	 */
	function addFileToMasterList(newFile) {
		for (file in masterList) {
			if (newFile.getName() == masterList[file].getName()) {
				return masterList[file]; // returning file object from master list
			}
		}
		masterList.push(newFile);
		// The callback is the file's updateStatus method, which will fire a statusUpdated event.
		// Each bundle will then check to see if the file statuses are all 'success' and then will fire off their callback.
		YAHOO.util.Get.script(newFile.getName(),
							 	 { onSuccess: function() { newFile.updateStatus("success"); } }
						     );
						                      		            
		return newFile; // should only get here if file wasn't already in master list.
	};
	
// privileged methods
	
	this.requestFiles = function(fileNames, callback) {
		var bundle = bundleFiles(fileNames, callback);
	};
	
	this.getMasterList = function() { return masterList };
	this.getBundleArray = function() { return bundleArray };
};