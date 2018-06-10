$(function () {

	var manifest = chrome.runtime.getManifest();

	$('.manifest-version').html(manifest.version);
	$('.manifest-author').html(manifest.author);

	chrome.storage.sync.get(
		{
			coverLetter: ''
		},
		function(items) {
			var cover_letter = items.coverLetter;

			if (cover_letter == '') {
				var html_class = 'alert alert-warning';
				var html = '<i class="fas fa-exclamation-triangle"></i> Set a Cover letter on Settings.';
				$('#btn-place-proposal-letter').prop('disabled', true);

				show_form_alert(html_class, html);
			}
		}
	);


	$('#btn-place-proposal-letter').on('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				{
		          file: 'dist/content_scripts/place_proposal_letter.js'
		        }
			);
		});

	});

	$('#btn-scroll-top').on('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				{
		          file: 'dist/content_scripts/scroll_to_top.js'
		        }
			);
		});
	});

	$('#btn-go-to-settings').on('click', function(){
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});

});

function show_form_alert(html_class, html) {
	$('#popup-alert').addClass(html_class).html(html).show();
}