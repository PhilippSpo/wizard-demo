buildLocationChart = function() {
	locations = Continents.find();
	var data = [];
	var total = 0;
	locations.forEach(function(location) {
		if (location.hasOwnProperty('amount')) {
			total = total + location.amount;
		}
	});
	locations.forEach(function(location) {
		var amount = 0;
		if (location.hasOwnProperty('amount')) {
			amount = location.amount / total;
		}
		data.push([location.name, amount]);
	});
	$('#locationChart').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: "Where Meteor developers come from"
		},
		tooltip: {
			pointFormat: '<b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					},
					connectorColor: 'silver'
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'location',
			data: data
		}]
	});
};

buildOsChart = function() {
	opsys = OperatingSystems.find();
	var data = [];
	var total = 0;
	opsys.forEach(function(os) {
		if (os.hasOwnProperty('amount')) {
			total = total + os.amount;
		}
	});
	opsys.forEach(function(os) {
		var amount = 0;
		if (os.hasOwnProperty('amount')) {
			amount = os.amount / total;
		}
		data.push([os.name, amount]);
	});
	$('#osChart').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: "Which OS Meteor developers use"
		},
		tooltip: {
			pointFormat: '<b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					},
					connectorColor: 'silver'
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'location',
			data: data
		}]
	});
};

Template.charts.rendered = function() {
	this.autorun(function(c) {
		buildLocationChart();
		buildOsChart();
	});
};