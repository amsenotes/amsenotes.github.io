$(function() {
    var mobilenav = $('#mobile-nav');
    var menu = $('nav ul');
    var menuHeight = menu.height();

    $(mobilenav).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });
	
	$(window).resize(function(){
		var w = $(window).width();
		if(w > 320 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	}); 
});

