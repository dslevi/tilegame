var engine = {
	tileSize: 16
};
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.draw = function() {
	if (!engine.tile.allLoaded()) {
		setTimeout(engine.draw, 100);
	} else {
		engine.handle.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
		engine.map.draw();
		engine.player.draw();
	}
};

engine.start = function(mapData, x, y) {
	engine.viewport.x = x || 0;
	engine.viewport.y = y || 0;

	engine.tile.store(0, 'img/undefined.png');
	engine.tile.store(1, 'img/grass.png');
	engine.tile.store(2, 'img/rock.png');
	engine.tile.store(3, 'img/ladderdown.png');
	engine.tile.store(4, 'img/ladderup.png');
	engine.tile.store(5, 'img/cave.png');
	engine.tile.store(6, 'img/sign.png');

	engine.model.load(0, 'scientist');
	engine.model.load(1, 'officer');

	engine.map.set(mapData);
	engine.draw();

	engine.keyboard.canInput = true;
};