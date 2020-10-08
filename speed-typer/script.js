let remain = 10;

const startSection = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const gameSection = document.getElementById("game");
const remainSec = document.getElementById("remainSec");
const word = document.getElementById("word");
const input = document.getElementById("input");
const score = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

const words = [
  "remain",
  "happiness",
  "javascript",
  "fault",
  "watermelon",
  "lager","character", "안녕하십니까", "망치", "현실적관점"
];
const getWord = () =>
  (word.innerText = words[Math.floor(Math.random() * words.length)]);

let scoreVar = 0;

startBtn.addEventListener("click", (e) => {
  startSection.style.display = 'none';
  gameSection.style.display = 'block';
  getWord();
  timerStarter();
});

restartBtn.addEventListener('click', e => {
  afterGame.style.display = 'none';
  gameSection.style.display = 'block';
  getWord();
  timerStarter();
  scoreVar = 0;
  score.textContent = scoreVar;
});


const examination = (e) => {
  if (e.target.value == word.innerText) {
    getWord();
    scoreVar++;
    score.textContent = scoreVar;
    remain += 3;
    e.target.value = '';
  }
};
input.oninput = examination;


const timerStarter = () => {
  const timer = setInterval(() => {
    remain -= 1;
    remainSec.innerText = remain;
    if (remain == 0) {
      clearInterval(timer);
      remain = 10;
      remainSec.innerText = remain;
      gameSection.style.display = 'none';
      afterGame.style.display = 'block';
      finalScore.innerText = scoreVar;
  }
  }, 1000);
}