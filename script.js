var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition()
var txtInput = $("#text-input")
var content = ""
var instructions = $("#instructions")

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Listening..")
}

recognition.onspeechend = function() {
    instructions.text("Now click on the Translate button")
}

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
