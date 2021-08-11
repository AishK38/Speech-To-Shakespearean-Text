var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition()
var content = ""
var instructions = $("#instructions")
var txtInput = $("#text-input")

var btnTranslate = document.querySelector("#btn-translate")
var output = document.querySelector("#output")
var serverURL = "https://api.funtranslations.com/translate/shakespeare.json"

btnTranslate.addEventListener("click", function clickHandler(){
    fetch(getTranslatedtext(content))
      .then(response => response.json())
      .then(json => {
          var translatedText = json.contents.translated
          output.innerText = translatedText
      })
      .catch(errorHandler)
})
function errorHandler(error) {
    console.log("error occured", error);
    alert("Sorry, something wrong with server! Please try again after some time")
}
function getTranslatedtext(input) {
    return serverURL + "?" + "text=" + input
}
recognition.continuous = true;

recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    content += transcript
    txtInput.val(content);
}

$("#btn-start").click(function(event) {
    if(content.length){
        content += ""
    }
    recognition.start()
})

txtInput.on('input', function(){
    content = $(this).val()
})


