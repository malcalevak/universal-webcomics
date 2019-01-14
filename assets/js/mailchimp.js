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
					UIkit.modal("#newsletter").hide();
					UIkit.modal.dialog(data.msg);
				},
				error: function (data) {
					UIkit.modal.alert(data.msg);
				}
			});
		});
	});
}(jQuery));
