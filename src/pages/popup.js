$(function () {

	var manifest = chrome.runtime.getManifest();

	$('.manifest-author').html(manifest.author);

	$('.link-create-tab').on('click', function(){
		chrome.tabs.create({url: $(this).attr('href')});
     	return false;
	});

	chrome.storage.sync.get(
		{
			experiences: '',
			additionalInformation: '',
			coverLetter: ''
		},
		function(items) {
			var experiences = items.experiences;
			var additionalInformation = items.additionalInformation;
			var coverLetter = items.coverLetter;

			var error_text = '';

			// temporarily removed experiences and additional information

			/*if (experiences == '') {
				error_text = 'Set your <strong>experiences</strong> on Settings.';
				$('#btn-place-experiences').prop('disabled', true);
			}

			if (additionalInformation == '') {
				error_text += ' Set your <strong>additional information</strong> on Settings.';
				$('#btn-place-additionalInformation').prop('disabled', true);
			}*/

			if (coverLetter == '') {
				error_text += ' Set your <strong>cover letter</strong> on Settings.';
				$('#btn-place-proposal-letter').prop('disabled', true);
			}

			if (error_text != '') {
				var html_class = 'alert alert-warning';
				var html = '<i class="fas fa-exclamation-triangle"></i> '+error_text;

				show_form_alert(html_class, html);
			}
		}
	);


	$('#btn-place-experiences').on('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				{
		          file: 'dist/content_scripts/place_experiences.js'
		        }
			);
		});

	});

	$('#btn-place-additionalInformation').on('click', function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(
				{
		          file: 'dist/content_scripts/place_additional_information.js'
		        }
			);
		});

	});

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