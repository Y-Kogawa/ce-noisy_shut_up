var init = function(func){
	chrome.tabs.executeScript(null,
		{file: 'lib/console.js'},
		function(){
			func.call();
		}
	);
}

ctLinkCheck = function(){
	var func = function() {
		chrome.tabs.executeScript(null,
			{code: 'linkCheck()'}
		);
	}
	init(func);
}

chrome.contextMenus.create({
	title : "リンク先の生存チェック",
	type : "normal",
	contexts: ["all"],
	onclick : ctLinkCheck
});