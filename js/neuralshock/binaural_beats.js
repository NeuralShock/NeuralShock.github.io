
var audio_context
var channel_merger
// TODO:  make enum for left/right, but will be useful in future iterations.
var oscillator_left
var gain_left
var oscillator_right
var gain_right
var has_started  = false
var is_playing   = false

function init_binaural_beats() {
    // Create the context, this is the output node fot he audio node
    audio_context = new AudioContext()

    channel_merger = audio_context.createChannelMerger(2)
    channel_merger.connect(audio_context.destination)

    /**********************************
     * Left
     */
    oscillator_left  = audio_context.createOscillator();
    oscillator_left.wave='sine';            // Create a sine wave
    oscillator_left.frequency.value=88;     // 440 = 'A'

    gain_left        = audio_context.createGain();
    gain_left.gain.value  = 1.0
    gain_left.connect(channel_merger, 0, 0)

    // Wire up the sound graph.
    oscillator_left.connect(gain_left);

    /**********************************
     * Right
     */
    oscillator_right  = audio_context.createOscillator();
    oscillator_right.wave='sine';            // Create a sine wave
    oscillator_right.frequency.value=96;     // 440 = 'A'

    gain_right = audio_context.createGain();
    gain_right.gain.value = 1.0;

    // Wire up the sound graph.
    oscillator_right.connect(gain_right);
    gain_right.connect(channel_merger, 0, 1)
}  

function binaural_beats_play() {
    console.log("Binaural Beats Play")
    if (!has_started) {
        oscillator_left.start();
        oscillator_right.start();
        has_started = true;
    }
    oscillator_left.connect(gain_left)
    oscillator_right.connect(gain_right)
}


function binaural_beats_stop() {
    console.log("Binaural Beats Stop")
    oscillator_left.disconnect(gain_left)
    oscillator_right.disconnect(gain_right)
//    oscillator_left.stop();
}


function binaural_beats_set_left_frequency(f) {
//    console.log("Binaural Beats Left Frequency = " + f.value)
    oscillator_left.frequency.value = f.value;
}

function binaural_beats_set_left_gain(g) {
    gain_left.gain.value = g.value;
}

function binaural_beats_set_right_frequency(f) {
//    console.log("Binaural Beats Left Frequency = " + f.value)
    oscillator_right.frequency.value = f.value;
}
    
function binaural_beats_set_right_gain(g) {
    gain_right.gain.value = g.value;
}
    