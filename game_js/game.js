const engines = [
    { sound: "sounds/1JZ-GTE.mp3", name: "1JZ-GTE"},
    { sound: "sounds/SR20DET.mp3", name: "SR20DET"},
    { sound: "sounds/M16A.mp3", name: "M16A"},
    { sound: "sounds/EJ20.mp3", name: "EJ20"},
    { sound: "sounds/13B-REW.mp3", name: "13B-REW(ロータリー)"},
    { sound: "sounds/3S-GE.mp3", name: "3S-GE"},
    { sound: "sounds/4G63.mp3", name: "4G63"},
    { sound: "sounds/BP-ZE.mp3", name: "BP-ZE"},
    { sound: "sounds/CA18DE.mp3", name: "CA18DE"},
    { sound: "sounds/F22C.mp3", name: "F22C"},
    { sound: "sounds/Rb20de.mp3", name: "RB20DE"},
    { sound: "sounds/VQ35DE.mp3", name: "VQ35DE"}
];

let currentAnswer = null;
let audio = null;
const correctSound = new Audio("sounds/correct.mp3");
const incorrectSound = new Audio("sounds/incorrect.mp3");
let questionCount = 0;
let correctCount = 0;
const maxQuestions = 5;

// start>countdown

document.getElementById("startBtn").onclick = () => {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("countdownScreen").style.display = "block";

    let count = 3;
    const countdownEl = document.getElementById("countdown");
    countdownEl.textContent = count;

    const timer = setInterval(() => {
        count--;
        if(count > 0){
            countdownEl.textContent = count;
        } else {
            clearInterval(timer);
            document.getElementById("countdownScreen").style.display = "none";
            document.getElementById("gameScreen").style.display = "block";
            questionCount = 0;
            correctCount = 0;
            newQuestion();         
        }
    }, 1000);
};

function newQuestion() {
    questionCount++;
    if(questionCount > maxQuestions) {
        endGame();
        return;
    }

    if(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    const answerIndex = Math.floor(Math.random() * engines.length);
    currentAnswer = engines[answerIndex];

    let choices = shuffle([...engines]).slice(0, 4);
        choices.push(currentAnswer);
    choices = shuffle(choices);

    const questionTitle = document.querySelector("#gameScreen h2");
    if (questionTitle) {
        questionTitle.textContent = `第${questionCount}問目 / ${maxQuestions}問中`;
    }

    const choiceDiv = document.getElementById("choices");
    choiceDiv.innerHTML = "";

    let answered = false;

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.name;
        btn.onclick = () => {
            if(!answered) {
                answered = true;
                checkAnswer(choice);
            }
        };
        choiceDiv.appendChild(btn);
    });
        audio = new Audio(currentAnswer.sound);
}

function checkAnswer(choice) {
    const result = document.getElementById("result");
    if(choice === currentAnswer) {
        result.textContent = "✅ 正解！";
        correctSound.currentTime = 0;
        correctSound.play();
        correctCount++;
    } else {
        result.textContent = `❌ 不正解。正解は ${currentAnswer.name}`;
        incorrectSound.currentTime = 0;
        incorrectSound.play();
    }

    setTimeout(newQuestion, 2000);
}

document.getElementById("playBtn").onclick = ()=>{
    if(audio) {
        audio.currentTime = 0;
        audio.play();
    }
};

document.getElementById("pauseBtn").onclick = ()=>{
    if(audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

function endGame() {
    document.getElementById("gameScreen").style.display = "none";
    if(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    const endDiv = document.createElement("div");
    endDiv.id = "endScreen";
    endDiv.innerHTML = `
        <h1>終了!</h1>
        <p>あなたは<strong>${correctCount}問</strong>正解しました。</p>
        <button onclick="location.reload()">もう一度遊ぶ</button>
        `;
    document.body.appendChild(endDiv);
}

function shuffle(array){
    const arr = [...array];
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}