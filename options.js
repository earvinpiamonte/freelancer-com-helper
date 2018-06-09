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

	$('#settings-form').on('submit', function(e){
		e.preventDefault();

		var $cover_letter = $('#cover_letter');
		var $scroll_to_top_animation_ms = $('#scroll_to_top_animation_ms');
		var $convert_url_to_links = $('#convert_url_to_links');
		var $remove_banners = $('#remove_banners');

		var html_class = 'alert alert-danger';
		var html = '<i class="far fa-times-circle"></i> Your settings was not saved. Please try again.';

		chrome.storage.sync.set(
			{
				coverLetter: $cover_letter.val(),
				scrollTopAnimationDuration: parseInt($scroll_to_top_animation_ms.val()),
				convertURLtoLinks : $convert_url_to_links.prop('checked'),
				removeBanners : $remove_banners.prop('checked')
			},
			function() {

				html_class = 'alert alert-success';
				html = '<i class="far fa-check-circle"></i> Your settings has beend saved!';

				show_form_alert(html_class, html);

				$('html, body').animate({ scrollTop: 0 }, 0);
			}
		);

	});


});
function restore_settings() {

	var $cover_letter = $('#cover_letter');
	var $scroll_to_top_animation_ms = $('#scroll_to_top_animation_ms');
	var $convert_url_to_links = $('#convert_url_to_links');
	var $remove_banners = $('#remove_banners');

	chrome.storage.sync.get(
		{
			coverLetter: '',
			scrollTopAnimationDuration: 0,
			convertURLtoLinks : false,
			removeBanners: false
		},
		function(items) {
			$cover_letter.val(items.coverLetter);
			$scroll_to_top_animation_ms.val(items.scrollTopAnimationDuration);
			$convert_url_to_links.prop('checked', items.convertURLtoLinks);
			$remove_banners.prop('checked', items.removeBanners);
		}
	);
}


function show_form_alert(html_class, html) {
	$('#settings-form-alert').addClass(html_class).html(html).show(0).delay(5000).hide(0);
}