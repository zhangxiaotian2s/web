$(document).ready(function() {
	var myDate = new Date(),index;
	var house = myDate.getHours()
	if (house == 23 || 0) {
		index = 0;
	} else {
		index = Math.floor((house - 1) / 2 + 1);
	}
	$(".pic").eq(index).addClass('active');
})

