// DOM Elements 
let questions = document.querySelectorAll('.questions');
let containers = document.querySelectorAll('.containers');
let startButton = document.querySelector(".start");
let scoreDisplay = document.querySelector(".score"); // Select score display

let counter = 0;
let score = 0;
let sec = 15;
let min = 0;
let span = document.createElement('span');
span.style.margin = "5px";

function timer(m, s) {
    if (s < 10) return `0${m}:0${s}`;
    return `0${m}:${s}`;
}

function start() {
    startButton.setAttribute("hidden", "");
    sec = 15;
    min = 0;
    span.textContent = timer(min, sec);

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
