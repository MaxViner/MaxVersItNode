function isAuth() {
  return localStorage.getItem('isAuthenticated') === 'true';
}

function setIsAuth(value) {
  localStorage.setItem('isAuthenticated', value);
}

function setCurrentUser(username) {
  localStorage.setItem('currentUser', username);
}

function logout() {
  setIsAuth(false);
  setCurrentUser(null);
  renderLoginPage();
}

function renderLoginPage() {
  if (isAuth()) {
    renderTaskList();
  } else {
    const html = loginPageMarkup();
    document.body.insertAdjacentHTML('afterbegin', html);
    
    const inputFields = document.querySelectorAll('.input-box input');
    inputFields.forEach(inputField => {
      inputField.addEventListener('focus', () => {
        inputField.classList.remove('is-filled');
      });
    });

    const wrapper = document.querySelector(".wrapper");
    const log_link = document.querySelector(".login-link");
    const reg_link = document.querySelector(".reg-btn");
    const ic_close = document.querySelector(".icon-close");
    const register = document.querySelector('.Register');
    const login = document.querySelector('.login');

    const switchAccountBtn = document.querySelector('.switch-account-btn');
    switchAccountBtn.addEventListener('click', () => {
      wrapper.classList.add("active-popur");
    });

    const registerLink = document.querySelector(".register-link");
    if (registerLink) {
      registerLink.addEventListener("click", (event) => {
        event.preventDefault();
        login.classList.remove("translate-visible");
        register.classList.remove("translate-unvisible");
        login.classList.add("translate-unvisible");
        register.classList.add("translate-visible");
      });
    }

    if (reg_link) {
      reg_link.addEventListener("click", (event) => {
        event.preventDefault();
        login.classList.remove("translate-unvisible");
        register.classList.remove("translate-visible");
        login.classList.add("translate-visible");
        register.classList.add("translate-unvisible");
      });
    }

    if (log_link) {
      log_link.addEventListener("click", () => {
        wrapper.classList.remove("active");
      });
    }

    switchAccountBtn.addEventListener('click', () => {
      wrapper.classList.add("active-popur");
    });

    ic_close.addEventListener('click', () => {
      wrapper.classList.remove("active-popur");
    });

   
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    const loginForm = document.getElementById('Login-form');
    const registerForm = document.forms[1];

    function registerUser(email, username, password) {
      if (!localStorage.getItem('users')) {
        return;
      }

      const users = JSON.parse(localStorage.getItem('users'));
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        alert('Пользователь с таким email уже существует');
        return;
      }

      const user = {
        id: Date.now(),
        email: email,
        username: username,
        password: password,
        tasks: []
      };

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }

    function loginUser(email, password) {
      if (!localStorage.getItem('users')) {
        return;
      }

      const users = JSON.parse(localStorage.getItem('users'));
      const foundUser = users.find(function (user) {
        return user && user.email === email && user.password === password;
      });

      if (foundUser) {
        setCurrentUser(foundUser.username);
      }

      return foundUser;
    }

    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = registerForm.elements[0].value;
      const username = registerForm.elements[1].value;
      const password = registerForm.elements[2].value;
      const conditions = registerForm.elements[3].checked;

      if (conditions) {
        registerUser(email, username, password);
        alert('Регистрация успешна');
        setIsAuth(true);
        renderTaskList();
      } else {
        alert('Пожалуйста, согласитесь с условиями');
      }
    });

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = loginForm.elements[0].value;
      const password = loginForm.elements[1].value;

      if (loginUser(email, password)) {
        alert('Авторизация успешна');
        setIsAuth(true);
        renderTaskList();
      } else {
        alert('Неверный email или пароль');
      }
    });
  }
}

  function loginPageMarkup(){
    document.body.innerHTML = "";
    alert('login')
return `
<header>
<h2 class="logo">
    ItNode
</h2>
<nav> 
    <ul> 
      <li><a href="#">Home</a></li> 
      <li><a href="#">About Us</a></li> 
      <li><a href="#">Contact Us</a></li> 
      
    </ul>
    <button class="switch-account-btn">Login</button> 
  </nav>
</header>
<div class="wrapper ">
<span class="icon-close"><ion-icon name="close-outline">
</ion-icon></span>
<div class=" form-box login">

<h2>
    Login

</h2>
<form action=""  id="Login-form">
    <div class="input-box">
        <span class="icon"><ion-icon name="mail-outline"></ion-icon>
        </span>
        <input type="email" required>
        <label for="email"> email</label>
    </div> 
    <div class="input-box">
        <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
        <input type="password" required>
        <label for="password"> password</label>
    </div> 
    <div class="remember-forgot">
        <label for="">
            <input type="checkbox">
            Remember me
        </label>
        <a href="">Forgot Password?</a>
    </div>
    <button type="submit" class="btn-sub">
    
    Login
    
    </button>
    <div class="login-register">
        <p>Dont have an account
        <a href="" class="register-link" 
        >Register</a></p>
    </div>
</form>
</div>

<!-- REG -->

<div class=" form-box Register">

<h2>
    Registration

</h2>
<form action="" id='RegiSter-form'>
    <div class="input-box">
        <span class="icon"><ion-icon name="mail-outline"></ion-icon>
        </span>
        <input type="email" required>
        <label for="email"> email</label>
    </div> 
    <div class="input-box">
        <span class="icon"><ion-icon name="person-circle-outline"></ion-icon>
        </span>
        <input type="text" required>
        <label for="text"> username</label>
    </div> 
    <div class="input-box">
        <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
        <input type="password" required>
        <label for="password"> password</label>
    </div> 
    <div class="remember-forgot">
        <label for="">
            <input type="checkbox">
            I agree to conditions
        </label>
        
    </div>
    <button type="submit" class="btn-sub">Register</button>
    <div class="login-register">
        <p>Alredy have an account
        <button class="reg-btn"><a href="" class="login-link">Login</a></button></p>
    </div>
</form>
</div>
</div>`
  }
  

  