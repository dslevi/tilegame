engine.map = {
	draw: function() {
		var overflow = engine.viewport.overflowTile;
		var mapData = engine.map.current;
		var mapX = 0;
		var mapY = 0;
		
		var tile;
		for (var j = -overflow; j < engine.screen.tilesY + overflow; j++) {
			for (var i = -overflow; i < engine.screen.tilesX + overflow; i++) {
				mapX = i + engine.viewport.x;
				mapY = j + engine.viewport.y;

				tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : {ground: 0};
				engine.tile.draw(i, j, tile);
			}
		}
	}
};

engine.map.current = null;

engine.map.set = function(mapData) {
	engine.map.current = mapData;
};