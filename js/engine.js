var engine = {};

engine.tileSize = 16;
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.draw = function() {
	if (!engine.tile.allLoaded()) {
		setTimeout(engine.draw, 100);
	} else {
		engine.handle.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
		engine.map.draw();
		engine.player.draw();
		engine.npc.draw(0);
		engine.npc.draw(1);
	}
};

engine.start = function(mapID, x, y) {
	engine.viewport.set(x, y);

	engine.map.set(mapID);
	engine.draw();

	engine.keyboard.canInput = true;
};