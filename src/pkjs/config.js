var config = this.config = {
  url: 'http://realadamsinger.github.io/james_bond_007-config_page/'
};

Pebble.addEventListener("ready", function(e) {
  loadLocalData();
  returnConfigToPebble();
});

Pebble.addEventListener("webviewclosed", function(e) {
    if (e.response) {
      var config = JSON.parse(e.response);
      saveLocalData(config);
      returnConfigToPebble();
    }
  });

function saveLocalData(config) {
  console.log("saving data " + JSON.stringify(config));  
  localStorage.setItem("KEY_ISCELS", parseInt(config.isCels));  
  localStorage.setItem("KEY_ISAUTHENTIC", parseInt(config.isAuthentic));   
  loadLocalData();
}

function loadLocalData() {  
	config.isCels = parseInt(localStorage.getItem("KEY_ISCELS"));
	config.isAuthentic = parseInt(localStorage.getItem("KEY_ISAUTHENTIC"));	
	
	if(isNaN(config.isCels)) {
		config.isCels = 1;
	}
	if(isNaN(config.isAuthentic)) {
		config.isAuthentic = 1;
	}

  console.log("loading data " + JSON.stringify(config));
}

function returnConfigToPebble() {  
    var dictionary = {
      "KEY_ISCELS": parseInt(config.isCels), 
      "KEY_ISAUTHENTIC": parseInt(config.isAuthentic),       
    };
  
    console.log("Configuration window returned: " + JSON.stringify(dictionary));  
    Pebble.sendAppMessage(dictionary, function(e){
            console.log('config sent to Pebble successfully!');
          }, function(e) {          
            console.log('Error sending config to Pebble!');          
          });    
}

Pebble.addEventListener('showConfiguration', function(e) {
  // Show config page
  Pebble.openURL(config.url);
});

