
chrome.storage.sync.get(
	{
		coverLetter: ''
	},
	function(items) {

		$('.descr').val(items.coverLetter).select();

		$('html, body').animate(
			{
				scrollTop: $('#projectHeader').offset().top
			},
			100
		);
	}
);