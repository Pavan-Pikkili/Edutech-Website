// Display username from localStorage
document.getElementById("username").textContent =
  localStorage.getItem("loggedInUser") || "Guest";

// Toggle password visibility
function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === "password" ? "text" : "password";
}

// Show password form
document.getElementById("changePasswordBtn").addEventListener("click", () => {
  document.getElementById("passwordForm").style.display = "block";
});

// Validate current password
document.getElementById("currentPassword").addEventListener("input", () => {
  const current = document.getElementById("currentPassword").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const currentUser = localStorage.getItem("loggedInUser");
  const correctPassword = users[currentUser]?.password || "";

  if (current === correctPassword) {
    document.getElementById("currentError").textContent = "";
    document.getElementById("newPasswordField").style.display = "flex";
    document.getElementById("confirmPasswordField").style.display = "flex";
    document.getElementById("submitNewPassword").style.display = "inline-block";
    document.getElementById("passwordRules").style.display = "block";
  } else {
    document.getElementById("currentError").textContent = "Incorrect current password!";
    document.getElementById("newPasswordField").style.display = "none";
    document.getElementById("confirmPasswordField").style.display = "none";
    document.getElementById("submitNewPassword").style.display = "none";
    document.getElementById("passwordRules").style.display = "none";
  }
});

// Password rules update
document.getElementById("newPassword").addEventListener("input", () => {
  const password = document.getElementById("newPassword").value;
  updatePasswordRules(password);
});

function updatePasswordRules(password) {
  const lengthValid = password.length >= 8;
  const upperValid = /[A-Z]/.test(password);
  const lowerValid = /[a-z]/.test(password);
  const digitValid = /[0-9]/.test(password);
  const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  setRule("lengthRule", lengthValid);
  setRule("upperRule", upperValid);
  setRule("lowerRule", lowerValid);
  setRule("digitRule", digitValid);
  setRule("specialRule", specialValid);
}

function setRule(id, isValid) {
  const el = document.getElementById(id);
  const icon = el.querySelector(".icon");
  if (isValid) {
    el.classList.add("valid");
    icon.textContent = "✅";
  } else {
    el.classList.remove("valid");
    icon.textContent = "❌";
  }
}

// Validate new + confirm passwords and update localStorage
document.getElementById("submitNewPassword").addEventListener("click", () => {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!validatePassword(newPassword)) {
    document.getElementById("confirmError").textContent =
      "Password must meet all the requirements above.";
    document.getElementById("successMessage").textContent = "";
    return;
  }

  if (newPassword !== confirmPassword) {
    document.getElementById("confirmError").textContent = "Passwords do not match.";
    document.getElementById("successMessage").textContent = "";
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const currentUser = localStorage.getItem("loggedInUser");

    if (users[currentUser]) {
      users[currentUser].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
    }

    document.getElementById("confirmError").textContent = "";
    document.getElementById("successMessage").textContent = "Password changed successfully!";
  }
});

function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
}
