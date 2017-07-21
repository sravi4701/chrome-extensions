chrome.browserAction.onClicked.addListener(function(tab){
	// getting the tab info
	chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
		//get active tab
		var currentTab = tabs[0];
		console.log(currentTab.id);

		//send message to the content script

		chrome.tabs.sendMessage(currentTab.id, {"message" : "icon_clicked"});
	});
});