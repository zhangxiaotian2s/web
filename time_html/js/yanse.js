(function() {
	var $time = $('.pic'),
		now = new Date();

	function djs(settime, nowtime) {
		var count_time = settime - nowtime,
			day = parseInt(count_time / (60 * 60 * 24)),
			house = parseInt(count_time / (60 * 60) - (day * 24)),
			minute = parseInt(count_time / (60) - (day * 24 * 60 + house * 60)),
			second = parseInt(count_time - (day * 24 * 60 * 60 + house * 60 * 60 + minute * 60));
		$("#day").html(day);
		$("#hour").html(house)
		$("#minute").html(minute)
		$("#seconds").html(second)
	}

	function getTime(text) {
		var arr = $.trim(text).split('-');
		var date1 = new Date();
		date1.setHours(+arr[0].split(':')[0], +arr[0].split(':')[1], 0);
		if (date1 > now) {
			return false;
		}
		var date2 = new Date();
		date2.setHours(+arr[1].split(':')[0], +arr[1].split(':')[1], 0);
		if (date2 > now) {
			return true;
		} else {
			return false;
		}
	}
	$time.each(function(i) {
		if (getTime($(this).text())) {
			$(this).addClass('.active');
		}
	});
})(); // JavaScript Document