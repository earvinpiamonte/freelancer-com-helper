
chrome.storage.sync.get(
	{
		coverLetter: ''
	},
	function(items) {

		$('#proposalDescription').val(items.coverLetter).select();

		$('html, body').animate(
			{
				scrollTop: $('#proposalDescription').offset().top
			},
			300
		);
	}
);