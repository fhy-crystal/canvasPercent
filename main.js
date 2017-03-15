$(document).ready(function() {
	$('#first').canvasPercent();
	$('#second').canvasPercent({
		percentColor: '#3ebfbe',
	});
	$('#third').canvasPercent({
		percentColor: '#cc6600',
	});
	$('#forth').canvasPercent({
		backRadius: 80,
		backBorderColor: '#efefef',
		backLineWidth: 5,
		percentColor: '#fa4444',
		percentLineWidth: 8
	});
});