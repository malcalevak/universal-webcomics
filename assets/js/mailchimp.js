(function ($) {
	$(document).ready(function () {
		$("#mc-embedded-subscribe-form").submit(function (e) {
			e.preventDefault();
			var url = $("form#mc-embedded-subscribe-form").attr("action");
			url = url.replace("/post?u=", "/post-json?u=");
			url += "&c=?";
			$.ajax({
				url: url,
				type: "GET",
				crossDomain: true,
				dataType: 'json', 
				contentType: "application/json; charset=utf-8",
				data: $("#mc-embedded-subscribe-form").serialize(),
				before: function () {},
				success: function (data) {
					console.log(data.result);
					if(data.result === 'success') {
						$("#mailchimp-response-modal").removeClass('mc-error');
						$("#mailchimp-response-modal .uk-modal-title").text('Thank You!');
						$("#mailchimp-response-modal .uk-modal-message").text(data.msg);
						UIkit.modal("#mailchimp-response-modal",{stack: false}).show();
					} else {
						var msg = data.msg.split(' - ',2);
						if (msg[1]==undefined) {
							msg = msg[0];
						} else {
							msg = msg[1];
						}
						$("#mailchimp-response-modal").addClass('mc-error');
						$("#mailchimp-response-modal .uk-modal-title").text('Error');
						$("#mailchimp-response-modal .uk-modal-message").text(data.msg);
						UIkit.modal("#mailchimp-response-modal",{stack: true}).show();
					}
				},
				error: function (data) {
					$("#mailchimp-response-modal .uk-modal-title").text('Error');
						$("#mailchimp-response-modal .uk-modal-message").text("There seems to have been an unknown error. Apologies, please try again later.");
						UIkit.modal("#mailchimp-response-modal",{stack: true}).show();
				}
			});
		});
	});
}(jQuery));
