engine.player = {};
engine.player.sprite = {};

engine.player.direction = {
	UP: 0,
	DOWN: 6,
	LEFT: 9,
	RIGHT: 3
};

engine.player.spriteIndex = engine.player.direction.DOWN;
engine.player.leftLeg = false;

engine.player.store = function(id, src) {
	var sprite = [new Image(), false];
	sprite[0].src = src;
	sprite[0].addEventListener('load', function() {
		sprite[1] = true;
	});

	engine.player.sprite[id] = sprite;
};

engine.player.retrieve = function(id) {
	return engine.player.sprite[id];
};

engine.player.allLoaded = function() {
	var sprite = engine.player.sprite;
	for (var id in sprite) {
		if (sprite.hasOwnProperty(id) && !sprite[id][i]) return false;
	}
	return true;
};

engine.player.getLocation = function() {
	var sprite = engine.player.sprite[0][0];

	return {
		left: (engine.screen.width / 2) - (sprite.width / 2),
		top: (engine.screen.height / 2) - (sprite.height / 2)
	};
};

engine.player.draw = function() {
	var location = engine.player.getLocation();
	engine.handle.drawImage(engine.player.sprite[engine.player.spriteIndex][0], location.left, location.top);
};

engine.player.move = function(direction) {
	engine.keyboard.canInput = false;
	engine.player.spriteIndex = direction;

	switch (direction) {
		case engine.player.direction.UP:
			engine.viewport.playerOffset.y = 5;
			break;
		case engine.player.direction.RIGHT:
			engine.viewport.playerOffset.x = -5;
			break;
		case engine.player.direction.LEFT:
			engine.viewport.playerOffset.x = 5;
			break;
		case engine.player.direction.DOWN:
			engine.viewport.playerOffset.y = -5;
			break;
	}

	engine.draw();
	setTimeout(engine.player.animate, 50);
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
	switch (engine.player.spriteIndex) {
		case 1: case 2:
			engine.viewport.y--;
			engine.player.spriteIndex = engine.player.direction.UP;
			break;
		case 4: case 5:
			engine.viewport.x++;
			engine.player.spriteIndex = engine.player.direction.RIGHT;
			break;
		case 7: case 8:
			engine.viewport.y++;
			engine.player.spriteIndex = engine.player.direction.DOWN;
			break;
		case 10: case 11:
			engine.viewport.x--;
			engine.player.spriteIndex = engine.player.direction.LEFT;
			break;
	}

	engine.viewport.playerOffset.x = 0;
	engine.viewport.playerOffset.y = 0;

	engine.draw();

	engine.keyboard.canInput = true;
};