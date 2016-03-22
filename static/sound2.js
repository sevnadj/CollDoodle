// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();

var chord1 = audioCtx.createOscillator();
var chord2 = audioCtx.createOscillator();
var chord3 = audioCtx.createOscillator();

var gainNode = audioCtx.createGain();
var gainNode2 = audioCtx.createGain();

// connect oscillator to gain node to speakers

oscillator.connect(gainNode);

chord1.connect(gainNode2);
chord2.connect(gainNode2);
chord3.connect(gainNode2);

gainNode.connect(audioCtx.destination);
gainNode2.connect(audioCtx.destination);

gainNode.gain.value = 0.04
gainNode2.gain.value = 0.04

// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02;

var initialFreq = 3000;
var initialVol = 0.001;

var scale = [130.813, 146.832, 164.814, 174.614, 195.998, 220.000, 246.942, 261.626, 293.665, 329.628];

// set options for the oscillator

oscillator.type = 'triangle';
oscillator.frequency.value = scale[0]; // value in hertz
oscillator.detune.value = 0; // value in cents
oscillator.start(0);

chord1.type = 'sine';
chord1.frequency.value = scale[0] * 2
chord1.detune.value = 0; // value in cents
chord1.start(0);

chord2.type = 'sine';
chord2.frequency.value = scale[2] * 2
chord2.detune.value = 0; // value in cents
chord2.start(0);

chord3.type = 'sine';
chord3.frequency.value = scale[4] * 2
chord3.detune.value = 0; // value in cents
chord3.start(0);

oscillator.onended = function() {
 console.log('Your tone has now stopped playing!');
}

//gainNode.gain.value = initialVol;

// Mouse pointer coordinates

var CurX;
var CurY;

var notesByKeyCode = [{
    noteName: 'c4',
    frequency: 261.6,
    keyName: 'a'
  },{
    noteName: 'd4',
    frequency: 293.7,
    keyName: 's'
  },{
    noteName: 'e4',
    frequency: 329.6,
    keyName: 'd'
  },{
    noteName: 'f4',
    frequency: 349.2,
    keyName: 'f'
  },{
    noteName: 'g4',
    frequency: 392,
    keyName: 'g'
  },{
    noteName: 'a4',
    frequency: 440,
    keyName: 'h'
  },{
    noteName: 'b4',
    frequency: 493.9,
    keyName: 'j'
  },{
    noteName: 'c5',
    frequency: 523.3,
    keyName: 'k'
  },{
    noteName: 'd5',
    frequency: 587.3,
    keyName: 'l'
  },{
    noteName: 'e5',
    frequency: 659.3,
    keyName: ';'
  },
  {
    noteName: 'e5',
    frequency: 659.3,
    keyName: ';'
  }
];


function updateSound(mouse_x, mouse_y) {
    KeyFlag = false;
    oscillator.connect(gainNode);

    //var select = notesByKeyCode[Math.floor(mouse_x / WIDTH * 10)].frequency;

    //oscillator.frequency.value = select;
    
    CurX = mouse_x;
    CurY = mouse_y;
    
    temp = CurX/WIDTH
    val = 0
    
    if (temp < 1/8)
		val = scale[0] * 2;
	else if (temp < 2/8)
		val = scale[1] * 2;
	else if (temp < 3/8)
		val = scale[2] * 2;
	else if (temp < 4/8)
		val = scale[3] *2;
	else if (temp < 5/8)
		val = scale[4] *2;
	else if (temp < 6/8)
		val = scale[5] *2;
	else if (temp < 7/8)
		val = scale[6] *2;
	else
		val = scale[7] *2;
	
	oscillator.frequency.value = val;
    
    temp2 = CurY/HEIGHT;
	
	if (temp2 < 1/3) {
		chord1.frequency.value = scale[4] * 2
		chord2.frequency.value = scale[6] * 2
		chord3.frequency.value = scale[8] * 2
	}
	else if (temp2 < 2/3) {
		chord1.frequency.value = scale[1] * 2
		chord2.frequency.value = scale[3] * 2
		chord3.frequency.value = scale[5] * 2
	}
	else {
		chord1.frequency.value = scale[0] * 2
		chord2.frequency.value = scale[2] * 2
		chord3.frequency.value = scale[4] * 2
	}
}

var timer;
document.body.onmousemove = function(prop){
  
  clearTimeout(timer);

  timer = setTimeout(function() {
    oscillator.disconnect();
  }, 100);
  

  updateSound(prop.clientX, prop.clientY);
};
