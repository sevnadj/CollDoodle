
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var gainNode = audioCtx.createGain();
var gainNode2 = audioCtx.createGain();
var gainNode3 = audioCtx.createGain();



var tuna = new Tuna(audioCtx);

var delay = new tuna.Delay({
    feedback: 0.65,    //0 to 1+
    delayTime: 200,    //how many milliseconds should the wet signal be delayed?
    wetLevel: 0.7,    //0 to 1+
    dryLevel: 1,       //0 to 1+
    cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});

var phaser = new tuna.Phaser({
    rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3,                    //0 to 1
    feedback: 0.2,                 //0 to 1+
    stereoPhase: 30,               //0 to 180
    baseModulationFrequency: 700,  //500 to 1500
    bypass: 0
});

var filter = audioCtx.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 1000;
filter.Q.value = 14;

var filter2 = audioCtx.createBiquadFilter();
filter2.type = "lowpass";
filter2.frequency.value = 2000;
filter2.Q.value = 4;

//gainNode 3 -> lead, gainNode -> chords, gainNode2 -> ambience

var soundsRand = getRandomInt(0, 2);
//var soundsRand = 1;

leadSound = "";
chordSound = "";

if (soundsRand === 0) {
	leadSound = "airy";
	chordSound = "vhs";
	gainNode3.gain.value = 0.9;
	gainNode.gain.value = 1.2;
}
else if (soundsRand === 1) {
	leadSound = "vhs";
	chordSound = "box";
	gainNode3.gain.value = 1.3;
	gainNode.gain.value = 1.1;

}
else {
	leadSound = "box";
	chordSound = "vhs";
	gainNode3.gain.value = 1.2;
	gainNode.gain.value = 1.4;
}

var leadInst = createInst();
initInst(leadInst, leadSound, audioCtx);

var chInst1 = createInst();
initInst(chInst1, chordSound, audioCtx);

var chInst2 = createInst();
initInst(chInst2, chordSound, audioCtx);

var chInst3 = createInst();
initInst(chInst3, chordSound, audioCtx);

var ambience = { buf: null };

//var ambRand = getRandomInt(0, 2);
var ambRand = 0;

if (ambRand === 0) {
	loadSoundLoop(ambience, "static/sounds/ambient/nature.mp3", audioCtx, gainNode2);
	gainNode2.gain.value = 5.5;
}
else if (ambRand === 1) {
	loadSoundLoop(ambience, "static/sounds/ambient/water1.wav", audioCtx, gainNode2);
	gainNode2.gain.value = 0.9
}
else {
	loadSoundLoop(ambience, "static/sounds/ambient/water2.wav", audioCtx, gainNode2);
	gainNode2.gain.value = 2.5;
}

gainNode.connect(delay);
gainNode3.connect(delay);
delay.connect(filter2);
//filter2.connect(phaser);
//phaser.connect(audioCtx.destination);
filter2.connect(audioCtx.destination);

gainNode2.connect(filter);
filter.connect(audioCtx.destination);

gainNode.gain.value = 0.6;

var lead;
var chord1;
var chord2;
var chord3;

var CurX;
var CurY; 

var chordVals = {};

var chordRand = getRandomInt(0, 3);

function updateSound(mouse_x, mouse_y) {
  
    CurX = mouse_x;
    CurY = mouse_y;
    
    temp = CurX/WIDTH;
    temp2 = CurY/HEIGHT;
    
    updateChordVals(temp, temp2, chordRand, chordVals);
}

var play = 1;
var timer;
var tick = 1000;

document.body.onmousemove = function(prop) {	
	
	temp = prop.clientX/WIDTH;
    temp2 = prop.clientY/HEIGHT;

    filter.frequency.value = 1000 + (temp * 1000);
    filter2.frequency.value = 2200 - (temp2 * 1000);
	
	if (play === 1) {
		
		updateSound(prop.clientX, prop.clientY);
		
		playNote(leadInst, audioCtx, chordVals.lead_, tick, gainNode3);
		playNote(chInst1, audioCtx, chordVals.chord1_, tick, gainNode);
		playNote(chInst2, audioCtx, chordVals.chord2_, tick, gainNode);
		playNote(chInst3, audioCtx, chordVals.chord3_, tick, gainNode);		
		
		play = 0;
		
		timer2 = setTimeout(function() {
			play = 1;
		}, tick); 	// tick = time division
		
	}
};
