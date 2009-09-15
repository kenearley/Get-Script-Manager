IBSYS.File = function(fileName, newStatus) {
	
// private variables
	
	var name,	// string that is the file name
		status, // string that is the file loading status
		self;	// variable to fix scoping of 'this'
		
// private methods

	function init() {
		name = fileName;
		status = newStatus || "waiting";
		self = this;
	};
	
	function announceStatusUpdate() {
		console.log("Status for " + name + " has been changed:" + status + "");
	};
		
// privileged methods
		
	this.updateStatus = function(newStatus) { status = newStatus; announceStatusUpdate(); this.statusUpdatedEvent.fire(); };
	this.getName = function() { return name; };
	this.getStatus = function() { return status; };
	this.statusUpdatedEvent = new YAHOO.util.CustomEvent("statusUpdatedEvent");
	
	
// make it go
	init();
};