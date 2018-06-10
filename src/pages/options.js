$(function () {

	restore_settings();

	var manifest = chrome.runtime.getManifest();

	$('.manifest-version').html(manifest.version);
	$('.manifest-author').html(manifest.author);

	$('[data-toggle="tooltip"]').tooltip();

	$('#btn-close-settings').on('click', function (e) {
		e.preventDefault();
		window.close();
	});

	var cover_letter_max_length = 1500;

	$('textarea').keyup(function() {
		var chars_current_length = $(this).val().length;
		var chars_left_length = cover_letter_max_length - chars_current_length;

		if (chars_left_length < 0) {
			$('#cover_letter_chars_left').addClass('text-danger');
		}else{
			$('#cover_letter_chars_left').removeClass('text-danger');
		}

		$('#cover_letter_chars_left').text(chars_left_length);
	});

	$('#settings-form').on('submit', function(e){
		e.preventDefault();

		var $cover_letter = $('#cover_letter');
		var $convert_url_to_links = $('#convert_url_to_links');
		var $remove_banners = $('#remove_banners');

		var html_class = 'alert alert-danger';
		var html = '<i class="far fa-times-circle"></i> Your settings was not saved. Please try again.';

		if ($cover_letter.val().length > cover_letter_max_length) {
			html_class = 'alert alert-danger';
			html = '<i class="far fa-times-circle"></i> Cover letter should only have a maximum length of '+cover_letter_max_length+' characters.';

			show_form_alert(html_class, html);

		}else{
			chrome.storage.sync.set(
				{
					coverLetter: $cover_letter.val(),
					convertURLtoLinks : $convert_url_to_links.prop('checked'),
					removeBanners : $remove_banners.prop('checked')
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
	var $convert_url_to_links = $('#convert_url_to_links');
	var $remove_banners = $('#remove_banners');

	chrome.storage.sync.get(
		{
			coverLetter: '',
			convertURLtoLinks : false,
			removeBanners: false
		},
		function(items) {
			$cover_letter.val(items.coverLetter);
			$convert_url_to_links.prop('checked', items.convertURLtoLinks);
			$remove_banners.prop('checked', items.removeBanners);

			var cover_letter_max_length = 1500;

			var	chars_length_left = cover_letter_max_length - items.coverLetter.length;
			$('#cover_letter_chars_left').text(chars_length_left);
		}
	);
}

function show_form_alert(html_class, html) {
	$('#settings-form-alert').removeClass().addClass(html_class).html(html).show(0).delay(5000).hide(0);
}