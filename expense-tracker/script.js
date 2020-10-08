import { TransactionManager } from "./transaction.js";

const form = document.getElementById("form"),
  income = document.getElementById("income").querySelector("strong"),
  expense = document.getElementById("expense").querySelector("strong"),
  balance = document.getElementById("balance"),
  transactions = document.getElementById("transactions");

const trns = new TransactionManager();

trns.render();
setAccount();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const temp = {
    desc: e.target.addDesc.value,
    amount: e.target.addAmount.value,
  };
  trns.add(temp);
  form.reset();
  setAccount();
});


transactions.addEventListener("click", (e) => {
  if (e.target.nodeName == 'BUTTON') trns.remove(e.target.parentNode.id.replace('list',''));
  setAccount();
})

function setAccount() {
  const incomeVal = trns.getIncome;
  const expenseVal = trns.getExpense;

  income.innerText = `${incomeVal.toLocaleString() || 0} 원`
  expense.innerText = `${expenseVal.toLocaleString() || 0} 원`
  balance.innerText = `${(parseInt(incomeVal) + parseInt(expenseVal)).toLocaleString()} 원`
}