class cardList {
  static get CARDS_LIST_KEY() {
    return "CARDS";
  }
  constructor() {
    this.storageList = localStorage.getItem(cardList.CARDS_LIST_KEY);
    this.list = this.storageList ? JSON.parse(this.storageList) : [];
    this.card;
    this.getCardShown;
    this.cardContainer = document.getElementById("cardContainer");
    this.clearCardsBtn = document.getElementById("clearCardsBtn");
    this.clearAll();
    this.location = document.getElementById("location");
    this.leftBtn = document.getElementById('leftBtn');
    this.rightBtn = document.getElementById('rightBtn');
  }
  add(form) {
    this.list.forEach((v) => (v.show = false));
    const card = {
      front: form.frontText.value,
      back: form.backText.value,
      show: true,
      index: this.list.length,
    };
    this.list.push(card);
    localStorage.setItem(cardList.CARDS_LIST_KEY, JSON.stringify(this.list));
    form.reset();
    this.render();
    cardsForm.style.display = "none";
  }
  get getCardShown() {
    return this.list.findIndex((v) => v.show == true);
  }
  render() {
    const setSvgColor = (btn, condition) => {
      btn.querySelector("svg").setAttribute("fill", `${condition ? '#c0c0c0 ': '#000000'}`);
    }
    setSvgColor(this.clearCardsBtn, cards.list.length == 0);
    setSvgColor(this.leftBtn, (cards.list.length < 2 || cards.getCardShown == 0) );
    setSvgColor(this.rightBtn, (cards.list.length < 2 || cards.getCardShown == cards.list.length-1) );

    this.cardContainer.innerHTML = "";
    if (this.list.length > 0) {
      const i = cards.getCardShown;
      this.cardContainer.innerHTML += `<div id="${i}" class="card-inner">
        <p class="front-side">${this.list[i].front}</p>
        <p class="back-side">${this.list[i].back}</p>
      </div>`;
      this.location.textContent = `${i + 1} / ${this.list.length}`;
    } else {
      this.cardContainer.innerHTML += `<div class="card-null card-inner">
        <p class="front-side">질문을 등록하세요</p>
        <p class="back-side">답변을 등록하세요</p>
      </div>`;
      this.location.textContent = `0 / 0`;
    }
  }
  clearAll() {
    this.clearCardsBtn.addEventListener("click", (e) => {
      this.list = [];
      localStorage.clear(cardList.CARDS_LIST_KEY);
      this.render();
    });
  }
  changeCard(i) {
    const idx = this.getCardShown;
    this.list[idx]["show"] = false;
    this.list[idx + i]["show"] = true;
    localStorage.setItem(cardList.CARDS_LIST_KEY, JSON.stringify(this.list));
    this.render();
  }
}

const cards = new cardList();
const initialize = () =>
  cards.list.forEach((v, i) => (v.show = i == 0 ? true : false));
window.onload = initialize();

cards.render();

const cardsForm = document.getElementById("cardsForm"),
  openFormBtn = document.getElementById("openFormBtn"),
  closeFormBtn = document.getElementById("closeFormBtn"),
  form = document.querySelector("form"),
  addBtn = document.getElementById("addBtn"),
  leftBtn = document.getElementById("leftBtn"),
  rightBtn = document.getElementById("rightBtn");

openFormBtn.addEventListener("click", (e) => {
  cardsForm.style.display = "flex";
});
closeFormBtn.addEventListener("click", (e) => {
  cardsForm.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cards.add(e.target);
});

leftBtn.addEventListener("click", (e) => {
  //const idxTrue = cards.list.findIndex((v) => v.show == true);
  cards.getCardShown > 0 && cards.changeCard(-1);
});
rightBtn.addEventListener("click", (e) => {
  cards.getCardShown < cards.list.length - 1 && cards.changeCard(1);
});
