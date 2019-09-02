class Pitch {
    constructor(pitchName, octaveValue) {
        if(Pitch.allPitchNames.indexOf(pitchName) === -1) {
            throw new Error(`${pitchName} is invalid pitch name.`);
        }

        if(!Pitch.allOctaveValues.indexOf(octaveValue) === -1) {
            throw new Error(`${octaveValue} is invalid octave value.`);
        }

        this.octaveValue = octaveValue;
        this.pitchName = pitchName;
    }

    toString() {
        return this.pitchName + this.octaveValue;
    }

    get hz() {
        return Pitch.pitchToHzMap[this.toString()];
    }

    static allPitchNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    static allOctaveValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    static pitchToHzMap = (() => {
        const map = {};
        const a0Hz = 27.5;
        let hz = a0Hz;
        const frequencyRatio = Math.pow(2, 1 / 12);
        Pitch.allOctaveValues.forEach(octaveValue => {
            Pitch.allPitchNames.forEach(pitchName => {
                const pitch = pitchName + octaveValue;
                map[pitch] = hz;
                hz *= frequencyRatio;
            });
        });
        return map;
    })();
}

class PianoKey {
    constructor(audioContext, pitch) {
        this.audioContext = audioContext;
        this.pitch = pitch;

        this.isPlaying = false;
        this.oscillatorNode = null;
    }

    play(option) {
        if(this.isPlaying){
            return;
        }
        
        const gain = this.audioContext.createGain();
        gain.gain.value = 0.1;

        this.oscillatorNode = new OscillatorNode(this.audioContext, option);
        this.oscillatorNode.frequency.value = this.pitch.hz;
        this.oscillatorNode.type = option.type;
        this.oscillatorNode.connect(gain).connect(this.audioContext.destination);
        this.oscillatorNode.start();
        this.isPlaying = true;
    }

    stop() {
        if(!this.isPlaying) {
            return;
        }

        this.oscillatorNode.stop();
        this.isPlaying = false;
    }
}

window.onload = function() {  
    const audioContext = new AudioContext();

    const keyToPianoKey = new Map();
    keyToPianoKey["1"]  = new PianoKey(audioContext, new Pitch("B" , 3));
    keyToPianoKey["q"]  = new PianoKey(audioContext, new Pitch("C" , 3));
    keyToPianoKey["2"]  = new PianoKey(audioContext, new Pitch("C#", 3));
    keyToPianoKey["w"]  = new PianoKey(audioContext, new Pitch("D" , 3));
    keyToPianoKey["3"]  = new PianoKey(audioContext, new Pitch("D#", 3));
    keyToPianoKey["e"]  = new PianoKey(audioContext, new Pitch("E" , 3));
    keyToPianoKey["4"]  = new PianoKey(audioContext, new Pitch("F" , 3));
    keyToPianoKey["r"]  = new PianoKey(audioContext, new Pitch("F" , 3));
    keyToPianoKey["5"]  = new PianoKey(audioContext, new Pitch("F#", 3));
    keyToPianoKey["t"]  = new PianoKey(audioContext, new Pitch("G" , 3));
    keyToPianoKey["6"]  = new PianoKey(audioContext, new Pitch("G#", 3));
    keyToPianoKey["y"]  = new PianoKey(audioContext, new Pitch("A" , 4));
    keyToPianoKey["7"]  = new PianoKey(audioContext, new Pitch("A#", 4));
    keyToPianoKey["u"]  = new PianoKey(audioContext, new Pitch("B" , 4));
    keyToPianoKey["8"]  = new PianoKey(audioContext, new Pitch("C" , 4));
    keyToPianoKey["i"]  = new PianoKey(audioContext, new Pitch("C" , 4));
    keyToPianoKey["9"]  = new PianoKey(audioContext, new Pitch("C#", 4));
    keyToPianoKey["o"]  = new PianoKey(audioContext, new Pitch("D" , 4));
    keyToPianoKey["0"]  = new PianoKey(audioContext, new Pitch("D#", 4));
    keyToPianoKey["p"]  = new PianoKey(audioContext, new Pitch("E" , 4));
    keyToPianoKey["-"]  = new PianoKey(audioContext, new Pitch("F" , 4));
    keyToPianoKey["@"]  = new PianoKey(audioContext, new Pitch("F" , 4));
    keyToPianoKey["^"]  = new PianoKey(audioContext, new Pitch("F#", 4));
    keyToPianoKey["["]  = new PianoKey(audioContext, new Pitch("G" , 4));
    keyToPianoKey["\\"] = new PianoKey(audioContext, new Pitch("G#", 4));
    keyToPianoKey["a"]  = new PianoKey(audioContext, new Pitch("G#", 4));
    keyToPianoKey["z"]  = new PianoKey(audioContext, new Pitch("A" , 5));
    keyToPianoKey["s"]  = new PianoKey(audioContext, new Pitch("A#", 5));
    keyToPianoKey["x"]  = new PianoKey(audioContext, new Pitch("B" , 5));
    keyToPianoKey["d"]  = new PianoKey(audioContext, new Pitch("C" , 5));
    keyToPianoKey["c"]  = new PianoKey(audioContext, new Pitch("C" , 5));
    keyToPianoKey["f"]  = new PianoKey(audioContext, new Pitch("C#", 5));
    keyToPianoKey["v"]  = new PianoKey(audioContext, new Pitch("D" , 5));
    keyToPianoKey["g"]  = new PianoKey(audioContext, new Pitch("D#", 5));
    keyToPianoKey["b"]  = new PianoKey(audioContext, new Pitch("E" , 5));
    keyToPianoKey["h"]  = new PianoKey(audioContext, new Pitch("F" , 5));
    keyToPianoKey["n"]  = new PianoKey(audioContext, new Pitch("F" , 5));
    keyToPianoKey["j"]  = new PianoKey(audioContext, new Pitch("F#", 5));
    keyToPianoKey["m"]  = new PianoKey(audioContext, new Pitch("G" , 5));
    keyToPianoKey["k"]  = new PianoKey(audioContext, new Pitch("G#", 5));
    keyToPianoKey[","]  = new PianoKey(audioContext, new Pitch("A" , 6));
    keyToPianoKey["l"]  = new PianoKey(audioContext, new Pitch("A#", 6));
    keyToPianoKey["."]  = new PianoKey(audioContext, new Pitch("B" , 6));
    keyToPianoKey[";"]  = new PianoKey(audioContext, new Pitch("C" , 6));
    keyToPianoKey["/"]  = new PianoKey(audioContext, new Pitch("C" , 6));
    keyToPianoKey[":"]  = new PianoKey(audioContext, new Pitch("C#", 6));
    keyToPianoKey["\\"] = new PianoKey(audioContext, new Pitch("D" , 6));
    keyToPianoKey["]"]  = new PianoKey(audioContext, new Pitch("D#", 6));
    
    
    document.addEventListener("keydown", (event) => {
        const pianoKey = keyToPianoKey[event.key];
        if(pianoKey) {
            const type = document.getElementById("wave-type").value;
            pianoKey.play({type});
        }
    });

    document.addEventListener("keyup", (event) => {
        const pianoKey = keyToPianoKey[event.key];
        if(pianoKey) {
            pianoKey.stop();
        }
    });
}
