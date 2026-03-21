const signIn = () => {
  const signInPage = document.getElementById(`signin-page`);
  const username = document.getElementById(`username`).value;
  const password = document.getElementById(`password`).value;
  if (username.length == 0 || password.length == 0) {
    alert("Please Enter Both Username & Password!");
    return;
  }
  if (username === `admin` && password === `admin123`) {
    signInPage.classList.add(`hidden`);
    return;
  } else {
    alert("Username or Password is incorrect!");
  }
};
