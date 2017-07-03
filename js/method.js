(function($, window, undefined) {
	$.fn.canvasPercent = function(options) {
		// var $canvas = document.getElementById('first'); // $('#first')[0]、$('#first').get(0)
		var $canvas = $(this)[0],
			total = $(this).attr('data-total'),
			curr = $(this).attr('data-curr'),

			// // 百分比保留一位小数
			// per = parseFloat(curr/total).toFixed(3), // 保留两位小数
			// percent = (per * 100).toFixed(1);
			
			// 百分比取整
			per = parseFloat(curr/total).toFixed(2), // 保留两位小数
			percent = parseInt(per * 100),
			centerX = $canvas.width / 2,
			centerY = $canvas.height / 2,
			speed = 0.01;

		// 默认设置
		var defaults = {
			backRadius: 85, // 背景圆半径
			backBorderColor: '#e9e9e9', // 背景圆颜色
			backLineWidth: 2, // 背景圆宽度
			percentColor: '#f9a53e', // 比例圆颜色
			percentLineWidth: 4, // 比例圆宽度
			fontColor: '#F47C7C', // 百分比字体颜色
			font: '40px Arial', // 百分比字体设置
			textAlign: 'center', // 百分比对齐方式
			textBaseline: 'middle', // 百分比基础线
			isAnimate: false
		}; 
		// 合并options 和 defaults 到{}
		var setting = $.extend({}, defaults, options); 
		

		// 确定浏览器支持canvas元素
		if ($canvas.getContext) {
			var context = $canvas.getContext('2d');
			// 定义开始点弧度位置 
			var startArc = Math.PI/2;  
			// 根据占的比例画圆弧  
			var endArc = (Math.PI*2)*(per);

			// 不需要动画
			if (!setting.isAnimate) {
				context.translate(centerX, centerY); // 将原点画布中心 !important 动画时移动原点画出的线条有毛边
				centerX = 0;
				centerY = 0;
			}

			// 绘制背景圆
			function backCircle() {
				context.save(); // 保存当前状态，包含：颜色、路径、变形
				context.beginPath(); // 开始路径
				context.strokeStyle = setting.backBorderColor; // 线的颜色
				context.lineWidth = setting.backLineWidth; // 线的宽度
				context.arc(centerX, centerY, setting.backRadius, 0, Math.PI*2, true); // 以setting.backRadius为半径逆时针画圆
				context.closePath(); // 关闭路径
				context.stroke(); // 绘制
				context.restore(); // 还原上一个save状态
			}

			// 绘制比例圆
			function percentCircle(n) {
				context.save();
				// context.rotate(-startArc); // 圆默认从右侧90度位置开始画，需要旋转90度
				context.beginPath();
				context.strokeStyle = setting.percentColor;
				context.lineWidth = setting.percentLineWidth;
				if (n) {
					context.arc(centerX, centerY, setting.backRadius-setting.backLineWidth, -Math.PI/2, -Math.PI/2 + Math.PI*2*n, false);
				} else {
					context.arc(centerX, centerY, setting.backRadius-setting.backLineWidth, -Math.PI/2, -Math.PI/2 + Math.PI*2*per, false);
				}
				context.stroke();
				context.restore();
			}

			// 绘制文字
			function text(n) {
				context.save();
				context.fillStyle = setting.fontColor;
				context.font = setting.font;
				context.textAlign = setting.textAlign;
				context.textBaseline = setting.textBaseline;
				if (n) {
					context.fillText((n*100).toFixed(0)+"%", centerX, centerY);
				} else {
					context.fillText(percent+"%", centerX, centerY);
				}
				context.restore();
			}

			// 绘制开始时圆点
			function beginCircle() {
				context.save();
				context.rotate(-startArc); // 设置和比例圆的开始位置在一个起点上
				context.beginPath();
				context.fillStyle = setting.percentColor;
				context.arc(setting.backRadius-setting.backLineWidth, 0, setting.percentLineWidth/2, 0, Math.PI*2, true);
				context.fill();
				context.restore();
			}

			// 绘制结束时圆点
			function endCircle() {
				context.save();
				context.rotate(endArc - startArc); // 设置起点
				context.beginPath();
				context.fillStyle = setting.percentColor;
				context.arc(setting.backRadius-setting.backLineWidth, 0, setting.percentLineWidth/2, 0, Math.PI*2, true);
				context.fill();
				context.restore();
			}

			// 动画
			function drawFrame() {
				// 兼容
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				if (speed < per) {
					// 没有requestAnimationFrame时使用setInterval回退兼容
					if (window.requestAnimationFrame) {
						requestAnimationFrame(drawFrame);
					} else {
						setInterval(drawFrame, 100);
					}
					speed += 0.01;
				} else {
					clearInterval(drawFrame);
				}
				
				context.clearRect(0, 0, $canvas.width, $canvas.height);
				percentCircle(speed);// 画圈
				text(speed);// 写字
			}



			// 调用函数
			backCircle();
			// 动画
			if (setting.isAnimate) {
				drawFrame();
			} else {
				percentCircle();
				text();
				// 判断如果是百分百就不用画开始点和结束点的圆了
				if (curr % total == 0) {
					return;
				}
				beginCircle();
				endCircle();
			}
		}
	}
})($, window);