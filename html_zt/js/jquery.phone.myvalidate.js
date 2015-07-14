function form_validate(form,errortype) {
	$(form).find("input[type='text']").bind({

		'blur': function() {
			$this = $(this);
			var $value = $this.val()
			var datarule = $this.attr("data-check");
			var errorspan1 = $this;
			if (datarule != undefined) {
				var dataarray = datarule.split(",")
				v_fn()
			}

			function data_inarray(rule_name) {
				return $.inArray(rule_name, dataarray)
			}

			function v_fn() {
				if (data_inarray("required") != -1) {
					if ($.trim($value) == "") {
						error_add("此项为必填")
					}
				}
				if (data_inarray("tel") != -1) {
					var isMobile = /^1[3|4|5|7|8]\d{9}$/;
					var isPhone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
					if (!isMobile.test($value) && !isPhone.test($value)) {
						error_add("请输入正确的电话号码")
						return false
					}
				}
				if (data_inarray("username") != -1) {
					var reg = /^[\u4e00-\u9fa5]+$/i;
					if ($.trim($value) == "") {
						error_add("请输入您的姓名")
						return false
					} else if (!reg.test($value)) {
						error_add("请输入正确的姓名")
						return false
					}
				}
				
			}

			//添加错误样式

			function error_add(text) {
				errorspan1.val(text).addClass("error_red")
				
			}

		},
		'focus': function() {
			$this = $(this)
			var errorspan1 = $this;
			if (errorspan1.hasClass("error_red")) {
				errorspan1.removeClass("error_red").val("")
			}
			
		}
	})
}


