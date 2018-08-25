$(function () {

	restore_settings();

	var manifest = chrome.runtime.getManifest();

	$('.manifest-author').html(manifest.author);

	$('.link-create-tab').on('click', function(){
		chrome.tabs.create({url: $(this).attr('href')});
     	return false;
	});

	$('[data-toggle="tooltip"]').tooltip();

	// auto resize .textarea-auto-expand
	autosize($('.textarea-auto-expand'));

	$('#btn-close-settings').on('click', function (e) {
		e.preventDefault();
		window.close();
	});

	var cover_letter_max_length = 1500;
	var experiences_max_length = 200;
	var additional_information_max_length = 1000;

	$('#cover_letter').keyup(function() {
		var chars_current_length = $(this).val().length;
		var chars_left_length = cover_letter_max_length - chars_current_length;

		if (chars_left_length < 0) {
			$('#cover_letter_chars_left').addClass('text-danger');
		}else{
			$('#cover_letter_chars_left').removeClass('text-danger');
		}

		$('#cover_letter_chars_left').text(chars_left_length);
	});

	$('#experiences').keyup(function() {
		var chars_current_length = $(this).val().length;
		var chars_left_length = experiences_max_length - chars_current_length;

		if (chars_left_length < 0) {
			$('#experiences_chars_left').addClass('text-danger');
		}else{
			$('#experiences_chars_left').removeClass('text-danger');
		}

		$('#experiences_chars_left').text(chars_left_length);
	});

	$('#additionalInformation').keyup(function() {
		var chars_current_length = $(this).val().length;
		var chars_left_length = additional_information_max_length - chars_current_length;

		if (chars_left_length < 0) {
			$('#additional_information_chars_left').addClass('text-danger');
		}else{
			$('#additional_information_chars_left').removeClass('text-danger');
		}

		$('#additional_information_chars_left').text(chars_left_length);
	});

	$('#settings-form').on('submit', function(e){
		e.preventDefault();

		var $cover_letter = $('#cover_letter');
		var $experiences = $('#experiences');
		var $additionalInformation = $('#additionalInformation');
		var $convert_url_to_links = $('#convert_url_to_links');
		var $remove_banners = $('#remove_banners');
		var $auto_scroll_to_bid = $('#auto_scroll_to_bid');

		var html_class = 'alert alert-danger';
		var html = '<i class="far fa-times-circle"></i> Your settings was not saved. Please try again.';

		var error_text = '';

		if ($cover_letter.val().length > cover_letter_max_length) {
			error_text = 'Cover letter should only have a maximum length of '+cover_letter_max_length+' characters.';
		}

		if ($experiences.val().length > experiences_max_length) {
			error_text += ' Experiences should only have a maximum length of '+experiences_max_length+' characters.';
		}

		if ($additionalInformation.val().length > additional_information_max_length) {
			error_text += ' Additional information should only have a maximum length of '+additional_information_max_length+' characters.';
		}

		if (error_text != '') {
			html_class = 'alert alert-danger';
			html = '<i class="far fa-times-circle"></i> '+error_text;

			show_form_alert(html_class, html);

		}else{
			chrome.storage.sync.set(
				{
					coverLetter: $cover_letter.val(),
					experiences: $experiences.val(),
					additionalInformation: $additionalInformation.val(),
					convertURLtoLinks : $convert_url_to_links.prop('checked'),
					removeBanners : $remove_banners.prop('checked'),
					autoScrollToBid : $auto_scroll_to_bid.prop('checked')
				},
				function() {

					html_class = 'alert alert-success';
					html = '<i class="far fa-check-circle"></i> Your settings has beend saved!';

					show_form_alert(html_class, html);

				}
			);
		}

		$('html, body').animate({ scrollTop: 0 }, 0);

	});


});

function restore_settings() {

	var $cover_letter = $('#cover_letter');
	var $experiences = $('#experiences');
	var $additionalInformation = $('#additionalInformation');
	var $convert_url_to_links = $('#convert_url_to_links');
	var $remove_banners = $('#remove_banners');
	var $auto_scroll_to_bid = $('#auto_scroll_to_bid');

	chrome.storage.sync.get(
		{
			coverLetter: '',
			experiences: '',
			additionalInformation: '',
			convertURLtoLinks : false,
			removeBanners: false,
			autoScrollToBid: false
		},
		function(items) {
			$cover_letter.val(items.coverLetter);
			$experiences.val(items.experiences);
			$additionalInformation.val(items.additionalInformation);
			$convert_url_to_links.prop('checked', items.convertURLtoLinks);
			$remove_banners.prop('checked', items.removeBanners);
			$auto_scroll_to_bid.prop('checked', items.autoScrollToBid);

			var cover_letter_max_length = 1500;
			var experiences_max_length = 200;
			var additional_information_max_length = 1000;

			$('#cover_letter_chars_left').text(cover_letter_max_length - items.coverLetter.length);
			$('#experiences_chars_left').text(experiences_max_length - items.experiences.length);
			$('#additional_information_chars_left').text(additional_information_max_length - items.additionalInformation.length);
		}
	);
}

function show_form_alert(html_class, html) {
	$('#settings-form-alert').removeClass().addClass(html_class).html(html).show(0).delay(8000).hide(0);
}