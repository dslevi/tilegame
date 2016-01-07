engine.npc = {};

engine.npc.list = [];

engine.npc.add = function(id, npc) {
	engine.npc.list[id] = npc;
};

engine.npc.draw = function(id) {
	var tileSize = engine.tileSize;

	var npc = engine.npc.list[id];
	var location = engine.model.getLocation(id, tileSize, tileSize);

	var x = (npc.x * tileSize) - (engine.viewport.x * tileSize) + location.x;
	var y = (npc.y * tileSize) - (engine.viewport.y * tileSize) + location.y;

	engine.model.draw(npc.model, 6, x, y);
};

engine.npc.hasNpc = function(x, y) {
	return !!engine.npc.list.find(function(npc) {
		return npc.x == x && npc.y == y;
	});
};