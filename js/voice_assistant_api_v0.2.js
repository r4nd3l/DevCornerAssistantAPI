// Voice recognition app
const content = document.querySelector('.content');

function startAPI(){
  recognition.start();
}

// Different types of scenarios - Possible answers of topics
const greetings = [
  'Welcome back',
  'Nice to see you again',
  'I\'m doing fine, thanks for asking'
];

const weather = [
  'Weather is fine',
  'It is getting cold',
  'The sun is bright'
];


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Checking the console log
recognition.onstart = function(){
  console.log('Voice assistan API is activated!');
};

// Write out the message
recognition.onresult = function(event){
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
};

// Read out the message
function readOutLoud(message){
  const speech = new SpeechSynthesisUtterance();
  const mistake = 'Sorry, I did\'t catch that. Could you say it again?';

  speech.text = mistake;

  // If the text -how are you- is't mentioned in the sentence, the assistant will get it as a 'mistake'
  if(message.includes('how are you')){
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
