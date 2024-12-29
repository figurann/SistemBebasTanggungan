// ========= Konfigurasi =========
const CONFIG = {
  PATHS: {
    LOGOUT: "../../views/login.php",
  },
  SELECTORS: {
    NAV_LINKS: ".nav-links li",
    PROFILE_CONTAINER: ".profile-container",
    PROFILE_DROPDOWN: ".profile-dropdown",
    LOGOUT_BUTTON: "#logout",
  },
  CLASSES: {
    HOVER: "hover",
    ACTIVE: "active",
  },
  TIMEOUT: {
    TOAST: 3000,
    ERROR: 3000,
  },
};

// ========= Utilitas =========
const Utils = {
  createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  },

  showNotification(message, type = "info") {
    const toast = document.getElementById("notification-toast");
    const toastMessage = toast.querySelector(".toast-message");
    const toastIcon = toast.querySelector(".toast-icon");

    toastMessage.textContent = message;

    const styles = {
      success: {
        backgroundColor: "#28a745",
        iconClass: "fas fa-check-circle",
      },
      error: {
        backgroundColor: "#dc3545",
        iconClass: "fas fa-exclamation-circle",
      },
      info: {
        backgroundColor: "#333",
        iconClass: "fas fa-info-circle",
      },
    };

    const selectedStyle = styles[type] || styles.info;

    toast.style.backgroundColor = selectedStyle.backgroundColor;
    toastIcon.className = `${selectedStyle.iconClass} toast-icon`;

    toast.style.display = "flex";
    setTimeout(() => {
      toast.style.display = "none";
    }, CONFIG.TIMEOUT.TOAST);
  },

  handleNetworkError(error) {
    console.error("Kesalahan jaringan:", error);
    this.showNotification("Terjadi kesalahan jaringan", "error");
  },
};

// ========= Manajemen DOM =========
const DOMManager = {
  getElements() {
    return {
      navLinks: document.querySelectorAll(CONFIG.SELECTORS.NAV_LINKS),
      profileContainer: document.querySelector(
        CONFIG.SELECTORS.PROFILE_CONTAINER
      ),
      profileDropdown: document.querySelector(
        CONFIG.SELECTORS.PROFILE_DROPDOWN
      ),
      logoutButton: document.querySelector(CONFIG.SELECTORS.LOGOUT_BUTTON),
    };
  },

  setActiveMenu(navLinks) {
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
      const anchor = link.querySelector("a");
      if (anchor && anchor.getAttribute("href") === currentPath) {
        link.classList.add(CONFIG.CLASSES.ACTIVE);
      }
    });
  },
};

// ========= Event Handlers =========
const EventHandlers = {
  initializeNavigation(navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener("mouseover", () =>
        link.classList.add(CONFIG.CLASSES.HOVER)
      );

      link.addEventListener("mouseout", () =>
        link.classList.remove(CONFIG.CLASSES.HOVER)
      );

      link.addEventListener("click", (e) =>
        this.handleNavClick(e, link, navLinks)
      );
    });
  },

  handleNavClick(event, clickedLink, allLinks) {
    if (!clickedLink.classList.contains("dropdown")) {
      allLinks.forEach((item) => item.classList.remove(CONFIG.CLASSES.ACTIVE));
      clickedLink.classList.add(CONFIG.CLASSES.ACTIVE);
    }
  },

  initializeProfileDropdown(profileContainer, profileDropdown) {
    document.addEventListener("click", (event) => {
      if (!profileContainer.contains(event.target)) {
        profileDropdown.style.display = "none";
      }
    });

    profileContainer.addEventListener("mouseenter", () => {
      profileDropdown.style.display = "block";
    });

    profileContainer.addEventListener("mouseleave", () => {
      profileDropdown.style.display = "none";
    });
  },

  initializeLogout(logoutButton) {
    if (logoutButton) {
      logoutButton.addEventListener("click", this.handleLogout);
    }
  },

  handleLogout(event) {
    event.preventDefault();

    fetch(CONFIG.PATHS.LOGOUT, { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          window.location.href = CONFIG.PATHS.LOGOUT;
        } else {
          Utils.showNotification(
            "Tidak dapat menemukan halaman login",
            "error"
          );
        }
      })
      .catch((error) => {
        Utils.handleNetworkError(error);
        window.location.assign(CONFIG.PATHS.LOGOUT);
      });
  },
};

// ========= Inisialisasi Aplikasi =========
function initializeApp() {
  const elements = DOMManager.getElements();

  EventHandlers.initializeNavigation(elements.navLinks);
  EventHandlers.initializeProfileDropdown(
    elements.profileContainer,
    elements.profileDropdown
  );
  EventHandlers.initializeLogout(elements.logoutButton);

  DOMManager.setActiveMenu(elements.navLinks);
}

// ========= Error Handling Global =========
function handleGlobalError(msg, url, lineNo, columnNo, error) {
  console.error(`  
    Error: ${msg}  
    URL: ${url}  
    Line: ${lineNo}  
    Column: ${columnNo}  
    Error object: ${JSON.stringify(error)}  
  `);

  Utils.showNotification("Terjadi kesalahan tidak terduga", "error");

  return false;
}

// ========= Event Listeners =========
document.addEventListener("DOMContentLoaded", initializeApp);
window.onerror = handleGlobalError;
