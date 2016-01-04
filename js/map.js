engine.map = {};

engine.map.list = [];

engine.map.current = -1;

engine.map.set = function(mapID) {
	engine.map.current = mapID;
};

engine.map.draw = function() {
	var overflow = engine.viewport.overflowTile;
	var map = engine.map.list[engine.map.current];
	if (!map) {
		throw new Error('No map data found for: ' + engine.map.current);
	}

	var mapX = 0;
	var mapY = 0;

	var tile;
	for (var j = -overflow; j < engine.screen.tilesY + overflow; j++) {
		for (var i = -overflow; i < engine.screen.tilesX + overflow; i++) {
			mapX = i + engine.viewport.x;
			mapY = j + engine.viewport.y;

			tile = engine.map.getTile(mapX, mapY) || {ground: 0};
			engine.tile.draw(i, j, tile);
		}
	}
};

engine.map.getCurrent = function() {
	return engine.map.list[engine.map.current];
};

engine.map.getTile = function(x, y) {
	var map = engine.map.getCurrent();
	return (map[y] && map[y][x]) ? map[y][x] : undefined;
};

engine.map.tileHasProperty = function(tile, property, hasValue) {
	if (tile && tile[property] !== undefined) {
		return (hasValue) ? tile[property] == hasValue : true;
	} else {
		return false;
	}	
};