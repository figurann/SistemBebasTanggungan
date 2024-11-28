// ========= Alert Configuration =========
const ALERT_ICONS = {
  success: `<path fill="#28a745" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 001.414 0l5.952-5.95-1.062-1.062-5.6 5.6z"/>`,
  error: `<path fill="#dc3545" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>`,
};

// ========= Alert Functions =========
function showAlert(title, message, type = "error") {
  const existingAlert = document.querySelector(".alert-overlay");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertHTML = `
    <div class="alert-overlay">
      <div class="alert-box">
        <div class="alert-icon ${type === "success" ? "success" : ""}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            ${ALERT_ICONS[type]}
          </svg>
        </div>
        <h4 class="alert-title">${title}</h4>
        <p class="alert-message">${message}</p>
        ${
          type === "success"
            ? ""
            : '<button class="alert-button error">OK</button>'
        }
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", alertHTML);

  if (type !== "success") {
    const alertButton = document.querySelector(".alert-button");
    alertButton.addEventListener("click", () => {
      document.querySelector(".alert-overlay").remove();
    });
  }
}

// ========= Form Validation Functions =========
const resetValidation = (form) => {
  form.querySelectorAll(".form-control").forEach((input) => {
    input.classList.remove("is-invalid");
  });
};

// ========= Login Form Functions =========
if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    resetValidation(loginForm);

    if (!username.value && !password.value) {
      username.classList.add("is-invalid");
      password.classList.add("is-invalid");
      showAlert("Peringatan!", "Username dan Password harus diisi!", "error");
      return;
    }

    if (!username.value) {
      username.classList.add("is-invalid");
      showAlert("Peringatan!", "Username harus diisi!", "error");
      return;
    }

    if (!password.value) {
      password.classList.add("is-invalid");
      showAlert("Peringatan!", "Password harus diisi!", "error");
      return;
    }

    // Simulasi autentikasi
    if (username.value === "admin" && password.value === "admin") {
      showAlert(
        "Cihuy!",
        "Login telah berhasil! Anda akan dialihkan ke Dashboard..",
        "success"
      );
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    } else {
      showAlert("Maaf..", "Username atau Password salah!", "error");
    }
  });
}

// ========= Reset Password Form Functions =========
if (document.getElementById("resetPasswordForm")) {
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  const username = document.getElementById("username");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  resetPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();
    resetValidation(resetPasswordForm);

    if (!username.value || !newPassword.value || !confirmPassword.value) {
      if (!username.value) username.classList.add("is-invalid");
      if (!newPassword.value) newPassword.classList.add("is-invalid");
      if (!confirmPassword.value) confirmPassword.classList.add("is-invalid");
      showAlert("Peringatan!", "Semua field harus diisi!", "error");
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      newPassword.classList.add("is-invalid");
      confirmPassword.classList.add("is-invalid");
      showAlert("Peringatan!", "Password tidak cocok!", "error");
      return;
    }

    showAlert(
      "Berhasil!",
      "Password berhasil direset! Anda akan dialihkan ke halaman login..",
      "success"
    );
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });
}

// Add input event listeners to remove invalid class
document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });
});
