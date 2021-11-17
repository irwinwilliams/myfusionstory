var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//var numbers = ["archion", "covigne", "chanolo", "paragrant", "breezy", "alpha"];
var numbers = ["arch", "cov", "chan", "para", "breeze", "alpha"];
var grammar =
  "#JSGF V1.0; grammar numbers; public <number> = " +
  numbers.join(" | ") +
  " ;";

var recognition;

//recognition.start();

document.body.onclick = function () {
  if (recognition === undefined) {
    recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      //console.log(event);
      var index = event.results[event.results.length - 1][0].transcript;
      var lowered = index.toLowerCase();
      if (lowered.indexOf("fusion") > -1) {
        console.log("Result received: " + index + ".");

        lowered = lowered.replace("fusion", "");
        lowered = lowered.trim();
        var xPos = activityDisplay[lowered];
        if (xPos) {
          var cameraPosition = cameraRig.attributes["position"].value;
          var pos = cameraPosition.split(" ");
          cameraRig.setAttribute("position", `${xPos} ${pos[1]} ${pos[2]}`);
        }
      }
      //console.log('Confidence: ' + event.results[0][0].confidence);
      //recognition.start();
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onnomatch = function (event) {
      console.log("I didnt recognize that color.");
    };

    recognition.onerror = function (event) {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.start();

    console.log("Ready to receive a color command.");
  }
};
