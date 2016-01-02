engine.script = {};

engine.script.list = [];

engine.script.call = function(id) {
   var script = engine.script.list[id];
   eval('(function eval_csf(){' + script + '})();');
};

engine.script.add = function(id, data) {
   engine.script.list[id] = data;
};