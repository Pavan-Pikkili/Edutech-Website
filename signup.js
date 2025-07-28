document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const passwordInput = document.getElementById("signupPassword");

  const rules = {
    length: document.getElementById("rule-length"),
    upper: document.getElementById("rule-upper"),
    lower: document.getElementById("rule-lower"),
    digit: document.getElementById("rule-digit"),
    special: document.getElementById("rule-special")
  };

  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    toggle(rules.length, val.length >= 8);
    toggle(rules.upper, /[A-Z]/.test(val));
    toggle(rules.lower, /[a-z]/.test(val));
    toggle(rules.digit, /\d/.test(val));
    toggle(rules.special, /[@#$%^&*!]/.test(val));
  });

  function toggle(el, ok) {
    if (ok) {
      el.classList.add("valid");
      el.textContent = "✔ " + el.textContent.slice(2);
    } else {
      el.classList.remove("valid");
      el.textContent = "✖ " + el.textContent.slice(2);
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;
    const email = document.getElementById("signupEmail").value.trim();

    if (!email.endsWith("@gmail.com")) {
      alert("Email must end with @gmail.com");
      return;
    }

    const validPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[@#$%^&*!]/.test(password);

    if (!validPassword) {
      alert("Password must meet all the requirements.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
      alert("Username already exists.");
      return;
    }

    users[username] = { email: email, password: password };
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", username);
    alert("Sign up successful!");
    window.location.href = "home.html";
  });
});
