(function($) {
	window.fnames = new Array();
	window.ftypes = new Array();
	fnames[0]='EMAIL';
	ftypes[0]='email';
	fnames[1]='FNAME';
	ftypes[1]='text';
	fnames[2]='LNAME';
	ftypes[2]='text';
	$( document ).ready(function	() {	 
		$("#mc-embedded-subscribe-form").submit(function(e) {
			e.preventDefault(); 
			var url = $("form#mc-embedded-subscribe-form").attr("action");
			url = url.replace("/post?u=", "/post-json?u=");
			url += "&c=?";
			$.ajax({
				url : url,
				type : "POST",
				data : $("#mc-embedded-subscribe-form").serialize(),
				before : function () {

				},
				success : function (data) {
/*					if(data == "si_enviado"){														 
						$UIkit.notify({
							message	: 'Bazinga!',
							status	: 'info',
							timeout	: 5000,
							pos	: 'top-center'
						}); 
					} else if(data == "no_enviado") {
						$UIkit.notify({
							message : 'Bazinga!',
							status	: 'danger',
							timeout : 5000,
							pos		 : 'top-center'
						});
*/					}
				error : function () {
				}
			});
		});			
	});
}(jQuery));
