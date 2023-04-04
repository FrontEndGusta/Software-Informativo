const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const btnRegistroPopup = document.querySelector('.btnRegistro-popup');
const forgot = document.querySelector('.forgot-password-link');
const backtoLogin = document.querySelector('.back-to-login');
const response = document.getElementById("response")
const base_uri = 'http://localhost:5230/api'

registerLink.addEventListener('click', () => {
  //limpa os campos quando passa pra outro forms
  document.getElementById('login_ra').value = ""
  document.getElementById('login_password').value = ""
  //
  wrapper.classList.add('active')
});

loginLink.addEventListener('click', () => {
  //limpa os campos quando passa pra outro forms
  document.getElementById('register_name').value = ""
  document.getElementById('register_ra').value = ""
  document.getElementById('register_email').value = ""
  document.getElementById('register_password').value = ""
  document.getElementById('error_login').innerHTML = ""
  document.getElementById('text').innerHTML = ""

  //
  wrapper.classList.remove('active')
});


btnPopup.addEventListener('click', () => {
  if (wrapper.classList.contains('active-popup')) {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active')
    wrapper.classList.remove('activetwo')
  } else {
    wrapper.classList.add('active-popup');

  }
});

btnRegistroPopup.addEventListener('click', () => {
  if (wrapper.classList.contains('active-popup')) {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active')
    wrapper.classList.remove('activetwo')

  } else {
    wrapper.classList.add('active-popup');
    wrapper.classList.add('active');
  }
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup')
});

forgot.addEventListener('click', () => {
  //limpa os campos quando passa pra outro forms
  document.getElementById('login_ra').value = ""
  document.getElementById('login_password').value = ""
  //
  wrapper.classList.add('activetwo')
});

backtoLogin.addEventListener('click', () => {
  document.getElementById('text2').value = ""; // adicionando essa linha de código para limpar o campo
  document.getElementById('text2').innerHTML = ""
  document.getElementById('forgot_email').value = ""
  wrapper.classList.remove('activetwo')
});

//INTEGRACAO BASICA API

function onRegisterNewUser() {
  const obj = {
    password: document.getElementById("register_password").value,
    name: document.getElementById("register_name").value,
    cpf: "111.111.111-11",
    ra: document.getElementById("register_ra").value,
    email: document.getElementById("register_email").value,
    type: 'Teste'
  }
  const header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  }



  fetch(`${base_uri}/Login/CreateUser`, header).then(() => {
    response.innerHTML = "Cadastrado com sucesso"
  }).catch((err) => console.error(`O erro foi esse ${err}`))
}


function onRegisterNewUser() {
  const email = emailInput.value;

  if (!isValidEmail(email)) {
      alert('email inválido')
  } else {
      // código para enviar o formulário
      const obj = {
          password: document.getElementById("register_password").value,
          name: document.getElementById("register_name").value,
          cpf: "111.111.111-11",
          ra: document.getElementById("register_ra").value,
          email: document.getElementById("register_email").value,
          type: 'Teste'
        }
        const header = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        }
      
        fetch(`${base_uri}/Login/CreateUser`, header).then(() => {
          response.innerHTML = "Cadastrado com sucesso"
        }).catch(() => console.error("Erro"))
  }
}

//FUNÇÃO PARA LOGIN

function onLoginUser(event) {
  event.preventDefault(); //EVITA que o formulario envie para outra página
  const obj = {
    ra: document.getElementById("login_ra").value,
    password: document.getElementById("login_password").value
  } //Define os valores a serem enviados de acordo com o que o usuario inserir

  const header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  } //Define o cabeçalho HTTP (necessário pra fazer a requisição e necessário seguir este padrão)

  //Metodo fetch para fazer a requisição para a API
  fetch(`${base_uri}/Login/LoginUser`, header).then((res) => { //Primeiro then é se a requisição retornou sucesso
    res.json().then((resp) => { //res.json transforma a resposta em json
        if (resp.logged) { //se a propriedade logged for true então faça o que tiver dentro do if
          const token = resp.bearer //pegar o token bearer da API
          sessionStorage.setItem("token", token); //joga o token em uma sessão (assinatura de login)
          window.location.href = './pagina_adm/index.html';
        } else {
          document.getElementById('error_login').innerHTML = "Usuário ou senha inválido(s)" //Define mensagem no html
        }
      })
      .catch((err) => {
        console.log(err);
        document.getElementById('error_login').innerHTML = "Usuário ou senha inválido(s)" 
      }) //erro tecnico
  }).catch((err) => {
    console.log(err) //erro tecnico
  })
  document.getElementById('login_ra').value="";
  document.getElementById('login_password').value="";
}

function onInsertEvent(){
  const obj = {
    title:document.getElementById('titulo').value,
    descricao:document.getElementById('descricao').value

  }
}