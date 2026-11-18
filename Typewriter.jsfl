// Typewriter.jsfl ; forcing myself to learn flash javascript 11.17.2026

var document = fl.getDocumentDOM()
var timeline = document.getTimeline()
var text_selection = document.selection[0];
var base_string = text_selection.getTextString();

var original_types = [];

// i know this is a really bad way of doing it but i can't figure out any other way to allow for multiple layers in a timeline HEEEELLLPP!!!!!
function lock_layers(mode) {
	var current_layers = timeline.layers;
	
	if (mode == "lock all") {
		for (var i = 0; i < current_layers.length; i++) {
			original_types.push(current_layers[i].locked)
			if (i != timeline.currentLayer) {
				current_layers[i].locked = true
			}
		}
	}

	if (mode == "restore") {
		for (var i = 0; i < current_layers.length; i++) {
			current_layers[i].locked = original_types[i]
		}
	}
}

for (var i = 0; i < base_string.length; i++) {
	lock_layers("lock all")
	
	document.selectAll();
	text_selection = document.selection[0];
	
	text_selection.setTextString(base_string.substring(0, i+1));
	
	timeline.insertFrames(1);
	timeline.currentFrame = i;
	timeline.convertToKeyframes(timeline.currentFrame);
	
	timeline.removeFrames(base_string.length);
	
	lock_layers("restore")
}