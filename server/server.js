if (Continents.find().fetch().length === 0) {
	var continents = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia'];
	_.each(continents, function(continentName) {
		Continents.insert({
			name: continentName
		});
	});
}
if (OperatingSystems.find().fetch().length === 0) {
	var opSystems = ['Windows', 'Mac', 'Linux'];
	_.each(opSystems, function(continentName) {
		OperatingSystems.insert({
			name: continentName
		});
	});
}
Meteor.methods({
	increaseContinentCount: function(continent) {
		Continents.update({
			name: continent
		}, {
			$inc: {
				amount: 1
			}
		});
	},
	increaseOsCount: function(os) {
		OperatingSystems.update({
			name: os
		}, {
			$inc: {
				amount: 1
			}
		});
	}
});