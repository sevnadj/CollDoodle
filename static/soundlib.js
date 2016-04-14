
// note values in hertz starting at C3

notes = [130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998, 207.652, 220.000, 233.082, 246.942, 261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994];

// Returns a random integer between min (included) and max (included)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createInst() {
	var inst  = {buf1: null, buf2: null, buf3: null, buf4: null, buf5: null};
	inst.buf1 = {buf: null}; inst.buf2 = {buf: null};
	inst.buf3 = {buf: null}; inst.buf4 = {buf: null};
	inst.buf5 = {buf: null};
	return inst;
}

function initInst(inst, bank, context) {
	if (bank === "airy") {
		loadSound(inst.buf1, 'static/sounds/bpb_mini_ana/airy_keys/c3.mp3', context);
		loadSound(inst.buf2, 'static/sounds/bpb_mini_ana/airy_keys/e3.mp3', context);
		loadSound(inst.buf3, 'static/sounds/bpb_mini_ana/airy_keys/gs3.mp3', context);
		loadSound(inst.buf4, 'static/sounds/bpb_mini_ana/airy_keys/c4.mp3', context);
		loadSound(inst.buf5, 'static/sounds/bpb_mini_ana/airy_keys/e4.mp3', context);
	}
	else if (bank === "box") {
		loadSound(inst.buf1, 'static/sounds/bpb_mini_ana/box/c3.mp3', context);
		loadSound(inst.buf2, 'static/sounds/bpb_mini_ana/box/e3.mp3', context);
		loadSound(inst.buf3, 'static/sounds/bpb_mini_ana/box/gs3.mp3', context);
		loadSound(inst.buf4, 'static/sounds/bpb_mini_ana/box/c4.mp3', context);
		loadSound(inst.buf5, 'static/sounds/bpb_mini_ana/box/e4.mp3', context);
	}
	else if (bank === "vhs") {
		loadSound(inst.buf1, 'static/sounds/bpb_mini_ana/vhs/c3.mp3', context);
		loadSound(inst.buf2, 'static/sounds/bpb_mini_ana/vhs/e3.mp3', context);
		loadSound(inst.buf3, 'static/sounds/bpb_mini_ana/vhs/gs3.mp3', context);
		loadSound(inst.buf4, 'static/sounds/bpb_mini_ana/vhs/c4.mp3', context);
		loadSound(inst.buf5, 'static/sounds/bpb_mini_ana/vhs/e4.mp3', context);
	}
}

var loaded = 0;

function loadSound(buf_obj, url, context) {
  
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
			buf_obj.buf = buffer;
			loaded += 1;
		});
	}
	request.send();
}

function loadSoundLoop(buf_obj, url, context, node) {
  
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
			buf_obj.buf = buffer;
			
			var source = context.createBufferSource();
			source.buffer = buffer;
			source.connect(node);

			source.loop = true;
			source.start(0);
		});
	}
	request.send();
}

function playNote(inst, context, note, tick, node) {
	if (play === 0) {
		return;
	}
	
	var rate = 0;
	
	if (note < 4) {
		rate = notes[note] / notes[0];
		playSound(inst.buf1.buf, context, rate, tick, node);
	}
	else if (note < 8) {
		rate = notes[note] / notes[4];
		playSound(inst.buf2.buf, context, rate, tick, node);
	}
	else if (note < 12) {
		rate = notes[note] / notes[8];
		playSound(inst.buf3.buf, context, rate, tick, node);
	}
	else if (note < 16) {
		rate = notes[note] / notes[12];
		playSound(inst.buf4.buf, context, rate, tick, node);
	}
	else if (note < 20) {
		rate = notes[note] / notes[16];
		playSound(inst.buf5.buf, context, rate, tick, node);
	}
}

function playSound(buffer, context, rate, tick, node) {
	if (loaded < 15) {
		return;
	}

	var source = context.createBufferSource();
	source.buffer = buffer;
	//source.connect(context.destination);
	source.connect(node);
		
	source.playbackRate.value = rate;
	source.start(0);
	timer = setTimeout(function() {
		source.stop();
	}, tick+100); 	// tick = time division
}

