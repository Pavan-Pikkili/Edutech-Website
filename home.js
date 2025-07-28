// Get username from localStorage
const storedUsername = localStorage.getItem("loggedInUser");

// Display in dropdown
if (storedUsername) {
  document.querySelector(".dropdown-user").textContent = storedUsername;
} else {
  // Redirect if not logged in
  window.location.href = "login.html";
}

// Toggle dropdown
document.getElementById("profileBtn").addEventListener("click", () => {
  document.getElementById("dropdown").classList.toggle("show");
});

// Sign out
function signOut() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Close dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.matches('#profileBtn')) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown?.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
};
