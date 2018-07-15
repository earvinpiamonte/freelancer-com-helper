
chrome.storage.sync.get(
	{
		experiences: ''
	},
	function(items) {

		var $textarea = jQuery('form[name="experience"]').find('textarea');

		if ($textarea.length > 0) {
			$textarea.val(items.experiences).select();
		}else{
			console.log('A textarea field for experiences is not visible. If you think it is visible and pasting of experiences did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.');
		}

	}
);