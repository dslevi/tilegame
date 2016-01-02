var engine = {
	tileSize: 16
};
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');
engine.currentMap = null;

engine.setMap = function(mapData) {
	engine.currentMap = mapData;
};

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

	engine.player.store(0, 'img/scientist_n0.png');
	engine.player.store(1, 'img/scientist_n1.png');
	engine.player.store(2, 'img/scientist_n2.png');

	engine.player.store(3, 'img/scientist_e0.png');
	engine.player.store(4, 'img/scientist_e1.png');
	engine.player.store(5, 'img/scientist_e2.png');

	engine.player.store(6, 'img/scientist_s0.png');
	engine.player.store(7, 'img/scientist_s1.png');
	engine.player.store(8, 'img/scientist_s2.png');

	engine.player.store(9,  'img/scientist_w0.png');
	engine.player.store(10, 'img/scientist_w1.png');
	engine.player.store(11, 'img/scientist_w2.png');

	engine.setMap(mapData);
	engine.draw();

	engine.keyboard.canInput = true;
};