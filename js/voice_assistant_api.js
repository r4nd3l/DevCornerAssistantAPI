// Voice recognition app
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Different types of scenarios - Possible answers of topics
const greetings = [
  'Welcome back',
  'How are you doing',
  'Nice to see you again'
];

const weather = [
  'Weather is fine',
  'It is getting cold',
  'The sun is bright'
];

// Later task - Remember the allowance settings
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Checking the console log
recognition.onstart = function(){
  console.log('Voice assistan API is loaded, ready to use!');
};

// Write out the message
recognition.onresult = function(event){
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;
  content.textContent = transcript + "?";
  readOutLoud(transcript);
};

// Add the listener to the btn
btn.addEventListener('click', () => {
  recognition.start();
});

// Read out the message
function readOutLoud(message){
  const speech = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  const mistake = 'Sorry, I did\'t catch that. Could you say it again?';

  speech.text = mistake;

  // If the text -how are you- is't mentioned in the sentence, the assistant will get it as a 'mistake'
  if(message.includes('how are you')){
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  // the list of the available voices - https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
  speech.voice = voices[1];
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
