engine.keyboard = {};

engine.keyboard.canInput = false;

engine.keyboard.direction = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

engine.keyboard.action = {
	ACTIVATE: 65,
	DANCE: 68
};

engine.keyboard.parseKey = function(event) {
	if (!engine.keyboard.canInput && (event.keyCode !== engine.keyboard.action.DANCE)) return;

	switch(event.keyCode) {
		case engine.keyboard.direction.UP:
			engine.player.move(engine.player.direction.UP);
			break;
		case engine.keyboard.direction.DOWN:
			engine.player.move(engine.player.direction.DOWN);
			break;
		case engine.keyboard.direction.LEFT:
			engine.player.move(engine.player.direction.LEFT);
			break;
		case engine.keyboard.direction.RIGHT:
			engine.player.move(engine.player.direction.RIGHT);
			break;
		case engine.keyboard.action.ACTIVATE:
			engine.player.activate();
			break;
		case engine.keyboard.action.DANCE:
			engine.player.dance();
			break;
	}
};