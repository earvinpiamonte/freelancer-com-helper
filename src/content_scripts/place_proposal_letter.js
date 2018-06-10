
chrome.storage.sync.get(
	{
		coverLetter: ''
	},
	function(items) {

		if ($('.descr').length > 0) {
			$('.descr').val(items.coverLetter).select();
		}else{
			console.log('A textarea field for project proposal is not visible. If you think it is visible and pasting of cover letter did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.');
		}

		if ($('#projectHeader').length> 0) {
			$('html, body').animate(
				{
					scrollTop: $('#projectHeader').offset().top
				},
				100
			);
		}else{
			console.log('Title of the project is not visible. If you think it is visible and auto scrolling to the project title did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com. The page should auto scroll to the title of the project after clicking the button to paste the cover letter.');
		}
	}
);