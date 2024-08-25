const sendBtn = document.querySelector(".chat-input span");
const textBox = document.querySelector(".chat-input textarea");
const chatContainer = document.querySelector(".chatbox");

let user = { message: "" };
const inputInitHeight = textBox.scrollHeight;

const responses = [
  { message: "hola", response: "¡Hola! ¿Cómo estás?" },
  { message: "adios", response: "¡Adiós! Que tengas un buen día." },
  { message: "como estas", response: "Estoy bien, gracias por preguntar." },
  {
    message: "que puedes hacer",
    response: "Puedo responder a tus preguntas básicas.",
  },
];

const sendMessage = (messageText, className) => {
  //Crear un elemento <li> con su mensaje y clase
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  messageElement.innerHTML = chatContent;
  messageElement.querySelector("p").textContent = messageText;

  //Agregar el mensaje del usuario al chatbox
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const handleChat = () => {
  if (textBox.value == "") {
    alert("Escriba un mensaje, por favor");
  } else {
    let messageText = textBox.value;
    user.message = messageText;
    sendMessage(messageText, "outgoing");
    processMessage();
  }
  textBox.value = "";
  textBox.style.height = `${inputInitHeight}px`;
};

const processMessage = () => {
  if (user.message.length > 3) {
    let result = responses.filter((val) =>
      val.message.includes(user.message.toLocaleLowerCase())
    );
    if (result.length > 0) {
      let response = result[0].response;
      setTimeout(() => {
        sendMessage(response, "incoming");
      }, 1000);
    } else {
      setTimeout(() => {
        sendMessage("No te endiendo", "incoming");
      }, 1000);
    }
  } else {
    setTimeout(() => {
      sendMessage("No te endiendo", "incoming");
    }, 1000);
  }
};

textBox.addEventListener("input", () => {
  //Ajustar la altura del input textarea con base en su contenido
  textBox.style.height = `${inputInitHeight}px`;
  textBox.style.height = `${textBox.scrollHeight}px`;
});

textBox.addEventListener("keydown", (e) => {
  //Si la tecla Enter es presiondada sin la tecla Shift, envia el chat
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

sendBtn.addEventListener("click", handleChat);
