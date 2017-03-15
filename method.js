(function($, window, undefined) {
	$.fn.canvasPercent = function(options) {
		// var $canvas = document.getElementById('first'); // $('#first')[0]、$('#first').get(0)
		var $canvas = $(this)[0];
		var total = $(this).attr('data-total');
		var curr = $(this).attr('data-curr');
		var per = parseFloat(curr/total).toFixed(2); // 保留两位小数

		var defaults = {
			backRadius: 85, // 背景圆半径
			backBorderColor: '#e9e9e9', // 背景圆颜色
			backLineWidth: 2, // 背景圆宽度
			percentColor: '#f9a53e', // 比例圆颜色
			percentLineWidth: 4 // 比例圆宽度
		}; // 默认设置
		var setting = $.extend({}, defaults, options); // 合并options 和 defaults 到{}
		

		// 确定浏览器支持canvas元素
		if ($canvas.getContext) {
			var context = $canvas.getContext('2d');
			// 定义开始点弧度位置 
			var startArc = Math.PI/2;  
			// 根据占的比例画圆弧  
			var endArc = (Math.PI*2)*(per);

			context.translate(90, 90); // 将原点移到(90, 90)

			context.save(); // 保存当前状态，包含：颜色、路径、变形

			// 绘制背景圆
			context.beginPath(); // 开始路径
			context.strokeStyle = setting.backBorderColor; // 线的颜色
			context.lineWidth = setting.backLineWidth; // 线的宽度
			context.arc(0, 0, setting.backRadius, 0, Math.PI*2, true); // 以setting.backRadius为半径逆时针画圆
			context.closePath(); // 关闭路径
			context.stroke(); // 绘制

			context.restore(); // 还原上一个save状态

			context.save();
			// 绘制比例圆
			context.rotate(-startArc); // 圆默认从右侧90度位置开始画，需要旋转90度
			context.beginPath();
			context.strokeStyle = setting.percentColor;
			context.lineWidth = setting.percentLineWidth;
			context.arc(0, 0, setting.backRadius-setting.backLineWidth, 0, Math.PI*2*per, false);
			context.stroke();

			context.restore();

			// 判断如果是百分百就不用画开始点和结束点的圆了
			if (curr % total == 0) {
				return;
			}

			// 绘制开始时圆点
			context.save();
			context.rotate(-startArc); // 设置和比例圆的开始位置在一个起点上
			context.beginPath();
			context.fillStyle = setting.percentColor;
			context.arc(setting.backRadius-setting.backLineWidth, 0, setting.percentLineWidth/2, 0, Math.PI*2, true);
			context.fill();

			context.restore();

			// 绘制结束时圆点
			context.save();
			context.rotate(endArc - startArc); // 设置起点
			context.beginPath();
			context.fillStyle = setting.percentColor;
			context.arc(setting.backRadius-setting.backLineWidth, 0, setting.percentLineWidth/2, 0, Math.PI*2, true);
			context.fill();

			context.restore();
		}
	}
})($, window);