const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

let voices = [];


function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();
  
      if (aname < bname) {
        return -1;
      } else if (aname == bname) {
        return 0;
      } else {
        return +1;
      }
    });
    const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " -- DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
}
  
  populateVoiceList();
  
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  


function select_voice() {
}


function tts_play() {
    console.log("Play");

    const utterThis = new SpeechSynthesisUtterance(document.getElementById("tts_text").value);
    utterThis.voice = voices[voiceSelect.value];
    utterThis.rate=document.getElementById("voice_rate").value; // TODO:  Make this configurable.
    utterThis.addEventListener("end", (event) => { 
            if (document.getElementById("tts_loop_checkbox").checked) {
                tts_play();
            }
        });
    synth.speak(utterThis);
}


function tts_stop() {
    console.log("Stop");
    window.speechSynthesis.cancel();
}


function tts_adjust_rate(r) {
    console.log("Rate");
    utterThis.rate=r.value
}


function tts_adjust_pitch(p) {
    console.log("Pitch");

}