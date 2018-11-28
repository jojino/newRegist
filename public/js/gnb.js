var gnb = function(chk1, chk2){
	now1 = chk1;
	now2 = chk2;

	mk = $('.m'+now1);

	var nav_area = $('.gnb');
	var dep1 = nav_area.children('li');
	var dep2 = dep1.children('ul').children('li');

	dep1.bind('mouseover focusin', function(){
		dep1.removeClass('on');
		$(this).addClass('on');

		if ( $(this).children().size() != 1 ) {
			$('.dep2_bg').show();
		}
		else {
			$('.dep2_bg').hide();
		}
	});

	dep1.bind('mouseleave focusout', function(){
		dep1.removeClass('on');
		dep2.removeClass('on');

		if ( now1 == 9999 ) {
			$('.dep2_bg').hide();
		} else {
			$(mk).addClass('on');
			$(mk).find('ul').find('li').eq(now2).addClass('on');
		}
		if ( now1 == 1 ) {
			$('.dep2_bg').hide();
		}
	});


	dep2.bind('mouseover focusin', function(){
		dep2.removeClass('on');
		$(this).addClass('on');
	});

	if ( now1 != 9999 ) {
		$(mk).addClass('on');
		$(mk).find('ul').find('li').eq(now2).addClass('on');
		
		$('.dep2_bg').show();
	}

	if ( now1 == 1 ) {
			$('.dep2_bg').hide();
		} 
}