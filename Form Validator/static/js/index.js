const form = document.forms.signup,
  name = form.elements.name,
  email = form.elements.email,
  password = form.elements.password,
  confirm = form.elements.confirm;


//form.addEventListener("submit", (e) => {
function send(e,form) {
  //e.preventDefault();
  let permitted = false

  const validator = (input) => {
    if (!input.value)
      input.parentNode.querySelector(".msg").innerText = `Type your ${input.name}`;
    else if (input.name == 'name' && input.value.match(/[~!@#$%^&*()_+|<>?:{}]/g))
      input.parentNode.querySelector(".msg").innerText = "Including not allowed character";
    else if (input.name == 'password' && input.value.length<8)
      input.parentNode.querySelector(".msg").innerText = "Make a password over 8 characters";
    else if (input.name == 'confirm' && input.value !== password.value)
      input.parentNode.querySelector(".msg").innerText = "Type equal as password field";
    else { 
      input.parentNode.querySelector(".msg").innerText = ""; 
      permitted = true
    }
    //postForm.append(input.type, input.value)
  };

  validator(name);
  validator(email);
  validator(password);
  validator(confirm);

  // form.method = 'POST';
  // form.submit();
  if (permitted) {
    fetch(form.action,{method:'post', body: new FormData(form)});
    console.log('We send post asynchronously (AJAX)');
  } 

  e.preventDefault();
  form.reset();
};
