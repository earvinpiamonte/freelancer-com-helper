$(function () {

	chrome.storage.sync.get(
		{
			convertURLtoLinks: false,
			removeBanners: false
		},
		function(items) {

			if (items.convertURLtoLinks == true) {

				var content = $('.project-brief').html();

				var linked_content = Autolinker.link(content, { newWindow : true, stripPrefix : false });

				$('.project-brief').html(linked_content);

			}

			if (items.removeBanners == true) {
				$('#give-get-banner, #upsell-banners-anchor').remove();

				var interval = setInterval(function(){
					if($('#give-get-banner, #upsell-banners-anchor').length > 0){
						console.log('counting');
						$('#give-get-banner, #upsell-banners-anchor').remove();
					}else{
						clearInterval(interval);
					}
				}, 3000);

			}
		}
	);


	$('.search-result-wrapper, #bid-list-container').append('<p style="text-align:center;padding:1rem 0rem;"><button type="button" class="btn btn-default freelancer-com-helper-btn-scroll-to-top">Scroll to top</button></p>');

	$('.freelancer-com-helper-btn-scroll-to-top').on('click', function(){
		chrome.storage.sync.get(
			{
				scrollTopAnimationDuration: 300
			},
			function(items) {
				var duration = items.scrollTopAnimationDuration;

				$('html, body').animate({ scrollTop: 0 }, duration);
			}
		);
	});

});