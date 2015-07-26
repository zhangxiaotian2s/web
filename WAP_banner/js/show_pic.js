(function($) {
	$.fn.show_pc = function(congfig) {
		var cfg = {
			imgul: 'imgul',
			type_data_img: 'data-img',
			type_data_tit: 'data-title',
			load_img: "images/loading.gif",
			show_box: 'show_box',
			show_tit: 'show_img_tit',
			show_main: 'show_main'
		}
		var o_cfg = {
			c_index: 0,
			z_index: 0,
			arr_data: new Array(),
			arr_size: new Array(),
		}
		var w_w = $(window).width(),
			w_h = $(window).height()

		var imgul = $('#' + cfg.imgul), //图片列表的UL id获取
			imgli = imgul.children('li'),
			imgli_l = imgli.length;
		//重置配置
		$.extend(false, cfg, congfig);

		var init = {
			//获得图片地址和title
			getImg: function() {
				for (i = 0; i < imgli_l; i++) {
					var img = {
						src: imgli.eq(i).attr(cfg.type_data_img),
						tit: imgli.eq(i).attr(cfg.type_data_tit)
					}
					o_cfg.arr_data.push(img)
				}
				this.setImg();
			},
			//替换src地址
			setImg: function() {
				for (i = 0; i < imgli_l; i++) {
					imgli.eq(i).children('img').attr('src', o_cfg.arr_data[i].src)
				}
			}

		}
		var ac_fn = {
				start: function(i) {
					this.add_Html(i);
					//填补样式 设置show_main的高度
					$(document).find('#show_main').css('height', w_h - 80)
					this.insterImg(i)
				},
				insterImg: function(i) {
					var show_li = $(document).find('#show_main>ul>li').eq(i),
						show_img = show_li.children('img');
					show_img_tit = $(document).find('#show_img_tit')
					show_img_tit.html(o_cfg.arr_data[i].tit)
						//加载回调 
					if (show_img.attr('src') == o_cfg.arr_data[i].src) {} else {
						var img = new Image();
						img.src = o_cfg.arr_data[i].src;
						img.load = function(i) {
							show_img.attr('src', o_cfg.arr_data[i].src);
							//获得图片原尺寸
							var o_w = img.width > w_w ? w_w : img.width,
								o_h = img.height > (w_h - 80) ? (w_h - 80) : img.height;
							if (img.width > w_w) {
								o_h = (o_w / img.width) * img.height;
							}
							show_img.css({
								'width': o_w + 'px',
								'height': o_h + 'px'
							})
							show_li.css({
								'margin-top': -(o_h / 2) + 'px',
								'margin-left': -(o_w / 2) + 'px'
							})
						}(i)
					}
					show_img.removeClass('show_load');
				},
				next_Show: function() {

					var z_i = o_cfg.z_index++;
					o_cfg.z_index += 2
					var i = o_cfg.c_index;
					o_cfg.c_index++;

					if (o_cfg.c_index >= o_cfg.arr_data.length) {
						o_cfg.c_index = 0
					}
					ac_fn.insterImg(o_cfg.c_index);
					var show_li = $(document).find('#show_main>ul>li');
					show_li.eq(i).css('z-index', o_cfg.z_index).addClass('from-right-out');
					show_li.eq(o_cfg.c_index).css('z-index', z_i).addClass('show_index')
					setTimeout(function() {
						show_li.eq(i).removeClass('from-right-out').removeClass('show_index');
					},300)
				},
				pre_Show: function() {
					var i = o_cfg.c_index;
					o_cfg.c_index = o_cfg.c_index - 1;

					if (o_cfg.c_index < 0) {
						o_cfg.c_index = o_cfg.arr_data.length - 1
					}

					var show_li = $(document).find('#show_main>ul>li')
					show_li.eq(i).removeClass('show_index')
					this.insterImg(o_cfg.c_index)
				},
				add_Html: function(i) {
					var html = ''
					html += '<div id="show_box">';
					html += '<p id="show_img_tit">' + o_cfg.arr_data[i].tit + '</p>';
					html += '<div id="show_main">';
					html += '<ul>'
					for (j = 0; j < o_cfg.arr_data.length; j++) {
						if (j == i) {
							html += '<li data-img="' + o_cfg.arr_data[j].src + '" class="show_index" ><img src="' + cfg.load_img + '" class="show_load"></li>';
						} else {
							html += '<li data-img="' + o_cfg.arr_data[j].src + '"><img src="' + cfg.load_img + '" class="show_load"></li>';
						}
					}
					html += '</ul></div></div>';
					$('body').append(html)
				}

			}
			//添加点击事件
		imgli.on('tap', function() {
			o_cfg.c_index = $(this).index()

			ac_fn.start(o_cfg.c_index)
		})
		$(document).on('swipeRight', function() {
			ac_fn.next_Show(o_cfg.c_index)
		})
		$(document).on('swipeLeft', function() {
			ac_fn.pre_Show(o_cfg.c_index)
		})

		init.getImg()






	}
})(Zepto)