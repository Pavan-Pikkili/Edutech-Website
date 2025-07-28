document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username].password === password) {
    localStorage.setItem("loggedInUser", username);
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password.");
  }
});
