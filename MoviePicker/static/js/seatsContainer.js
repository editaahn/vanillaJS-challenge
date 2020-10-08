import { store } from "./index.js";

let selectedMovie = 0;

export class seatsContainer {
  constructor() {
    this.container = document.createElement('div')
    this.container.className = 'container'
    this.newMovies();
    this.clickSeat();
  }
  newMovies() {
      //영화 선택 시 좌석 다시 그려줌
      this.initialize();
      this.price = store[selectedMovie].price;
      this.col = store[selectedMovie].column;
      this.row = store[selectedMovie].row;
      this.selectedList = new Set();
      this.renderSeats();
      this.total();
  }
  clickSeat() {
    document.querySelector('.seatsContainer').addEventListener('click', e => {
      if (e.target.nodeName == 'LI') {
        const node = e.target.id
        e.target.classList.toggle('on')
        this.selectedList.has(node) ? 
          this.selectedList.delete(node) : this.selectedList.add(node)
        this.total();
      }
    })

  }
  renderSeats() {
    for (const [char] of Array(this.col).entries()){
      const colOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const seatList = document.createElement('ul')
      for (const [el] of Array(this.row).entries()){
        const seat = document.createElement("li")
        seat.id = colOrder[char]+(el+1)
        seatList.appendChild(seat);
      }
      this.container.append(seatList)
    }
  }
  initialize() {
    const existingContainer = document.querySelector('.container')
    if (existingContainer) {
      existingContainer.innerHTML = ''
    }
  }
  change(movieIdx) {
    selectedMovie = movieIdx
    this.newMovies();
  }
  total() {
    console.log(this.selectedList)
    document.querySelector('.totalPrice').innerHTML = this.selectedList.size * this.price
    document.querySelector('.seatsPicked').innerHTML = this.selectedList.size>0 ? [...this.selectedList].sort() : '좌석을 먼저 선택하세요'
  }
}
