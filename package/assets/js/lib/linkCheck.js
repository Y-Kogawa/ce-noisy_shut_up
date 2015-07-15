var linkCheck = function(){
	var pathList = [];
	var getPath = function(){
		var _list = [],
			list = [],
			max, cnt;
		$('a, img, iframe, link, area').each(function(i){
			var s = $(this).attr('src');
			var h = $(this).attr('href');
			if(s) _list.push(s);
			if(h && h.indexOf('chrome-extension://') == -1 && h.indexOf('javascript:') == -1){
				_list.push(h);
			}
		});

		max = _list.length;
		for(var i=0;i<max;i++){
			cnt = overlapCnt(_list, _list[i]);
			list.push({path: _list[i], count: cnt});
		}

		max = list.length;
		for(var i=0;i<max;i++){
			for(var h=i+1;list.length>h;h++){
				if(list[i].path == list[h].path){
					list.splice(h,1);
				}
			}
		}

		return list;
	}

	// 配列内の重複している値をカウント
	var overlapCnt = function(ary, t) {
		var cnt = 0;
		for(var i=0;ary.length>i;i++){
			if(ary[i] == t) cnt++;
		}
		return cnt;
	}

	var check = function(){
		var i = 0;
		var statusName;

		var run = function(url){
			$.ajax({
				url: url,
				timeout: 20000,
				complete: function(xhr, status){
					console.log(pathList[i].path + ': ' + status)
					i++;
					if(i < pathList.length){
						run(pathList[i].path);
					}
				}
			});
		}
		run(pathList[i].path);
	}

	pathList = getPath();
	check();
}