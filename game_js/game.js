const engines = [
    { sound: "../sounds/engine1.mp3", name: "1JZ-GTE"}
]

let currentAnswer = null;
let audio = null;

function newQuestion() {
    const answerIndex = Math.floor(Math.random() * engines.length);
    currentAnswer = engines[answerIndex];

    const choices = shuffle([...engines]).slice(0,3);

    if(!choices.includes(currentAnswer)) {
        choices[0] = currentAnswer;
    }

    const choiceDiv = document.getElementById("choices");
    choiceDiv.innerHTML = "";
    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.name;
        btn.onclick = ()=> checkAnswer(choice);
        choiceDiv.appendChild(btn);
    });

    audio = new Audio(currentAnswer.sound);
}

function checkAnswer(choice) {
    const result = document.getElementById("result");
    if(choice === currentAnswer) {
        result.textContent = "正解";
    } else {
        result.textContent = `不正解。正解は ${currentAnswer.name}`;
    }

    setTimeout(newQuestion,2000);
}

document.getElementById("playBtn").onclick = ()=>{
    if(audio) {
        audio.currentTime = 0;
        audio.play();
    }
};

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

newQuestion();