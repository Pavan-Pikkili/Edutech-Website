document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      alert("Login successful!");
      window.location.href = "home.html";  // ✅ Redirect to home page
    } else {
      alert("Invalid username or password.");
    }
  });
});
