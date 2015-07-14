/* 
author: elycir 
create: 2012-06 
description: 省市区三级(二级)联动 
*/
$(function() {

	var province = $("#province");
	var provinceli = province.children("li")
	var city = $("#city");
	var district = $("#district");
	var preProvince = $("#pre_province");
	var showCity = $(".valuebox")
	var preCity = $("#pre_city");
	var preDistrict = $("#pre_district");
	var jsonProvince = "dist/js/content/json-array-of-province.js";
	var jsonCity = "dist/js/content/json-array-of-city.js";

	function _LoadOptions(datapath, preobj, targetobj, parentcode, comparelen, initoption) {
			$.get(datapath,
				function(data) {
					var t = ''; // t: html容器 
					var pre; // pre: 初始值 
					if (preobj === undefined) {
						pre = 0;
						alert("1")
					} else {
						pre = preobj;
					}
					for (var i = 0; i < data.length; i++) {
						if (comparelen === 0) {
							t += '<li data-value=' + data[i].code + ' data-name=' + data[i].name + '>' + data[i].name + '</li>';
						} else {
							var p = parentcode ;
							if (p.substring(0, comparelen) === data[i].code.substring(0, comparelen)) {
								t += '<li data-value=' + data[i].code + ' data-name=' + data[i].name + '>' + data[i].name + '</li>';
							}
						}
					}
					if (initoption !== null) {
						targetobj.html(initoption + t);
					} else {
						targetobj.html(t);
					}
				},
				"json");
		}
		//加载省级列表
	_LoadOptions(jsonProvince, preProvince, province, null, 0, null);
	$(document).on("tap", '#province li', function() {
		var code = $(this).attr("data-value")
		$("#province li").removeClass("current")
		$(this).addClass("current")
		_LoadOptions(jsonCity, preCity, city, code, 2, null);
	})

	$(document).on("tap", '#city li', function() {
		var checkedcity = $(this).attr("data-name")
		showCity.text(checkedcity)
		$(".up_box").slideUp()
	})


});