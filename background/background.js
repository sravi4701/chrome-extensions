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

chrome.runtime.onMessage.addListener(function(request, response, sendResponse){
	console.log(request.src);
	if(request.message === "open_hls"){
		var src = request.src;
		var hls_url = "https://www.hlsplayer.net/";
		if(src != ""){
			chrome.tabs.create({url : hls_url}, function(tab){
				chrome.tabs.executeScript(tab.id, {code : "document.getElementById(\"player-src\").value = '" + src + "';document.getElementById(\"player-start\").click();"});
			});
		}
	}
});