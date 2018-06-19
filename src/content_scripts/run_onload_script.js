$(function () {

	chrome.storage.sync.get(
		{
			convertURLtoLinks: false,
			removeBanners: false,
			autoScrollToBid: false
		},
		function(items) {

			if (items.convertURLtoLinks == true) {

				if ($('.project-brief').length > 0) {

					var content = $('.project-brief').html();

					var linked_content = Autolinker.link(content, { newWindow : true, stripPrefix : false });

					$('.project-brief').html(linked_content);
				}else{
					// console.log('Project description is not visible. If you think it is visible and converting the URLs to links did not work, please report this as a bug to the developer at earvin.piamonte@gmail.com.');
				}

			}

			if (items.removeBanners == true) {

				var interval_counter = 1;

				var interval = setInterval(function(){
					/*console.log('Remove banner init.');
					$('#give-get-banner, #upsell-banners-anchor').remove();

					console.log(interval_counter);

					if ((interval_counter % 3) == 0) {
						if($('#give-get-banner, #upsell-banners-anchor').length < 1){
							clearInterval(interval);
							console.log('No banner seen. Interval cleared.');
						}
					}

					interval_counter ++;*/

					$('#give-get-banner, #upsell-banners-anchor, #corporate-upsell-banner, #skills-lab-banner').remove();

				}, 100);

			}

			if (items.autoScrollToBid == true) {
				// auto scroll to bid after project tagging
				var check_submit_project_tags_interval = setInterval(function(){

					if (jQuery('#submit-project-tags, #cancel-project-tagging').length > 0) {

						console.log('Submit project tags button has been found! Clearing interval...');
						clearInterval(check_submit_project_tags_interval);

						jQuery('#submit-project-tags, #cancel-project-tagging').on('click', function(){
							console.log('clicked #submit-project-tags, #cancel-project-tagging');

							var check_bid_owner_interval = setInterval(function(){

								if (jQuery('.bid.owner').length > 0) {
									console.log('done auto scroll');
									clearInterval(check_bid_owner_interval);

									jQuery('html, body').animate({ scrollTop: jQuery('.bid.owner').offset().top }, 100);
								}
							}, 1000);

						});
					}

				}, 1000);

				// auto scroll to bid after updating bid from fixed price project
				$(document).on('click', '[data-function="update"]', function(){
					console.log('clicked update');
					jQuery('html, body').animate({ scrollTop: jQuery('.bid.owner').offset().top }, 100);
					console.log('done auto scroll');
				});

				// auto scroll to bid after updating bid from hourly price project
				$(document).on('click', '#place-bid', function(){
					console.log('clicked #place-bid');

					var $this = $(this);
					var fn = $this.attr('data-function');

					if (typeof fn !== typeof undefined && fn !== false) {
						console.log('clicked #place-bid but has data-function');
						return;
					}else{
						console.log('here we go!');
						jQuery('html, body').animate({ scrollTop: jQuery('.bid.owner').offset().top }, 100);
						console.log('done auto scroll');
					}
				});

				// auto scroll to bid after cancelling update on hourly price project
				$(document).on('click', '#cancel-bid', function(){
					console.log('clicked #cancel-bid');
					jQuery('html, body').animate({ scrollTop: jQuery('.bid.owner').offset().top }, 100);
						console.log('done auto scroll');
				});
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