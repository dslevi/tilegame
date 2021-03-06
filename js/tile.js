engine.tile = {};

engine.tile.images = {};

engine.tile.draw = function(x, y, tile) {
	var rx = x * engine.tileSize;
	var ry = y * engine.tileSize;

	var ground = engine.tile.retrieve(tile.ground);
	engine.handle.drawImage(ground, rx, ry);

	if (tile.item) {
		var item = engine.tile.retrieve(tile.item);
		engine.handle.drawImage(item, rx, ry);
	}
};

engine.tile.store = function(id, src) {
	var tile = [new Image(), false];
	tile[0].src = src;
	tile[0].addEventListener('load', function() {
		tile[1] = true;
	}, false);
	engine.tile.images[id] = tile;
};

engine.tile.retrieve = function(id) {
	return engine.tile.images[id][0];
};

engine.tile.allLoaded = function() {
	var images = engine.tile.images;
	for (var id in images) {
		if (images.hasOwnProperty(id) && !images[id][1]) return false;
	}
	return true;
};