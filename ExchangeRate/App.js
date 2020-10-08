const baseContainer = document.getElementById("baseContainer"),
  excContainer = document.getElementById("excContainer"),
  baseCurrencyList = document.getElementById("baseCurrencyList"),
  excCurrencyList = document.getElementById("excCurrencyList"),
  insert = document.getElementById("insert"),
  excRate = document.getElementById("excRate"),
  result = document.getElementById("result");

//선택한 통화 기준금액

const currencies = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"];
currencies
  .sort()
  .forEach(v=>
      document.getElementById("baseCurrencyList").innerHTML += `<option value=${v}>${v}</option>`
  );

let currencyList = {};

const getList = (baseCurrency, callback) => {
  fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`, {
    headers: { Accept: "application/json" },
    method: "GET",
  })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        return Promise.reject(new Error("response failed"));
      }
    })
    .then((data) => {
      currencyList = {};
      currencyList = data["rates"];
    })
    .then(()=> callback() )
    .catch((e) => console.log(e));
};

baseCurrencyList.addEventListener("input", (e) => {
  getList(e.target.value, () => {
    excCurrencyList.innerHTML = "";
    Object.keys(currencyList).forEach((v) => {
      excCurrencyList.innerHTML += `<option value=${v}>${v}</option>`;
    });
    calculate();
  });
});

insert.addEventListener("change", e => {
  calculate();
});
excCurrencyList.addEventListener("change", e => {
  calculate();
});

const calculate = () => {
  //환산통화 value 가져옴
  const baseSelected = baseCurrencyList.value;
  const excSelected = excCurrencyList.value;
  //입력수량 가져옴
  const size = insert.value;
  //수량 * 환산통화value
  excRate.textContent = `1 ${baseSelected} = ${currencyList[excSelected].toFixed(3).slice(0,-1)} ${excSelected}`
  result.value = `${Number((currencyList[excSelected] * size).toFixed(3).slice(0,-1)).toLocaleString()}`;
};
