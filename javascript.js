const buttons = [
    document.querySelector("#btn1"),
    document.querySelector("#btn2"),
    document.querySelector("#btn3")
]
const libelle = ["Rock", "Paper", "Scissors"]
const images = ["img/pierre.png", "img/papier.png", "img/ciseaux.png"]

const userLibelle = document.querySelector("#userLibelle")
const computerLibelle = document.querySelector("#computerLibelle")

const userImage = document.querySelector("#userImage")
const computerImage = document.querySelector("#computerImage")

function playGame(rounds) {
    let scoreUser = 0;
    let scoreComputer = 0;
    let round = 0;

    // Function to manage each round
    function playRound(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            document.getElementById("messageBox").innerText = "EQUALITY!";
        } else if (
            (userChoice === "Rock" && computerChoice === "Scissors") ||
            (userChoice === "Paper" && computerChoice === "Rock") ||
            (userChoice === "Scissors" && computerChoice === "Paper")
        ) {
            document.getElementById("messageBox").innerText = "You've won!";
            scoreUser++;
        } else {
            document.getElementById("messageBox").innerText = "You've lost!";
            scoreComputer++;
        }

        document.getElementById("userScore").innerText = `${scoreUser}`;
        document.getElementById("computerScore").innerText = `${scoreComputer}`;
    }

    // Manage user and computer choices on click
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (round < rounds) {
                round++;

                // User choice
                const userChoiceText = libelle[index];
                userLibelle.innerHTML = userChoiceText;
                userImage.src = images[index];
                userImage.alt = userChoiceText;

                // Choice of computer
                const choixIndex = Math.trunc(Math.random() * libelle.length);
                const choixComputerText = libelle[choixIndex];
                computerLibelle.innerHTML = choixComputerText;
                computerImage.src = images[choixIndex];
                computerImage.alt = choixComputerText;

                // Comparison of choices
                playRound(userChoiceText, choixComputerText);

                // Check whether the specified number of revolutions has been reached
                if (round === rounds) {
                    if (scoreUser > scoreComputer) {
                        document.getElementById("messageBox").innerText = "User won !";
                    } else if (scoreUser < scoreComputer) {
                        document.getElementById("messageBox").innerText = "Computer won !";
                    } else {
                        document.getElementById("messageBox").innerText = "EQUAL!";
                    }

                    document.getElementById("scoreFinale").innerText = scoreUser + " - " + scoreComputer;

                    // Disable buttons at the end of the game
                    buttons.forEach(button => {
                        button.disabled = true;
                    });

                    // Display a message to replay or reset
                    document.getElementById("messageBox1").innerText = "Game over!";
                }
            }
        });
    });

    // Reset button for restarting the game
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", () => {
        round = 0;
        scoreUser = 0;
        scoreComputer = 0;

        // Reset text and images
        document.getElementById("userScore").innerText = `0`;
        document.getElementById("computerScore").innerText = `0`;
        document.getElementById("scoreFinale").innerText = "";
        document.getElementById("messageBox").innerText = "";
        document.getElementById("messageBox1").innerText = "";

        userLibelle.innerHTML = "";
        computerLibelle.innerHTML = "";
        userImage.src = "";
        computerImage.src = "";


        userLibelle.innerHTML = "";
        computerLibelle.innerHTML = "";

        // Reset images and ensure correct dimensions
        userImage.src = "img/blue.png";

        computerImage.src = "img/blue.png";

        // Reactivate buttons
        buttons.forEach(button => {
            button.disabled = false;
        });
    });
}

playGame(5);

// Fonction pour vérifier la taille de l'écran et changer le texte des boutons
function updateButtonText() {
    const bttn = document.getElementById('bttn')
    
    const btnX = document.getElementById('btn-x')
    btnX.style.display = 'flex'
    btnX.style.justifyContent = 'center'
    btnX.style.alignItems = 'center'
    
    const btn1 = document.getElementById('btn1');
    btn1.style.width = '100%'
    const btn2 = document.getElementById('btn2');
    btn2.style.width = '100%'
    const btn3 = document.getElementById('btn3');
    btn3.style.width = '100%'
    
    // Si l'écran a une largeur inférieure à 600px, utiliser des émojis
    if (window.innerWidth <= 768) {
        btn1.innerHTML = '<span class="emoji">🪨</span>'; // Rock
        btn2.innerHTML = '<span class="emoji">📃</span>'; // Paper
        btn3.innerHTML = '<span class="emoji">✂️</span>'; // Scissors
        bttn.style.background = 'none'
    } else {
        // Sinon, revenir aux noms des boutons normaux
        bttn.style.background = '#808080'
        btn1.textContent = 'Rock';
        btn2.textContent = 'Paper';
        btn3.textContent = 'Scissors';
    }
}

// Appeler la fonction à chaque redimensionnement de la fenêtre
window.addEventListener('resize', updateButtonText);

// Appeler la fonction une fois au chargement de la page
updateButtonText();
