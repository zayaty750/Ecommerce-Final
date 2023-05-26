var sendBtn=document.getElementById('sendBtn');
var textbox=document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var user={message:""};

var arrayOfPossibleMessage = [
    {message:"hi",response:"hello"},
    {message:"how are you?",response:"good"},
    {message:"what is your name?",response:"I'am a chatbot!"}
]

//the message will displayed in a span and the span will displayed into a div and the div will be displayed in the chat container
function sendMessage(userMessage){
    var messageElement = document.createElement('div');
    messageElement.style.textAlign="right";
    messageElement.style.margin="10px";
 
    messageElement.innerHTML="<span> You: </span>"+
                             "<span>" +userMessage+ "</span>";
 
     chatContainer.appendChild(messageElement);
 }