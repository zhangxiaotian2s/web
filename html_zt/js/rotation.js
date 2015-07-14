var isgo = true;
var ran = 1;
var totalDeg = 360 * 5 + 25 * ran;
var i = 0;
var a = 0.1;
var steps = [];
var now = 0;
var timer;
var $rotation_select = $("#rotation_select");
var $rotation_box = $("#rotation_box");

function countSteps() {
	var t = Math.sqrt(2 * totalDeg / a)
	var v = a * t;
	for (var i = 0; i < t; i++) {
		steps.push((2 * v * i - a * i * i) / 2)
	}
	steps.push(totalDeg);
}

function start() {
	if (isgo) {
		countSteps()
		timer = setInterval(function() {
		     steps[now++]
			$rotation_box.css({
				"-webkit-transform": "rotate(-" + steps[now] + "deg)",
				"-o-transform": "rotate(-" + steps[now] + "deg)",
				"-moz-transform": "rotate(-" + steps[now] + "deg)",
				"transform": "rotate(-" + steps[now] + "deg)"
			})
			if (now >= steps.length) {
				clearInterval(timer)
				now = 0
                document.cookie ="isfirst";
               $("#popup_unfirst").addClass("hidden")
                $("#popup").removeClass("hidden")
                $("#popup_form_box").removeClass("hidden")
				isgo = true;
			}
		}, 1000 / 60)
	}
}

$rotation_select.click(function() {
		if (isfirst() >= 0) {
			$("#popup").removeClass("hidden")
			 $("#popup_form_box").addClass("hidden")
			$("#popup_unfirst").removeClass("hidden")
			isgo = false;
		} else {
			isgo = true;
		}
		start()
})

function isfirst(){
	var strCookie = document.cookie;
	var arrCookie = strCookie.split(";");
	var t_arrCookie=[]
	var arr_length=arrCookie.length
	   for(i=0;i<arr_length;i++){
		t_arrCookie.push($.trim(arrCookie[i]))
	}
	return $.inArray("isfirst", t_arrCookie)
}

$("#popup_close").click(function(){
	$("#popup").addClass("hidden")
})


	//			 timer = setInterval(function() {
	//				$rotation_box.css({
	//					"-webkit-transform": "rotate(-" + i + "deg)"
	//				})
	//				i += 2
	//			}, 1000 / 60)