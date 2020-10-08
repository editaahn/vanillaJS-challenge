const wordContainer = document.getElementById('wordContainer'),
  parts = document.querySelectorAll('.figure-part'),
  wrongList = document.getElementById('wrongList'),
  resetBtn = document.querySelector('button');

const wordList = ['javascript', 'home', 'watermelon', 'zombie', 'rectangle', 'ironman'];
let answer;
let incorrect = 0;

const drawWordLength = () => {
  answer = wordList[Math.floor(Math.random()*wordList.length)];
  wordContainer.innerHTML = '';
  for (const [i] of Array(answer.length).entries()){
    wordContainer.innerHTML += `<div class="char" id=char-${i}></div>`
  };
}
drawWordLength();


document.addEventListener('keydown', e => {
  //array로 바꿔서 배열로 index 넣기
  const correctIdx = [...answer].reduce((acc,curr,i) => {
    e.key.toLowerCase() == curr && acc.push(i);
    return acc;
  },[]);
  if (correctIdx.length == 0) { 
    wrongList.textContent += e.key+',';
    if (parts[incorrect]) {
      parts[incorrect].style.display = 'block' 
      incorrect++;
      (incorrect > parts.length-1) && 
        (document.querySelector('body').innerHTML += 
          `<h3>R.I.P.</h3>
          <button id="reset">reset</button>
          <button id="replay">replay</button>
          `
        )
    } 
  } else {
    correctIdx.forEach(i => 
      document.getElementById(`char-${i}`).textContent = answer[i]
    )
  }
})

document.addEventListener('click', e => {
  if (e.target.id == 'reset') {
    location.reload();
  } 
})