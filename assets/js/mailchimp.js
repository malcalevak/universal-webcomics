var tabHandle,
	disabledHandle,
	hiddenHandle,
	tabFocus,
	preFocus = new Array(),
	contexts = new Array();
(function ($) {
	$(document).ready(function () {
		
		$(document).on('show.uk.modal', function(e) {
			var context =  e.target;
			contexts.push(context);

			// Remember activating element so we can return focus to it once we close the dialog
			preFocus.push(document.activeElement);

			// call our dialogHandler, relay context, and send true if we have multiple modals
			dialogHandler(context,$('.uk-modal.uk-open').length-1);
			
			// Find, then focus on first tabbable dialog element
			var tabFocus = ally.query.firstTabbable({
				context: context,
				defaultToContext: true,
			});
			tabFocus.focus();
        });

		$(document).on('hide.uk.modal', function(e) {
			var modalCount = preFocus.length-1;
			//if we've still got a modal open, figure out the context and call our handler, otherwise just undo
			if(modalCount) {
				//our context is never the last open modal, remember arrays are 0 based
				context = contexts.splice(modalCount-1,1);
				// call our dialogHandler, relay context, and send true if we still have a modal open
				dialogHandler(context,true);
			} else {
				dialogHandlerUndo();
			}
			// return focus to where it was before we opened the dialog
			preFocus.pop().focus();
        });
		
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
					if(data.result === 'success') {
						$("#mc-response-modal").removeClass('mc-error');
						$("#mc-response-modal .uk-modal-title").text('Thank You!');
						$("#mc-response-modal .uk-modal-message").text(data.msg);
						UIkit.modal("#mc-response-modal",{stack: false}).show();
					} else {
						var msg = data.msg.split(' - ',2);
						if (msg[1]==undefined) {
							msg = msg[0];
						} else {
							msg = msg[1];
						}
						$("#mc-response-modal").addClass('mc-error');
						$("#mc-response-modal .uk-modal-title").text('Error');
						$("#mc-response-modal .uk-modal-message").text(msg);
						UIkit.modal("#mc-response-modal",{stack: true}).show();
					}
				},
				error: function (data) {
					$("#mc-response-modal .uk-modal-title").text('Error');
					$("#mc-response-modal .uk-modal-message").text("There seems to have been an unknown error. Apologies, please try again later.");
					UIkit.modal("#mc-response-modal",{stack: true}).show();
				}
			});
		});
	});
}(jQuery));

function dialogHandler (context,undoFirst) {
	if (undoFirst) {
		dialogHandlerUndo();
	}
	// Trap Tab key focus to dialog
	tabHandle = ally.maintain.tabFocus({
		context: context,
	});

	// Disable elements outside of the dialog
	disabledHandle = ally.maintain.disabled({
		filter: context,
	});

	// Hide everything else from the accessibility tree.
	hiddenHandle = ally.maintain.hidden({
		filter: context,
	});
}

function dialogHandlerUndo () {
	// Restore Tab key focusing
	tabHandle.disengage();
	// undo disabling elements outside of the dialog
	disabledHandle.disengage()
	// undo hiding elements outside of the dialog from the accessibility tree.
	hiddenHandle.disengage();
}
