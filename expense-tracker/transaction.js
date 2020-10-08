class Transaction {
  constructor(form) {
    this.desc = form.desc;
    this.amount = form.amount;
  }
  getData() {
    return { desc: this.desc, amount: this.amount };
  }
}

export class TransactionManager {
  static get KEY() {
    return "LIST";
  }

  constructor() {
    this.list = localStorage.getItem(TransactionManager.KEY);
    this.newList = this.list ? JSON.parse(this.list) : [];
    this.transaction;
  }

  add(form) {
    this.transaction = new Transaction(form);
    const newData = this.transaction.getData();
    //const newList = this.list ? JSON.parse(this.list) : [];
    this.newList.push(newData);
    localStorage.setItem(TransactionManager.KEY, JSON.stringify(this.newList));
    this.render(this.newList);
  }

  render() {
    document.getElementById("transactions").innerHTML = "";
    const elements = this.newList.map(
      (v,i) => `<li id="list${i}" class="transaction"><span>${v.desc} </span><e>${v.amount>=0 ? '+' : ''}${v.amount} 원</e><button class="remove">삭제</button></li>`
    );
    document.getElementById("transactions").innerHTML += elements.join("");
  }

  get getIncome() {
    return this.newList.reduce((acc, curr) => {
      return curr.amount > 0 ? acc + parseInt(curr.amount) : acc;
    }, 0);
  }

  get getExpense() {
    return this.newList.reduce((acc, curr) => {
      return curr.amount < 0 ? acc + parseInt(curr.amount) : acc;
    }, 0);
  }

  remove(id) {
    const removedList = this.newList.filter((v,i)=> i!==parseInt(id))
    this.newList = removedList;
    localStorage.setItem(TransactionManager.KEY, JSON.stringify(this.newList));
    this.render(this.newList);
  }
}