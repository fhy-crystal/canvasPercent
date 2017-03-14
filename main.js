$(document).ready(function() {
	var $firstCanvas = document.getElementById('first'); // $("#first")[0]
	var total = $('#first').attr('data-total');
	var curr = $('#first').attr('data-curr');
	var per = parseFloat(curr/total).toFixed(2); // 保留两位小数

	// 确定浏览器支持canvas元素
	if ($firstCanvas.getContext) {
		var context = $firstCanvas.getContext('2d');
		// 定义开始点的大小  
		var startArc = Math.PI/2;  
		// 根据占的比例画圆弧  
		var endArc = (Math.PI*2)*(per);

		context.translate(90, 90); // 将原点移到(90, 90)
		
		context.save(); // 保存当前状态，包含：颜色、路径、变形

		// 绘制背景圆
		context.beginPath(); // 开始路径
		context.strokeStyle = "#e9e9e9"; // 线的颜色
		context.lineWidth = 2; // 线的宽度
		context.arc(0, 0, 85, 0, Math.PI*2, true); // 以85为半径逆时针画圆
		context.closePath(); // 关闭路径
		context.stroke(); // 绘制

		context.restore(); // 还原上一个save状态

		context.save();
		// 绘制比例圆
		context.rotate(-startArc); // 圆默认从右侧90度位置开始画，需要旋转90度
		context.beginPath();
		context.strokeStyle = "#3ebfbe";
		context.lineWidth = 4;
		context.arc(0, 0, 83, 0, Math.PI*2*per, false);
		context.stroke();
	}
});