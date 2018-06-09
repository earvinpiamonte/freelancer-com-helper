
chrome.storage.sync.get(
	{
		scrollTopAnimationDuration: 0
	},
	function(items) {
		var duration = items.scrollTopAnimationDuration;

		$('html, body').animate({ scrollTop: 0 }, duration);
	}
);