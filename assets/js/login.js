document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    // Buat container untuk alert jika belum ada
    let alertContainer = document.querySelector(".alert-container");
    if (!alertContainer) {
      alertContainer = document.createElement("div");
      alertContainer.className = "alert-container";
      document.body.appendChild(alertContainer);
    }
  
    function showAlert(type, title, message) {
      const alertElement = document.createElement("div");
      alertElement.className = `alert ${type}`;
  
      alertElement.innerHTML = `
          <div class="alert-icon">
            <i class="material-icons">${
              type === "success"
                ? "check_circle"
                : type === "warning"
                ? "warning"
                : "error"
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
  
      // Auto dismiss after 4 seconds
      setTimeout(() => {
        alertElement.style.animation = "fadeOut 0.3s ease forwards";
        setTimeout(() => {
          alertElement.remove();
        }, 300);
      }, 4000);
    }
  
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const rememberMe = document.getElementById("rememberMe").checked;
  
      // Validasi input
      if (!username || !password) {
        showAlert("warning", "Peringatan", "Username dan password harus diisi!");
        return;
      }
  
      try {
        // Simulasi login API call
        const response = await simulateLogin(username, password);
  
        if (response.success) {
            showAlert(
                "success",
                "Berhasil",
                "Login berhasil! Anda akan dialihkan..."
            );
        
            // Simpan token dan role
            if (rememberMe) {
                localStorage.setItem("userToken", response.token);
                localStorage.setItem("userRole", response.role);
            } else {
                sessionStorage.setItem("userToken", response.token);
                sessionStorage.setItem("userRole", response.role);
            }
        
            // Redirect berdasarkan role
           // Redirect berdasarkan role
setTimeout(() => {
    switch (response.role) {
        case 'mahasiswa':
            window.location.href = 'mahasiswa/dashboard_mhs.html';
            break;
        case 'admin_prodi':
            window.location.href = 'programstudi/dashboard_prd.html';
            break;
        case 'admin_akademik':
            window.location.href = 'akademik/dashboard_aka.html';
            break;
        case 'admin_perpus':
            window.location.href = 'perpustakaan/dashboard_prp.html';
            break;
        default:
            showAlert("warning", "Peringatan", "Role tidak dikenali atau halaman tidak tersedia.");
    }
}, 2000);

        } else {
          showAlert(
            "error",
            "Gagal",
            response.message || "Username atau password salah!"
          );
        }
      } catch (error) {
        showAlert(
          "error",
          "Error",
          "Terjadi kesalahan pada server. Silakan coba lagi nanti."
        );
        console.error("Login error:", error);
      }
    });
  
    // Fungsi simulasi login (ganti dengan actual API call)
    async function simulateLogin(username, password) {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);
    
            const response = await fetch("login.php", {
                method: "POST",
                body: formData
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
                return {
                    success: false,
                    message: "Terjadi kesalahan server: " + errorText
                };
            }
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Jaringan atau parsing error:", error);
            return {
                success: false,
                message: "Terjadi kesalahan jaringan: " + error.message
            };
        }
    }
      
  });
