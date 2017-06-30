$(document).ready(function() {
	$('#first').canvasPercent();
	$('#second').canvasPercent({
		percentColor: '#3ebfbe',
		fontColor: '#3ebfbe',
		font: '30px Microsoft Yahei',
		textAlign: 'center',
		textBaseline: 'bottom'
	});
	$('#third').canvasPercent({
		percentColor: '#cc6600',
		isAnimate: true
	});
	$('#forth').canvasPercent({
		backRadius: 80,
		backBorderColor: '#efefef',
		backLineWidth: 5,
		percentColor: '#fa4444',
		percentLineWidth: 8
	});
});