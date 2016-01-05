engine.player = {};

engine.player.direction = {
	UP: 0,
	DOWN: 6,
	LEFT: 9,
	RIGHT: 3
};

engine.player.spriteIndex = engine.player.direction.DOWN;

engine.player.model = 0;

engine.player.leftLeg = false;

engine.player.draw = function() {
	var model = engine.player.model;
	var location = engine.model.getLocation(model, engine.screen.width, engine.screen.height);
	engine.model.draw(model, engine.player.spriteIndex, location.x, location.y);
};

engine.player.move = function(direction) {
	engine.keyboard.canInput = false;
	
	var x = 0;
	var y = 0;

	switch (direction) {
		case engine.player.direction.UP:
			y = 1;
			break;
		case engine.player.direction.RIGHT:
			x = -1;
			break;
		case engine.player.direction.LEFT:
			x = 1;
			break;
		case engine.player.direction.DOWN:
			y = -1;
			break;
	}

	var toX = engine.viewport.x + Math.floor(engine.screen.tilesX / 2) - x;
	var toY = engine.viewport.y + Math.floor(engine.screen.tilesY / 2 - 0.5) - y;
	var toTile = engine.map.getTile(toX, toY);

	if (engine.map.tileHasProperty(toTile, 'solid', 1)) {
		engine.keyboard.canInput = true;
	} else {
		engine.viewport.playerOffset.y = y * 5;
		engine.viewport.playerOffset.x = x * 5;
		setTimeout(engine.player.animate, 50);
	}

	engine.player.spriteIndex = direction;
	engine.draw();
};

engine.player.animate = function() {
	switch (engine.player.spriteIndex) {
		case engine.player.direction.UP:
			engine.viewport.playerOffset.y = 11;
			break;
		case engine.player.direction.RIGHT:
			engine.viewport.playerOffset.x = -11;
			break;
		case engine.player.direction.LEFT:
			engine.viewport.playerOffset.x = 11;
			break;
		case engine.player.direction.DOWN:
			engine.viewport.playerOffset.y = -11;
			break;
	}

	engine.player.spriteIndex += (engine.player.leftLeg) ? 1: 2;
	engine.player.leftLeg = !engine.player.leftLeg;

	engine.draw();
	setTimeout(engine.player.reset, 50);
};

engine.player.reset = function() {
	var x = engine.viewport.x;
	var y = engine.viewport.y;

	switch (engine.player.spriteIndex) {
		case 1: case 2:
			y--;
			engine.player.spriteIndex = engine.player.direction.UP;
			break;
		case 4: case 5:
			x++;
			engine.player.spriteIndex = engine.player.direction.RIGHT;
			break;
		case 7: case 8:
			y++;
			engine.player.spriteIndex = engine.player.direction.DOWN;
			break;
		case 10: case 11:
			x--;
			engine.player.spriteIndex = engine.player.direction.LEFT;
			break;
	}

	engine.viewport.x = x;
	engine.viewport.y = y;

	engine.viewport.playerOffset.x = 0;
	engine.viewport.playerOffset.y = 0;

	engine.draw();

	var tileX = x + Math.floor(engine.screen.tilesX / 2);
	var tileY = y + Math.floor(engine.screen.tilesY / 2);
	var toTile = engine.map.getTile(tileX, tileY);
	if (engine.map.tileHasProperty(toTile, 'onenter')) {
		engine.script.call(engine.map.getCurrent()[tileY][tileX].onenter);
	}

	engine.keyboard.canInput = true;
};

engine.player.activate = function() {
	var x = engine.viewport.x + Math.floor(engine.screen.tilesX / 2);
	var y = engine.viewport.y + Math.floor(engine.screen.tilesY / 2);

	switch (engine.player.spriteIndex) {
		case engine.player.direction.UP:
			y--;
			break;
		case engine.player.direction.RIGHT:
			x++;
			break;
		case engine.player.direction.DOWN:
			y++;
			break;
		case engine.player.direction.LEFT:
			x--;
			break;
	}

	if (engine.map.tileHasProperty(engine.map.getTile(x, y), 'onactivate')) {
		engine.script.call(engine.map.getCurrent()[y][x].onactivate);
	}
};

engine.player.dance = function() {
	if (engine.player.danceInterval) {
		engine.player.danceInterval = clearInterval(engine.player.danceInterval);
		engine.keyboard.canInput = true;
	} else {
		engine.keyboard.canInput = false;
		engine.player.danceInterval = setInterval(function () {
			engine.player.spriteIndex = 0;
			engine.draw();

			setTimeout(function() {
				engine.player.spriteIndex = 1;
				engine.draw();
				setTimeout(function() {
					engine.player.spriteIndex = 2;
					engine.draw();
					setTimeout(function() {
						engine.player.spriteIndex = 3;
						engine.draw();
					}, 300);
				}, 300);
			}, 300);
		}, 1200);
	}
};