document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  function showAlert(type, title, message) {
    const alertContainer = document.querySelector(".alert-container");
    const alertElement = document.createElement("div");
    alertElement.className = `alert ${type}`;

    alertElement.innerHTML = `
      <div class="alert-icon">
        <i class="material-icons">${
          type === "success" ? "check_circle" : "error"
        }</i>
      </div>
      <div class="alert-content">
        <h6 class="alert-title">${title}</h6>
        <p class="alert-message">${message}</p>
      </div>
      <button class="alert-close" onclick="this.closest('.alert').remove()">
        <i class="material-icons" style="font-size: 18px;">close</i>
      </button>
    `;

    alertContainer.appendChild(alertElement);

    setTimeout(() => {
      alertElement.style.animation = "fadeOut 0.3s ease forwards";
      setTimeout(() => {
        alertElement.remove();
      }, 300);
    }, 4000);
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(loginForm);

    try {
      const response = await fetch("login.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showAlert(
          "success",
          "Berhasil",
          "Login berhasil! Anda akan dialihkan..."
        );
        setTimeout(() => {
          switch (result.role) {
            case "mahasiswa":
              window.location.href = "../modules/mahasiswa/dashboard.php";
              break;
            case "admin_prodi":
              window.location.href = "../modules/programstudi/dashboard.php";
              break;
            case "admin_akademik":
              window.location.href = "../modules/akademik/dashboard.php";
              break;
            case "admin_perpus":
              window.location.href = "../modules/perpustakaan/dashboard.php";
              break;
            default:
              showAlert("warning", "Peringatan", "Role tidak dikenali!");
          }
        }, 2000);
      } else {
        showAlert("error", "Gagal", result.message || "Login gagal.");
      }
    } catch (error) {
      showAlert("error", "Kesalahan", "Terjadi kesalahan jaringan.");
      console.error("Login error:", error);
    }
  });
});
