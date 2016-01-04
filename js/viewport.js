engine.viewport = {
	x: 0,
	y: 0
};

engine.viewport.playerOffset = {
	x: 0,
	y: 0
};

engine.viewport.overflowTile = 1;

engine.viewport.set = function(x, y) {
	engine.viewport.x = (x || 0) - (engine.screen.width - engine.tileSize) / 32;
	engine.viewport.y = (y || 0) - (engine.screen.height - engine.tileSize) / 32;
};