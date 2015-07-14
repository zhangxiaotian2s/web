function fileSelect(e) {
	e = e || window.event;
	var files = e.target.files;
	var ireg = /image\/.*/i,
		p = document.getElementById('head_img');
	for (var i = 0, f; f = files[i]; i++) {
		if (!f.type.match(ireg)) {
			alert("您上传的不是图片")
			continue;
		}
		var reader = new FileReader();
		reader.onload = (function(file) {
			return function(e) {
				p.innerHTML = ""
				var span = document.createElement('span');
				span.innerHTML = '<img class="thumb" src="' + this.result + '"  alt="' + file.name + '" id="head_uoload_img" class="img-circle" " />';
				p.insertBefore(span, null);
				var img_head = $("#head_uoload_img"),
					img_w = img_head.width(),
					img_h = img_head.height();
				imgsize(img_head, img_w, img_h)

			};
		})(f);
				reader.readAsDataURL(f);
	}
}

document.getElementById('head_img_file').addEventListener('change', fileSelect, false);

if (window.File && window.FileList && window.FileReader && window.Blob) {} else {
	document.write('您的浏览器不支持File Api');
}

function imgsize(img_head, img_w, img_h) {
	if (img_w >= img_h) {
		img_head.css({
			"height": 100 + '%',
			"width": ((img_w / img_h) * 100) +'%'
		})
	} else if (img_h >= img_w) {
		img_head.css({
			"width": 100 + '%',
			"height": ((img_h / img_w) * 100)+'%'
		})
	}

}