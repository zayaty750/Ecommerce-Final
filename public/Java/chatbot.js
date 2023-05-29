var sendBtn = document.getElementById("sendBtn");
var textbox = document.getElementById("textbox");
var chatContainer = document.getElementById("chatContainer");
var user = { message: "" };

var arrayOfPossibleMessage = [
  { message: "hi", response: "hello" },
  { message: "how are you?", response: "good" },
  { message: "what is your name?", response: "I'am a chatbot!" },
  { message: "what is blankoo", response: "Ecommerce website" },
  { message: "who made it?", response: "zeyad ,mark,mervat,nour and robert" },
];

//the message will displayed in a span and the span will displayed into a div and the div will be displayed in the chat container
function sendMessage(userMessage) {
  var messageElement = document.createElement("div");
  messageElement.style.textAlign = "right";
  messageElement.style.margin = "10px";

  messageElement.innerHTML =
    "<span> You: </span>" + "<span>" + userMessage + "</span>";

  chatContainer.appendChild(messageElement);
}

function chatbotResponse(userMessage) {
  var chatbotmessage = "";

  if (userMessage.length > 5 || userMessage == "hi") {
    var result = arrayOfPossibleMessage.filter((val) =>
      val.message.includes(userMessage.toLowerCase())
    );
    if (result.length > 0) {
      var response = result[0].response;
      chatbotmessage = response;
    } else {
      chatbotmessage = "please send another message";
    }
  } else {
    chatbotmessage = "please send a different message !";
  }

  var messageElement = document.createElement("div");
  messageElement.innerHTML =
    "<span> Chatbot: </span>" + "<span>" + chatbotmessage + "</span>";

  setTimeout(() => {
    messageElement.animate(
      [{ easing: "ease-in", opacity: 0.4 }, { opacity: 1 }],
      { duration: 500 }
    );
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 600);
}

sendBtn.addEventListener("click", function (e) {
  var userMessage = textbox.value;

  if (userMessage == "") {
    alert("Please type in a message");
  } else {
    //btsheel el msafat momken ashelha
    let userMessageText = userMessage.trim();
    user.message = userMessageText;
    textbox.value = "";
    sendMessage(userMessageText);
    chatbotResponse(userMessageText);
  }
});
