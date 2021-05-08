
$('.logsign').on("click", "#sign", (event) => {
  $('.loginForm').append(renderSignUpForm());
})

$('.logsign').on("click", "#log", (event) => {
  $('.loginForm').append(renderLoginForm());
})


export const renderSignUpForm = function(){
      return  `<div class="signup">
            <form id="signUpForm">
                <h2>Sign Up</h2>
                <input type="user_id" id="signName" placeholder="Name" minlength=1 required>
                <input type="email" id="signEmail" placeholder="Email Address" minlength=3 required>
                <input 
                    type="password" 
                    id="signPassword"
                    placeholder="Password"
                    minlength=3
                required>
                <button type="submit" id="submitSignUp">Submit</button>
            </form>
        </div>`
}

export const renderLoginForm = function(){
  return  `<div class="loginform">
        <form id="loginForm">
            <h2>Login</h2>
            <input type="email" id="logEmail" placeholder="Email Address" minlength=3 required>
            <input 
                type="password"
                id="logPassword"
                placeholder="Password"
                minlength=3
            required>
            <button type="submit" id="loginButton">Login</button>
        </form>
    </div>`
}


$('.loginForm').on("click", "#submitSignUp", (event) => {
  submitSignUp(event);
})

  export const submitSignUp = function(event) {
    event.preventDefault();
      const name = $('#signName').val();
      const email = $('#signEmail').val();
      const password = $('#signPassword').val();
    
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              var user = userCredential.user;
              window.location.href = "trains.html";
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                errorMessage = "Password is too weak."
              } else if (errorCode == 'auth/email-already-in-use'){
                errorMessage = "Email has already been used."
              } else if (errorCode == 'auth/invalid-email'){
                errorMessage = "Email is invalid."
              } else if (errorCode == 'auth/operation-not-allowed'){
                errorMessage = "Not allowed."
              } else {
                errorMessage = "Try Again."
              }
              $('.loginForm').append(`<h2>${errorMessage}</h2>`)
          });
          
        }

$('.loginForm').on("click", "#loginButton", (event) => {
  submitLogin(event);
})

export const submitLogin = function(event) {
  event.preventDefault()
  const email = $('#logEmail').val();
  const password = $('#logPassword').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    window.location.href = "trains.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
              errorMessage = "Email is invalid."
          } else if (errorCode === 'auth/user-disabled') {
              errorMessage = "This account is disabled."
          } else if (errorCode === 'auth/user-not-found') {
              errorMessage = "There is no user found with this email."
          } else if (errorCode === 'wrong-password') {
              errorMessage = "Password is wrong."
          } else {
              errorMessage = "Try again."
          }
          $('.loginForm').append(`<h2>${errorMessage}</h2>`)
  });
  
  
}

$('.nav').on("click", "#logout", (event) => {
  logout();
})

export const logout = function(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    
  });
  window.location.href = "index.html";
}

