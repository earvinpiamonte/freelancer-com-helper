
chrome.storage.sync.get(
	{
		additionalInformation: ''
	},
	function(items) {

		var $textarea = jQuery('form[name="additionalInformation"]').find('textarea');

		if ($textarea.length > 0) {
			$textarea.val(items.additionalInformation).select();
		}else{
			console.log('A textarea field for additionalInformation is not visible. If you think it is visible and pasting of additionalInformation did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.');
		}

	}
);