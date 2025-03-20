// Pega os elementos DOM
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");

// Define possíveis imagens e resultados
const botImages = ["img/rock.png", "img/paper.png", "img/scissors.png"];
const outcomes = {
  RR: "Draw",
  RP: "BOT",
  RS: "Você",
  PP: "Draw",
  PR: "Você",
  PS: "BOT",
  SS: "Draw",
  SR: "BOT",
  SP: "Você"
};

// Manipulador de eventos para clique em imagem
function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);

  // Redefinir os resultados e exibir "Espere ..."
  userResult.src = botResult.src = "img/rock.png";
  result.textContent = "Espere...";

  // Ativar imagem clicada e desativar outros
  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    // Define imagens de usuário e bot
    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;

    const randomNumber = Math.floor(Math.random() * botImages.length);
    const botImageSrc = botImages[randomNumber];
    botResult.src = botImageSrc;

    // Determina o resultado
    const userValue = ["R", "P", "S"][clickedIndex];
    const botValue = ["R", "P", "S"][randomNumber];
    const outcomeKey = userValue + botValue;
    const outcome = outcomes[outcomeKey] || "Unknown";

    // Exibe o resultado
    result.textContent = userValue === botValue ? "Empate!" : `${outcome} Ganhou!`;
  }, 2500);
}

// Anexa os ouvintes de eventos às imagens de opção
optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});