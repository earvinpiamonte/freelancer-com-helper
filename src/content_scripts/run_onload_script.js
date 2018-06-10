$(function () {

	chrome.storage.sync.get(
		{
			convertURLtoLinks: false,
			removeBanners: false
		},
		function(items) {

			if (items.convertURLtoLinks == true) {

				if ($('.project-brief').length > 0) {

					var content = $('.project-brief').html();

					var linked_content = Autolinker.link(content, { newWindow : true, stripPrefix : false });

					$('.project-brief').html(linked_content);
				}else{
					console.log('Project description is not visible. If you think it is visible and converting the URLs to links did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.');
				}

			}

			if (items.removeBanners == true) {

				if($('#give-get-banner, #upsell-banners-anchor').length > 0){
					$('#give-get-banner, #upsell-banners-anchor').remove();

					var interval = setInterval(function(){
						if($('#give-get-banner, #upsell-banners-anchor').length > 0){
							console.log('counting');
							$('#give-get-banner, #upsell-banners-anchor').remove();
						}else{
							clearInterval(interval);
						}
					}, 3000);

				}else{
					console.log('No banner is visible. If you think it is visible and the option removing it did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.');
				}

			}
		}
	);

	if ($('.search-result-wrapper, #bid-list-container').length > 0) {

		$('.search-result-wrapper, #bid-list-container').append('<p style="text-align:center;padding:1rem 0rem;"><button type="button" class="btn btn-default freelancer-com-helper-btn-scroll-to-top">Scroll to top</button></p>');

	}else{
		console.log('Project feed page or project page is not visible. If you think it is visible and you did not see any Scroll to top button, please report this as a bug to the developer at earvin.piamonte@gmail.com. Scroll to top button appears in project feed and project page only.');
	}

	$('.freelancer-com-helper-btn-scroll-to-top').on('click', function(){
		$('html, body').animate({ scrollTop: 0 }, 100);
	});

});