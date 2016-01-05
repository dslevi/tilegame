engine.model = {};

engine.model.imageNames = ['n0', 'n1', 'n2', 'e0', 'e1', 'e2', 's0', 's1', 's2', 'w0', 'w1', 'w2'];

engine.model.list = [];

engine.model.load = function(id, modelName) {
	engine.model.list[id] = engine.model.imageNames.map(function(imageName) {
		var model = [new Image(), false];
		model[0].src = 'img/' + modelName + '/' + modelName + '_' + imageName + '.png';
		model[0].addEventListener('load', function() {
			model[1] = true;
		});
		return model;
	});
};

engine.model.isLoaded = function(id) {
	var model = engine.model.list[id];
	for (var imageId in model) {
		if (model.hasOwnProperty(imageId) && !model[imageId][1]) return false;
	}
	return true;
};

engine.model.getLocation = function(id, x, y) {
	var character = engine.model.list[id][0][0];
	return {
		x: Math.floor((x / 2) - (character.width / 2)),
		y: Math.floor((y / 2) - character.height + 8)
	};
};

engine.model.draw = function(model, index, x, y) {
	if (!engine.model.isLoaded(model)) {
		setTimeout(engine.model.draw, 10)
	} else {
		console.log(x, y);
		engine.handle.drawImage(engine.model.list[model][index][0], x, y);
	}
};