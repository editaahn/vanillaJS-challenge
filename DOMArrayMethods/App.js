// Fetch random users from the randomuser.me API
let userList = []

const tBody = document.getElementById('tbody'),
  addUserBtn = document.getElementById('addUser'),
  doubleWealthBtn = document.getElementById('doubleWealth'),
  onlyMillionaireBtn = document.getElementById('onlyMillionaire'),
  sortBtn = document.getElementById('sortByWealth'),
  getTotalBtn = document.getElementById('getTotal');

function getUser() {
  fetch("https://randomuser.me/api/")
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        return new Error("Failed!");
      }
    })
    .then(data => {
      const userdata = data.results[0]
      const person = {
        'name': `${userdata.name.first} ${userdata.name.last}`,
        'wealth': Math.floor(Math.random()*1000000)
      }
      userList.push(person)
    })
    .then(() => renderUsers())
    .catch(e => console.log(e));
};

function renderUsers() {
  if (userList) tBody.innerHTML = ''
  userList.forEach( v => {
    tBody.innerHTML += `
      <tr>
        <td>${v.name}</td>
        <td>$${v.wealth.toLocaleString()}</td>
      </tr>
    `
  })
}

// Use forEach() to loop and output user/wealth
addUserBtn.addEventListener('click', e => {
  getUser();
})

// Use map() to double wealth
doubleWealthBtn.addEventListener('click', e => {
  userList.forEach(v=> v.wealth *=2 )
  renderUsers();
})

// Use filter() to filter only millionaires
onlyMillionaireBtn.addEventListener('click', e => {
  userList = [...userList].filter(v => v.wealth >= 1000000)
  renderUsers();
})
// Use sort() to sort by wealth
sortBtn.addEventListener('click', e => {
  userList.sort((a,b)=>b.wealth-a.wealth);
  renderUsers();
})

// Use reduce() to add all wealth
getTotalBtn.addEventListener('click', e => {
  const total = document.getElementById('total');
  total.innerHTML += userList.reduce((total,c) => total+c.wealth, 0).toLocaleString()
})