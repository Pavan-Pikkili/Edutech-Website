document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;
    const email = document.getElementById("signupEmail").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.username === username)) {
      alert("Username already exists!");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters with uppercase, lowercase, number, and special character.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Email must be a Gmail address.");
      return;
    }

    users.push({ username, password, email });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful!");
    window.location.href = "home.html"; // ✅ Redirect to home page
  });
});
