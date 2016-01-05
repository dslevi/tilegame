engine.data = {};

engine.data.loaded = {};

engine.data.load = function(file, cb) {
	if (engine.data.loaded[file]) {
		if (cb) cb();
		return;
	}

	var request = new XMLHttpRequest();
	request.overrideMimeType('application/json');
	request.open('get', file, true);
	request.addEventListener('readystatechange', function() {
		if (this.readyState == 4 && this.status != 404) {
			engine.data.parse(this.responseText, cb);
			engine.data.loaded[file] = true;
		}
	});
	request.send();
};

engine.data.parse = function(response, cb) {
	var data = JSON.parse(response.replace(/\n/g, ''));

	engine.map.list[data.mapID] = data.map;

	data.tiles.forEach(function(tile) {
		engine.tile.store(tile.id, tile.src);
	});

	data.models.forEach(function(model) {
		engine.model.load(model.id, model.name);
	});

	data.scripts.forEach(function(script) {
		engine.script.add(script.id, script.data);
	});

	data.npcs.forEach(function(npc) {
		engine.npc.add(npc.id, npc);
	});

	if (cb) cb();
};