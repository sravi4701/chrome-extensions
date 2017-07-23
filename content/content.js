chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	
	if(request.message === "icon_clicked"){
		var video_id = window.location.href.split("/");
		video_id = video_id[video_id.length - 1];
		var getcdn_url = "http://getcdn.hotstar.com/AVS/besc?action=GetCDN&asJson=Y&channel=TABLET&id=" + video_id + 
		"&type=VOD";

		var isnum = /^\d+$/.test(video_id);

		if(isnum){
			$.ajax({
				url : getcdn_url,
				success : function(result){
					// console.log(typeof(result));
					var responseObj = JSON.parse(result);
					var src = responseObj.resultObj.src;
					// console.log(src);
					// pass message to background
					chrome.runtime.sendMessage({"message" : "open_hls", "src" : src});
				}
			})
		}
	}
});