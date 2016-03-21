// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator and gain node
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// connect oscillator to gain node to speakers

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 0.02;

var initialFreq = 3000;
var initialVol = 0.001;

// set options for the oscillator

oscillator.type = 'triangle';
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.detune.value = 100; // value in cents
oscillator.start(0);

oscillator.onended = function() {
 console.log('Your tone has now stopped playing!');
}

gainNode.gain.value = initialVol;

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
    oscillator.connect(gainNode);
    KeyFlag = false;

    var select = notesByKeyCode[floor(mouse_x / WIDTH * 10)].frequency;

    oscillator.frequency.value = select;
    gainNode.gain.value = maxVol;
    //gainNode.gain.value = (mouse_y/HEIGHT) * maxVol;
}

var timer;
document.body.onmousemove = function(prop){
  clearTimeout(timer);

  timer = setTimeout(function() {
    oscillator.disconnect();
  }, 100);

  updateSound(prop.clientX, prop.clientY);
};
