(function($) {
	
	$.fn.myformvialidate = function(form) {
		
		$(form).find("input[type='text']").bind({
			'blur': function() {
				$this = $(this);
				var $value = $this.val()
				var datarule = $this.attr("data-check");
				if (datarule != undefined) {
					var dataarr = datarule.split(",")
					v_fn()
				}

				function data_inarray(rule_name) {
					return $.inArray(rule_name, dataarr)
				}

				function v_fn() {
						if (data_inarray("required") != -1) {
							if ($.trim($value) == "") {
								error_add("此项为必填")
							}
						}
						if (data_inarray("username") != -1) {
							if ($.trim($value) == "") {
								error_add("请输入姓名")
							} else if ($.trim($value).length > 10) {
								error_add("姓名太长了")
							}

						}
					}
					//添加错误样式

				function error_add(text) {
					$this.val(text).addClass("error_red")
				}

			},
			'focus': function() {
				$this = $(this)
				if ($this.hasClass("error_red")) {
					$this.removeClass("error_red").val("")
				}
			}
		})

	}
})(jQuery)

