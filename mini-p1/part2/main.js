let quizData = []; 
let counter = 0;
let score = 0;
let sec = 15;
let min = 0;
let span = document.createElement('span');
span.style.margin = "5px";

function fetchQuestions() {
    let quizLink = document.getElementById("quizLink").value;

    if (!quizLink) {
        alert("Please enter a quiz link!");
        return;
    }

    fetch(quizLink)
        .then(response => response.json())
        .then(data => {
            quizData = data.questions;
            generateQuiz(); 
        })
        .catch(error => console.error("Error fetching quiz:", error));
}

function generateQuiz() {
    let contentDiv = document.querySelector(".content");
    contentDiv.innerHTML = ''; 

    quizData.forEach((q, index) => {
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("containers");
        if (index !== 0) questionDiv.hidden = true; 

        let questionText = document.createElement("p");
        questionText.classList.add("questions");
        questionText.textContent = q.question;

        questionDiv.appendChild(questionText);

        q.options.forEach(option => {
            let input = document.createElement("input");
            input.type = "checkbox";
            input.name = `q${index + 1}`;
            input.value = option.correct ? "true" : "false";
            input.classList.add("inputs");

            let label = document.createElement("label");
            label.textContent = option.text;

            questionDiv.appendChild(input);
            questionDiv.appendChild(label);
        });

        contentDiv.appendChild(questionDiv);
    });

    document.getElementById("api-form").hidden = true;
    startButton.removeAttribute("hidden");
}


function timer(m, s) {
    if (s < 10) return `0${m}:0${s}`;
    return `0${m}:${s}`;
}
function start() {
    startButton.setAttribute("hidden", "");
    sec = 15;
    min = 0;
    span.textContent = timer(min, sec);

    let containers = document.querySelectorAll('.containers');
    let questions = document.querySelectorAll('.questions');

    if (questions[counter]) {
        questions[counter].appendChild(span);
        containers[counter].removeAttribute("hidden"); 
    }

    function chrono() {
        span.textContent = timer(min, sec);
        sec--;

        if (sec < 0) {
            checkAnswers();
            goNext();
        }
    }

    function goNext() {
        sec = 15;
        if (counter < containers.length - 1) {
            containers[counter].setAttribute("hidden", ""); 
            counter++;
            containers[counter].removeAttribute("hidden"); 
            questions[counter].appendChild(span);
        } else {
            clearInterval(timing);
            alert(`Quiz finished! Your final score is ${score}`);
        }
    }

    function checkAnswers() {
        let inputs = containers[counter].querySelectorAll(".inputs"); 
        let correctSelected = true;

        inputs.forEach(input => {
            if (input.value === "true" && !input.checked) correctSelected = false; 
            if (input.value === "false" && input.checked) correctSelected = false; 
        });

        if (correctSelected) {
            score += 10;
        }

        scoreDisplay.textContent = `Score : ${score}`;
    }

    chrono();
    let timing = setInterval(chrono, 1000);
}