function updateChordVals(x, y, progType, chordVals) {
	var lead = 0;
	var chord1 = 0;
	var chord2 = 0;
	var chord3 = 0;
	
	if(progType === 0) {
		// 1 2m 5
		
		if (x < 1/8)
			lead = 0;
		else if (x < 2/8)
			lead = 2;
		else if (x < 3/8)
			lead = 4;
		else if (x < 4/8)
			lead = 5;
		else if (x < 5/8)
			lead = 7;
		else if (x < 6/8)
			lead = 9;
		else if (x < 7/8)
			lead = 11;
		else
			lead = 12;

		if (y < 1/3) {
			chord1 = 0;
			chord2 = 4;
			chord3 = 7;
		}
		else if (y < 2/3) {
			chord1 = 2;
			chord2 = 5;
			chord3 = 9;
		}
		else {
			chord1 = 7;
			chord2 = 11;
			chord3 = 14;
		}
	}
	else if(progType === 1) {
		// 1 4 5 6m
		
		if (x < 1/8)
			lead = 0;
		else if (x < 2/8)
			lead = 2;
		else if (x < 3/8)
			lead = 4;
		else if (x < 4/8)
			lead = 5;
		else if (x < 5/8)
			lead = 7;
		else if (x < 6/8)
			lead = 9;
		else if (x < 7/8)
			lead = 11;
		else
			lead = 12;

		if (y < 1/4) {
			chord1 = 0;
			chord2 = 4;
			chord3 = 7;
		}
		else if (y < 2/4) {
			chord1 = 5;
			chord2 = 9;
			chord3 = 12;
		}
		else if (y < 3/4) {
			chord1 = 7;
			chord2 = 11;
			chord3 = 14;
		}
		else {
			chord1 = 9;
			chord2 = 12;
			chord3 = 16;
		}
	}
	else if(progType === 2) {
		// 1 3 4 5
		
		if (x < 1/8)
			lead = 0;
		else if (x < 2/8)
			lead = 3;
		else if (x < 3/8)
			lead = 5;
		else if (x < 4/8)
			lead = 7;
		else if (x < 5/8)
			lead = 10;
		else if (x < 6/8)
			lead = 12;
		else if (x < 7/8)
			lead = 15;
		else
			lead = 17;

		if (y < 1/4) {
			chord1 = 0;
			chord2 = 4;
			chord3 = 7;
		}
		else if (y < 2/4) {
			chord1 = 3;
			chord2 = 7;
			chord3 = 10;
		}
		else if (y < 3/4) {
			chord1 = 5;
			chord2 = 9;
			chord3 = 12;
		}
		else {
			chord1 = 7;
			chord2 = 11;
			chord3 = 14;
		}
	}
	else if(progType === 3) {
		// 1m 4 5m 6
		
		if (x < 1/8)
			lead = 0;
		else if (x < 2/8)
			lead = 2;
		else if (x < 3/8)
			lead = 3;
		else if (x < 4/8)
			lead = 5;
		else if (x < 5/8)
			lead = 7;
		else if (x < 6/8)
			lead = 8;
		else if (x < 7/8)
			lead = 10;
		else
			lead = 12;

		if (y < 1/4) {
			chord1 = 0;
			chord2 = 3;
			chord3 = 7;
		}
		else if (y < 2/4) {
			chord1 = 5;
			chord2 = 9;
			chord3 = 12;
		}
		else if (y < 3/4) {
			chord1 = 7;
			chord2 = 10;
			chord3 = 14;
		}
		else {
			chord1 = 8;
			chord2 = 12;
			chord3 = 15;
		}
	}
	
	chordVals.lead_ = lead;
	chordVals.chord1_ = chord1;
	chordVals.chord2_ = chord2;
	chordVals.chord3_ = chord3;
	
}









